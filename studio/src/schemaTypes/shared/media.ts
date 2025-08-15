import {defineField} from 'sanity'

/**
 * Standard image field configuration with hotspot enabled
 * Use this for any standalone image field
 */
export const imageField = {
  type: 'image' as const,
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
    },
  ],
}

export const mediaFields = [
  defineField({
    name: 'type',
    title: 'Media Type',
    type: 'string',
    options: {
      list: [
        {title: 'None', value: 'none'},
        {title: 'Image', value: 'image'},
        {title: 'Video', value: 'video'},
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: 'image',
    title: 'Image',
    ...imageField,
    options: {
      ...imageField.options,
      collapsible: true,
      collapsed: false,
    },
    fields: [
      {
        name: 'altText',
        type: 'string',
        title: 'Alternative Text',
      },
    ],
    hidden: ({parent}) => parent?.type !== 'image',
    validation: (Rule) =>
      Rule.custom((val, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parentType = (ctx as any)?.parent?.type
        if (parentType === 'image' && !val) {
          return 'Please add an image or switch to Video.'
        }
        return true
      }),
  }),
  defineField({
    name: 'video',
    title: 'Video',
    type: 'file',
    hidden: ({parent}) => parent?.type !== 'video',
    options: {
      accept: 'video/*',
    },
    validation: (Rule) =>
      Rule.custom((val, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parentType = (ctx as any)?.parent?.type
        if (parentType === 'video' && !val) {
          return 'Please add a video file or switch to Image.'
        }
        return true
      }),
  }),
]

export const mediaField = defineField({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: mediaFields,
})
