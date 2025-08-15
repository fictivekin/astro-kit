import {defineField, defineType} from 'sanity'

export const mainNavigation = defineType({
  title: 'Main Navigation',
  name: 'mainNavigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      title: 'Navigation Items',
      of: [{type: 'navigationItem'}],
    }),
    defineField({
      name: 'navigationCta1',
      type: 'cta',
      title: 'Navigation CTA 1',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'navigationCta2',
      type: 'cta',
      title: 'Navigation CTA 2',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Main Navigation',
      }
    },
  },
})
