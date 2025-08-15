import {defineField, defineType} from 'sanity'

export const format = defineType({
  name: 'format',
  title: 'Content Format',
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
    defineField({
      name: 'featuredPost',
      title: 'Featured Post',
      type: 'reference',
      to: [{type: 'post'}],
      description: 'Select a featured post for this type',
      options: {
        filter: ({document}) => ({
          filter: 'defined(format) && format._ref == $typeId',
          params: {typeId: document?._id},
        }),
        disableNew: true,
      },
    }),
  ],
})
