import {defineField, defineType} from 'sanity'
import {bodyBlockContent} from '../shared/blockContent/bodyBlockContent'
import {imageField} from '../shared/media'
import {isUniqueSlug, slugify} from '../../lib/helpers'

export const people = defineType({
  title: 'Person',
  name: 'people',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: slugify,
        isUnique: isUniqueSlug,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Position',
      name: 'position',
      type: 'string',
    }),
    defineField({
      title: 'Company',
      name: 'company',
      type: 'string',
    }),
    defineField({
      title: 'Photo',
      name: 'photo',
      ...imageField,
    }),
    defineField({
      title: 'Bio',
      name: 'bio',
      type: 'bodyBlockContent',
    }),
  ],
})
