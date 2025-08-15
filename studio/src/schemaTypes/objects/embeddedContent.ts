import {DocumentVideoIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export const embeddedContent = defineType({
  title: 'Embedded Content',
  name: 'embeddedContent',
  type: 'object',
  icon: DocumentVideoIcon,
  fields: [
    {
      name: 'html',
      type: 'text',
      title: 'HTML Content',
      description: 'Raw HTML content (YouTube embeds, iframes, etc.)',
      rows: 8,
    },
    {
      name: 'width',
      type: 'string',
      title: 'Width',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Half Width', value: 'half'},
        ],
      },
      initialValue: 'full',
    },
  ],
  preview: {
    select: {
      title: 'title',
      html: 'html',
      contentType: 'contentType',
    },
    prepare({title, html, contentType}) {
      const displayTitle = title || 'Embedded Content'
      const truncatedHtml = html
        ? html.substring(0, 80) + (html.length > 80 ? '...' : '')
        : 'No HTML content'
      return {
        title: displayTitle,
        subtitle: `${contentType || 'custom'} - ${truncatedHtml}`,
      }
    },
  },
})
