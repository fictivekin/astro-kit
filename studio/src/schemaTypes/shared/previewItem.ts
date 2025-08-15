import {toPlainText} from '../../lib/helpers'

type ItemPreviewOptions = {
  titlePath?: string
  mediaPath?: string
  fallbackTitle?: string
}

/**
 * Shared list preview for nested items/objects.
 * Converts rich text fields to strings using previewText and supports media.
 *
 * @example
 * preview: itemPreview()
 *
 * @example
 * // Custom paths
 * preview: itemPreview({ mediaPath: 'media.image' })
 */
export function itemPreview(options: ItemPreviewOptions = {}) {
  const { titlePath = 'title', mediaPath = 'media.image', fallbackTitle = 'Item' } = options

  const select: Record<string, string> = { title: titlePath }
  if (mediaPath) select.media = mediaPath

  return {
    select,
    prepare(selection: Record<string, unknown>) {
      const title = toPlainText(selection.title)
      const media = selection.media as any
      return {
        title: title || fallbackTitle,
        ...(media ? {media} : {}),
      }
    },
  }
}


