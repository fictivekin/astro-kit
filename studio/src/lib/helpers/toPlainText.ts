/**
 * Convert rich text content (e.g., Sanity Portable Text) into a plain string
 * for use in previews, titles, or other display contexts.
 */
export function toPlainText(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return extractTextFromBlocks(value)

  const valueObject: any = value as any
  if (Array.isArray(valueObject?.portableText)) return extractTextFromBlocks(valueObject.portableText)
  if (typeof valueObject?.html === 'string') return stripHtml(valueObject.html)
  return ''
}

function extractTextFromBlocks(blocks: any[] = []): string {
  return blocks
    .filter((block) => block?._type === 'block' && Array.isArray(block.children))
    .map((block) => block.children.map((child: any) => child?.text || '').join(''))
    .join('\n\n')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

