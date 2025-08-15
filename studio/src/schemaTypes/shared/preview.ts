import {toPlainText} from '../../lib/helpers'

type RecordAny = Record<string, any>

/**
 * standard preview config with defaults and customization hooks.
 * https://www.sanity.io/docs/studio/previews-list-views
 * Always selects `sectionId`, `internalName`, `title`, and `theme`.
 * You can add `customSelect` for items, optionally use `customTitle` and `customSubtitle`.
 *
 * @example
 * // Basic usage
 * import {defineType} from 'sanity'
 * import {modulePreview} from '../shared/preview'
 *
 * const SCHEMA_TITLE = 'Primary Hero'
 *
 * export const hero = defineType({
 *   title: SCHEMA_TITLE,
 *   // ...
 *   preview: modulePreview(SCHEMA_TITLE),
 * })
 *
 * @example
 * // With custom select fields and a custom subtitle
 * const SCHEMA_TITLE = 'Testimonials'
 *
 * export const testimonials = defineType({
 *   title: SCHEMA_TITLE,
 *   // ...
 *   preview: modulePreview(SCHEMA_TITLE, {
 *     customSelect: {rating: 'rating'},
 *     customSubtitle: ({rating, theme, sectionId}) => {
 *       const ratingInfo = rating ? `, rating: ${rating}` : ''
 *       return `Testimonials${ratingInfo} (${theme || 'light'})${sectionId ? `, ID: ${sectionId}` : ''}`
 *     },
 *   }),
 * })
 */
export function modulePreview(
  schemaTitle: string,
  options: {
    customSelect?: Record<string, string>
    customTitle?: (selected: RecordAny) => string | undefined
    customSubtitle?: (selected: RecordAny) => string | undefined
    customPreviewImage?: (selected: RecordAny) => unknown
  } = {}
) {
  const {customSelect, customTitle, customSubtitle, customPreviewImage} = options
  return {
    select: {
      sectionId: 'sectionId',
      internalName: 'internalName',
      title: 'title',
      theme: 'theme',
      items: 'items',
      variant: 'variant',
      showIndex: 'showIndex',
      ...(customSelect || {}),
    },
    prepare(selected: RecordAny) {
      const defaultTitle = selected.internalName || toPlainText(selected.title) || schemaTitle
      const title = customTitle ? customTitle(selected) || defaultTitle : defaultTitle

      const variantPreview = selected.variant ? ` (${selected.variant})` : ''
      const itemsPreview = Array.isArray(selected.items) ? ` - ${selected.items.length} item${selected.items.length !== 1 ? 's' : ''}` : ''
      const indexPreview = selected.showIndex ? ', numbered' : ''
      const defaultSubtitle = `${schemaTitle}${variantPreview}${itemsPreview}${indexPreview} (${selected.theme || 'light'})${selected.sectionId ? `, ID: ${selected.sectionId}` : ''}`
      const subtitle = customSubtitle ? customSubtitle(selected) || defaultSubtitle : defaultSubtitle

      const result: RecordAny = {title, subtitle}
      return result
    },
  }
}


