import {defineField, defineType} from 'sanity'

export const resourceSettings = defineType({
  name: 'resourceSettings',
  title: 'General Settings',
  type: 'document',
  fields: [
    defineField({
      title: 'Resources Title',
      name: 'resourcesTitle',
      type: 'string',
      initialValue: 'Resources',
      description: 'Title shown at /resources (and as base for listings)',
    }),
    defineField({
      title: 'Resources Intro (fallback)',
      name: 'resourcesIntro',
      type: 'text',
      rows: 4,
      description: 'Default description shown on /resources when no type/category intro applies',
    }),
    defineField({
      title: 'Featured Post',
      name: 'featuredPost',
      type: 'reference',
      to: [{type: 'post'}],
      description: 'Select a featured for the main Resources page',
      options: {disableNew: true},
    }),
  ],
})
