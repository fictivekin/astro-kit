import {canonicalUrlField, seoFields} from '../shared/seoFields'
import {socialFields} from '../shared/socialFields'
import {ctaFields} from '../shared/ctaFields'
import {imageField} from '../shared/media'
import {defineField, defineType} from 'sanity'
import {validateSlugFormat} from '../../lib/helpers'

export default defineType({
  title: 'Post',
  name: 'post',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'display',
      title: 'Display',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'social',
      title: 'Social',
    },
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => [Rule.required(), Rule.custom(validateSlugFormat)],
      group: 'content',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'reference',
      to: [{type: 'format'}],
      options: {
        /**
         * Sorts the reference input alphabetically by title.
         * NOTE: Not in ReferenceOptions TS types, but supported by Studio's reference input.
         * See https://github.com/sanity-io/sanity/issues/2295
         */
        // @ts-ignore - sort is supported but not in TS types
        sort: [{field: 'title', direction: 'asc'}],
      },
      group: 'content',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'topic'}],
          options: {
            /**
             * Sorts the reference input alphabetically by title.
             * NOTE: Not in ReferenceOptions TS types, but supported by Studio's reference input.
             * See https://github.com/sanity-io/sanity/issues/2295
             */
            sort: [{field: 'title', direction: 'asc'}],
          },
        },
      ],
      options: {sortable: true},
      description: 'Select one or more topics (first shows in UI by default)',
      group: 'content',
    }),
    defineField({
      title: 'Published On',
      name: 'publishedOn',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author(s)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'people'}],
        },
      ],
      description: 'Select one or more authors for this post',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'postBlockContent',
      group: 'content',
    }),
    defineField({
      name: 'thumbnailText',
      title: 'Thumbnail Text',
      type: 'text',
      rows: 3,
      description: 'Short preview text for cards and listings',
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      ...imageField,
      group: 'content',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
          options: {
            disableNew: true,
          },
        },
      ],
      validation: (Rule) => Rule.length(4).error('Please select 4 related posts'),
      description: 'Select 4 related blog posts. Falls back to tag based matching.',
      group: 'display',
    }),
    defineField({
      name: 'showRelatedPosts',
      title: 'Show Related Posts',
      type: 'boolean',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'showTOC',
      title: 'Show Table of Contents',
      type: 'boolean',
      description: 'Display table of contents for this post',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'showReadingTime',
      title: 'Show Reading Time',
      type: 'boolean',
      description: 'Display estimated reading time for this post',
      initialValue: true,
      group: 'display',
    }),
    ...seoFields,
    ...socialFields,
    canonicalUrlField,
  ],
  preview: {
    select: {
      publishedOn: 'publishedOn',
      title: 'title',
    },
    prepare({publishedOn, title}) {
      const subtitle = publishedOn
        ? new Date(publishedOn).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : undefined
      return {
        subtitle,
        title,
      }
    },
  },
})
