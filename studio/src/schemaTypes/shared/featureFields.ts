import {mediaFields} from './media'
import {minimalContent} from './itemContent'
import {defineField} from 'sanity'
import {itemPreview} from './previewItem'

export const featureFields = defineField({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    ...minimalContent(),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'array',
      of: [
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: [...mediaFields],
    }),
    defineField({
      name: 'mediaSide',
      title: 'Media Side',
      type: 'string',
      description: 'Default: left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
    }),
  ],
  preview: itemPreview(),
})
