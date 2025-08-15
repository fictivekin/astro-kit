import {defineType} from 'sanity'
import {TiersIcon} from '@sanity/icons'

export const note = defineType({
  title: 'Note',
  name: 'note',
  type: 'object',
  icon: TiersIcon,
  fields: [
    {
      name: 'title',
      title: 'Note Title',
      type: 'string',
    },
    {
      name: 'note',
      title: 'Note Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Note text is required'),
    },
  ],
  preview: {
    select: {
      title: 'title',
      note: 'note',
    },
    prepare({title, note}) {
      const previewTitle = title
        ? title : note.substring(0, 50) + (note.length > 50 ? '...' : '');
      return {
        title: previewTitle
      }
    },
  },
})
