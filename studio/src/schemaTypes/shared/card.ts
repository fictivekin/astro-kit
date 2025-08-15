import {fullContent} from './itemContent'
import {mediaFields} from './media'
import {defineField} from 'sanity'
import {itemPreview} from '../shared/previewItem'

export const card = defineField({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: mediaFields,
      options: {
        collapsible: true,
      },
    }),
    ...fullContent({}, 'content'),
    defineField({
        name: 'makeClickable',
        type: 'boolean',
        title: 'Make clickable',
        initialValue: false,
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
      description: 'Link destination (only used if "Make clickable" is enabled)',
      hidden: ({parent}) => !parent?.makeClickable,
    }),
  ],
  fieldsets: [
    {name: 'content', title: 'Content', options: {collapsible: true}},
  ],
  preview: itemPreview({mediaPath: 'media.image'}),
})
