import {defineField} from 'sanity'

const eyebrowField = defineField({
    title: 'Eyebrow',
    name: 'eyebrow',
    type: 'string',
})

const titleField = defineField({
    title: 'Title',
    name: 'title',
    type: 'string',
})

const titleRichField = defineField({
  title: 'Title',
  name: 'title',
  type: 'simpleBlockContent',
})

const subheadField = defineField({
    title: 'Subhead',
    name: 'subhead',
    type: 'string',
})

const subheadRichField = defineField({
    title: 'Subhead',
    name: 'subhead',
    type: 'simpleBlockContent',
})

const bodyField = defineField({
    name: 'body',
    title: 'Body',
    type: 'bodyBlockContent',
})

const bodyTextField = defineField({
    name: 'body',
    title: 'Body',
    type: 'text',
    rows: 4
})


// ============================================================================
// Alignment Field
// ============================================================================

/**
 * Optional text alignment field - add when needed
 * @param fieldset - Optional fieldset name to group with other fields
 * @examples
 * // Standalone
 * fields: [...fullContent(), ...alignmentField()]
 *
 * // With fieldset
 * fields: [...fullContent({}, 'content'), ...alignmentField('content')]
 */
export const alignmentField = (fieldset?: string) => [
    defineField({
        name: 'alignment',
        title: 'Text Alignment',
        type: 'string',
        ...(fieldset && {fieldset}),
        options: {
            list: [
                {title: 'Left', value: 'left'},
                {title: 'Center', value: 'center'},
                {title: 'Right', value: 'right'},
            ],
            layout: 'radio',
        },
        initialValue: 'left',
    }),
]

// =============================================================================
// configurable formats + optional fieldset
// =============================================================================

type ContentFieldFormats = {
    titleFormat?: 'plain' | 'richText'
    subheadFormat?: 'plain' | 'richText'
}

function pickTitle(format: 'plain' | 'richText' = 'plain') {
    return format === 'richText' ? titleRichField : titleField
}

function pickSubhead(format: 'plain' | 'richText' = 'richText') {
    return format === 'richText' ? subheadRichField : subheadField
}

function pickBody(format: 'plain' | 'richText' = 'richText') {
    return format === 'plain' ? bodyTextField : bodyField
}

function minimalContentFields(options: ContentFieldFormats = {}, fieldset?: string) {
    const {titleFormat = 'plain'} = options
    const fields = [pickTitle(titleFormat), bodyField]
    return fieldset ? fields.map((f) => ({...f, fieldset})) : fields
}

function standardContentFields(options: ContentFieldFormats = {}, fieldset?: string) {
    const {titleFormat = 'plain'} = options
    const fields = [eyebrowField, pickTitle(titleFormat), bodyField]
    return fieldset ? fields.map((f) => ({...f, fieldset})) : fields
}

function fullContentFields(options: ContentFieldFormats = {}, fieldset?: string) {
    const {titleFormat = 'plain', subheadFormat = 'richText'} = options
    const fields = [eyebrowField, pickTitle(titleFormat), pickSubhead(subheadFormat), bodyField]
    return fieldset ? fields.map((f) => ({...f, fieldset})) : fields
}

// ============================================================================
// Content Field Combinations
// ============================================================================

/**
 * Returns the minimal set of content fields: title and body.
 *
 * @param {ContentFieldFormats} [options] - Optional configuration for the title format.
 * @param {string} [fieldset] - Optional fieldset group name.
 * @returns {object[]} Array of field definitions, optionally with fieldset applied.
 *
 * @example
 * // Use minimal content fields with default options:
 * const fields = ...minimalContent()
 *
 * @example
 * // Use standard content fields with richText title:
 * const fields = ...standardContent({ titleFormat: 'richText' })
 *
 * @example
 * // Use full content fields with richText title and string subhead:
 * const fields = ...fullContent({ titleFormat: 'richText', subheadFormat: 'string' })
 *
 * @example
 * // Use full content fields with richText title and group them under a fieldset:
 * const fields = ...fullContent({ titleFormat: 'richText' }, 'headline')
 */


export const minimalContent = (options: ContentFieldFormats = {}, fieldset?: string) =>
  minimalContentFields(options, fieldset)

export const standardContent = (options: ContentFieldFormats = {}, fieldset?: string) =>
  standardContentFields(options, fieldset)

export const fullContent = (options: ContentFieldFormats = {}, fieldset?: string) =>
  fullContentFields(options, fieldset)