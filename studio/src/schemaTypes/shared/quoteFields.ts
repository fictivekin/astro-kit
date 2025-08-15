import {defineField} from 'sanity'
import {mediaFields} from './media'

/**
 * Standard quote/testimonial fields
 * Can be used in individual quotes or testimonial items
 */
export const quoteFields = [
  defineField({
    name: 'text',
    type: 'text',
    title: 'Quote Text',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'citation',
    type: 'string',
    title: 'Citation (Author Name)',
  }),
  defineField({
    name: 'citationDescriptor',
    type: 'string',
    title: 'Citation Descriptor (Author Title/Role)',
  }),
  defineField({
    name: 'url',
    type: 'url',
    title: 'Source URL (Optional)',
  }),
]

/**
 * Quote fields with media
 */
export const quoteFieldsWithMedia = [
  ...quoteFields,
  defineField({
    name: 'media',
    type: 'object',
    title: 'Media',
    fields: mediaFields,
  }),
]

