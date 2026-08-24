import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { pdfToEpub } from '@/lib/epub/pdfToEpub'
import { assertSafeExternalUrl } from '@/lib/http/safeUrl'

export const runtime = 'nodejs'
export const maxDuration = 60

const MAX_PDF_BYTES = 40 * 1024 * 1024

async function fetchPdfWithLimit(url: URL): Promise<Buffer> {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) {
    throw new Error(`Falha ao baixar o PDF (status ${res.status}).`)
  }

  const contentLength = Number(res.headers.get('content-length') ?? '0')
  if (contentLength > MAX_PDF_BYTES) {
    throw new Error('O arquivo PDF é grande demais para converter (limite de 40MB).')
  }

  if (!res.body) {
    throw new Error('Resposta vazia ao baixar o PDF.')
  }

  const reader = res.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > MAX_PDF_BYTES) {
      await reader.cancel()
      throw new Error('O arquivo PDF é grande demais para converter (limite de 40MB).')
    }
    chunks.push(value)
  }

  const buffer = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)))
  const contentType = res.headers.get('content-type') ?? ''
  const looksLikePdf = contentType.includes('pdf') || buffer.subarray(0, 5).toString('latin1') === '%PDF-'
  if (!looksLikePdf) {
    throw new Error('O arquivo informado não é um PDF válido.')
  }

  return buffer
}

const COMBINING_DIACRITICS = new RegExp('[̀-ͯ]', 'g')

function sanitizeFileName(name: string): string {
  const ascii = name.normalize('NFD').replace(COMBINING_DIACRITICS, '')
  const cleaned = ascii.replace(/[^a-zA-Z0-9\s._-]/g, '').trim().slice(0, 120)
  return cleaned || 'material'
}

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Você precisa estar autenticada para converter materiais.' },
      { status: 401 }
    )
  }

  const body = (await request.json().catch(() => null)) as { url?: unknown; title?: unknown } | null
  const fileUrl = typeof body?.url === 'string' ? body.url : null
  const title = typeof body?.title === 'string' && body.title.trim() ? body.title.trim() : 'Material'

  if (!fileUrl) {
    return NextResponse.json({ error: 'URL do material é obrigatória.' }, { status: 400 })
  }

  let safeUrl: URL
  try {
    safeUrl = assertSafeExternalUrl(fileUrl)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'URL inválida.' },
      { status: 400 }
    )
  }

  let pdfBuffer: Buffer
  try {
    pdfBuffer = await fetchPdfWithLimit(safeUrl)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Falha ao baixar o PDF.' },
      { status: 502 }
    )
  }

  let epubBuffer: Buffer
  try {
    epubBuffer = await pdfToEpub(pdfBuffer, { title })
  } catch (err) {
    console.error('Falha ao converter PDF em EPUB', err)
    return NextResponse.json(
      { error: 'Não foi possível converter este PDF em EPUB.' },
      { status: 500 }
    )
  }

  const fileName = `${sanitizeFileName(title)}.epub`
  const epubBlob = new Blob([Uint8Array.from(epubBuffer)], { type: 'application/epub+zip' })

  return new NextResponse(epubBlob, {
    status: 200,
    headers: {
      'Content-Type': 'application/epub+zip',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': String(epubBuffer.byteLength),
    },
  })
}
