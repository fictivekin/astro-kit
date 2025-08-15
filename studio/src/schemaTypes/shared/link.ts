import {linkFields} from '../shared/linkFields'
import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      description: 'Text to display for the link',
    }),
    ...linkFields,
  ],
})
