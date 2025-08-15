import {ctaSizes, ctaVariants} from '../shared/ctaVariants'
import {linkFields} from '../shared/linkFields'
import {defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      options: {
        list: [...ctaVariants],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: [...ctaSizes],
      },
      initialValue: 'regular',
      hidden: true,
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      description: 'Text to display for the button',
    }),
    ...linkFields,
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({label: title}) {
      return {title: title || 'CTA'}
    },
  },
})
