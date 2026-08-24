export interface PdfLine {
  text: string
  /** Baseline Y position on the page, used to detect paragraph gaps. */
  y: number
}

export interface PdfPageText {
  pageNumber: number
  lines: PdfLine[]
}

export interface ExtractedPdf {
  title?: string
  author?: string
  pages: PdfPageText[]
}

interface PdfTextItem {
  str?: string
  hasEOL?: boolean
  transform?: number[]
}

/**
 * Extracts text per page, grouped into lines with their vertical position,
 * from a PDF buffer using pdfjs-dist's legacy (Node-compatible) build.
 * Text-only — no rendering, so no canvas/worker setup is required.
 */
export async function extractPdfText(buffer: Buffer): Promise<ExtractedPdf> {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')

  const data = new Uint8Array(buffer)
  const loadingTask = pdfjsLib.getDocument({
    data,
    useWorkerFetch: false,
    disableFontFace: true,
  })
  const doc = await loadingTask.promise

  const metadata = await doc.getMetadata().catch(() => null)
  const info = (metadata?.info ?? {}) as { Title?: string; Author?: string }

  const pages: PdfPageText[] = []
  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
    const page = await doc.getPage(pageNumber)
    const textContent = await page.getTextContent()

    const lines: PdfLine[] = []
    let currentText = ''
    let currentY: number | undefined

    for (const item of textContent.items as PdfTextItem[]) {
      if (typeof item.str !== 'string') continue
      if (currentY === undefined && item.transform) currentY = item.transform[5]
      currentText += item.str
      if (item.hasEOL) {
        const trimmed = currentText.trim()
        if (trimmed) lines.push({ text: trimmed, y: currentY ?? 0 })
        currentText = ''
        currentY = undefined
      } else {
        currentText += ' '
      }
    }
    const trailing = currentText.trim()
    if (trailing) lines.push({ text: trailing, y: currentY ?? 0 })

    pages.push({ pageNumber, lines })
    await page.cleanup()
  }

  await loadingTask.destroy()

  return {
    title: info.Title?.trim() || undefined,
    author: info.Author?.trim() || undefined,
    pages,
  }
}
