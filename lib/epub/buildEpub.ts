import JSZip from 'jszip'
import { randomUUID } from 'crypto'

export interface EpubChapter {
  title: string
  /** Plain-text paragraphs; each becomes its own <p> in the chapter XHTML. */
  paragraphs: string[]
}

export interface EpubMetadata {
  title: string
  author?: string
  language?: string
  chapters: EpubChapter[]
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function chapterFileName(index: number): string {
  return `chapter-${String(index + 1).padStart(3, '0')}.xhtml`
}

function renderChapterXhtml(chapter: EpubChapter): string {
  const paragraphsHtml = chapter.paragraphs
    .map((p) => `<p>${escapeXml(p)}</p>`)
    .join('\n    ')

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
  <head>
    <title>${escapeXml(chapter.title)}</title>
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
    <h1>${escapeXml(chapter.title)}</h1>
    ${paragraphsHtml || '<p></p>'}
  </body>
</html>`
}

const STYLES_CSS = `body { font-family: serif; line-height: 1.5; margin: 1em; }
h1 { font-size: 1.4em; margin-bottom: 1em; }
p { margin: 0 0 0.8em 0; text-indent: 1em; }`

/**
 * Builds a minimal, valid EPUB 3 (with an EPUB 2 NCX for older-reader
 * compatibility, including Kindle's Send-to-Kindle conversion pipeline)
 * entirely in memory and returns it as a Buffer.
 */
export async function buildEpub(meta: EpubMetadata): Promise<Buffer> {
  const zip = new JSZip()
  const bookId = `urn:uuid:${randomUUID()}`
  const language = meta.language ?? 'pt-BR'
  const chapters = meta.chapters.length > 0 ? meta.chapters : [{ title: meta.title, paragraphs: [] }]

  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' })

  zip.file(
    'META-INF/container.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml" />
  </rootfiles>
</container>`
  )

  const oebps = zip.folder('OEBPS')!
  oebps.file('styles.css', STYLES_CSS)

  chapters.forEach((chapter, index) => {
    oebps.file(chapterFileName(index), renderChapterXhtml(chapter))
  })

  const manifestItems = chapters
    .map(
      (_, index) =>
        `    <item id="chapter-${index + 1}" href="${chapterFileName(index)}" media-type="application/xhtml+xml" />`
    )
    .join('\n')

  const spineItems = chapters
    .map((_, index) => `    <itemref idref="chapter-${index + 1}" />`)
    .join('\n')

  const navPoints = chapters
    .map(
      (chapter, index) => `    <navPoint id="navpoint-${index + 1}" playOrder="${index + 1}">
      <navLabel><text>${escapeXml(chapter.title)}</text></navLabel>
      <content src="${chapterFileName(index)}" />
    </navPoint>`
    )
    .join('\n')

  const navListItems = chapters
    .map(
      (chapter, index) =>
        `      <li><a href="${chapterFileName(index)}">${escapeXml(chapter.title)}</a></li>`
    )
    .join('\n')

  oebps.file(
    'content.opf',
    `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="BookId">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">${escapeXml(bookId)}</dc:identifier>
    <dc:title>${escapeXml(meta.title)}</dc:title>
    <dc:language>${escapeXml(language)}</dc:language>
    ${meta.author ? `<dc:creator>${escapeXml(meta.author)}</dc:creator>` : ''}
    <meta property="dcterms:modified">${new Date().toISOString().replace(/\.\d+Z$/, 'Z')}</meta>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
    <item id="nav" href="nav.xhtml" href-lang="pt-BR" properties="nav" media-type="application/xhtml+xml" />
    <item id="css" href="styles.css" media-type="text/css" />
${manifestItems}
  </manifest>
  <spine toc="ncx">
${spineItems}
  </spine>
</package>`
  )

  oebps.file(
    'toc.ncx',
    `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${escapeXml(bookId)}" />
  </head>
  <docTitle>
    <text>${escapeXml(meta.title)}</text>
  </docTitle>
  <navMap>
${navPoints}
  </navMap>
</ncx>`
  )

  oebps.file(
    'nav.xhtml',
    `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
  <head>
    <title>${escapeXml(meta.title)}</title>
  </head>
  <body>
    <nav epub:type="toc" id="toc">
      <h1>${escapeXml(meta.title)}</h1>
      <ol>
${navListItems}
      </ol>
    </nav>
  </body>
</html>`
  )

  return zip.generateAsync({ type: 'nodebuffer', mimeType: 'application/epub+zip' })
}
