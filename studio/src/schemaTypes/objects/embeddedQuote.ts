import {defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons'
import {imageField} from '../shared/media'

export const embeddedQuote = defineType({
  title: 'Quote',
  name: 'embeddedQuote',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    {
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Quote text is required'),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Name of the person being quoted',
    },
    {
      name: 'authorTitle',
      title: "Author's Title",
      type: 'string',
      description: 'Title or position of the author',
    },
    {
      name: 'media',
      title: 'Image',
      ...imageField,
    },
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
    },
    prepare({quote, author}) {
      const title = quote
        ? quote.substring(0, 50) + (quote.length > 50 ? '...' : '')
        : 'Embedded Quote'
      const subtitle = author ? `— ${author}` : 'Quote'
      return {
        title,
        subtitle,
      }
    },
  },
})
