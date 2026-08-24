import { extractPdfText, type PdfLine, type PdfPageText } from './extractPdfText'
import { buildEpub, type EpubChapter } from './buildEpub'

/** How many source PDF pages to fold into a single EPUB chapter/TOC entry. */
const PAGES_PER_CHAPTER = 15

/**
 * Groups a page's lines into paragraphs by looking at the vertical gap
 * between consecutive lines: a gap noticeably larger than the page's typical
 * line spacing is treated as a paragraph break, otherwise the line is a
 * wrapped continuation of the current paragraph.
 */
function linesToParagraphs(lines: PdfLine[]): string[] {
  if (lines.length === 0) return []

  const gaps: number[] = []
  for (let i = 1; i < lines.length; i++) {
    const gap = lines[i - 1].y - lines[i].y
    if (gap > 0) gaps.push(gap)
  }
  gaps.sort((a, b) => a - b)
  const typicalGap = gaps.length > 0 ? gaps[Math.floor(gaps.length / 2)] : 0

  const paragraphs: string[] = []
  let current = lines[0].text

  for (let i = 1; i < lines.length; i++) {
    const gap = lines[i - 1].y - lines[i].y
    const isParagraphBreak = typicalGap > 0 && gap > typicalGap * 1.4
    if (isParagraphBreak) {
      paragraphs.push(current)
      current = lines[i].text
    } else {
      current += (/[-‐-―]$/.test(current) ? '' : ' ') + lines[i].text
    }
  }
  paragraphs.push(current)

  return paragraphs
}

function pagesToChapters(pages: PdfPageText[]): EpubChapter[] {
  const chapters: EpubChapter[] = []

  for (let start = 0; start < pages.length; start += PAGES_PER_CHAPTER) {
    const slice = pages.slice(start, start + PAGES_PER_CHAPTER)
    const paragraphs = slice.flatMap((page) => linesToParagraphs(page.lines))
    if (paragraphs.length === 0) continue

    const firstPage = slice[0].pageNumber
    const lastPage = slice[slice.length - 1].pageNumber
    const title =
      firstPage === lastPage ? `Página ${firstPage}` : `Páginas ${firstPage}–${lastPage}`

    chapters.push({ title, paragraphs })
  }

  return chapters
}

export interface PdfToEpubOptions {
  /** Falls back to the PDF's own metadata title, then this value. */
  title: string
  author?: string
}

/** Converts a PDF (as a Buffer) into an EPUB (as a Buffer), ready to send to a Kindle. */
export async function pdfToEpub(pdfBuffer: Buffer, options: PdfToEpubOptions): Promise<Buffer> {
  const extracted = await extractPdfText(pdfBuffer)
  const chapters = pagesToChapters(extracted.pages)

  return buildEpub({
    title: extracted.title || options.title,
    author: extracted.author || options.author,
    chapters,
  })
}
