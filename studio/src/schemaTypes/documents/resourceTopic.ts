import {defineField, defineType} from 'sanity'

export const topic = defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 5,
      description: 'Optional intro shown on category listing pages',
    }),
  ],
})
