import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'
import {canonicalUrlField, seoFields} from '../shared/seoFields'
import {socialFields} from '../shared/socialFields'
import {validateSlugFormat} from '../../lib/helpers'

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const kitchen = defineType({
  name: 'kitchen',
  title: 'Kitchen',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
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
  // string field
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    // slug field
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => [rule.required(), rule.custom(validateSlugFormat)],
      group: 'content',
    }),
    // array of predefined strings
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Product', value: 'product'},
          {title: 'Research', value: 'research'},
          {title: 'Company', value: 'company'},
          {title: 'Stories', value: 'stories'},
        ],
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    // array of strings
    defineField({
      title: 'Names',
      name: 'names',
      type: 'array',
      of: [{type: 'string'}],
      group: 'content',
    }),
    // tags field
    defineField({
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      group: 'content',
    }),
    // array of references
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
      validation: (rule) => rule.min(1).error('At least one author is required'),
      group: 'content',
    }),
    // array of references and objects
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}],
        },
        {
          type: 'object',
          fields: [{name: 'name', type: 'string'}],
        },
      ],
      validation: (rule) => rule.min(1).error('At least one author is required'),
      group: 'content',
    }),
    // date field
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
    // datetime field
    defineField({
      title: 'Published when',
      name: 'publishedWhen',
      type: 'datetime',
      group: 'content',
    }),
    // portable text field
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
    }),
    // text field
    defineField({
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      group: 'content',
    }),
    // boolean field
    defineField({
      title: 'Has the movie been released?',
      name: 'released',
      type: 'boolean',
      group: 'content',
    }),
    // image field
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
        }),
      ],
      group: 'content',
    }),
    // file field
    defineField({
      title: 'Manuscript',
      name: 'manuscript',
      type: 'file',
      fields: [
        {
          name: 'description',
          type: 'string',
          title: 'Description',
        },
        {
          name: 'author',
          type: 'reference',
          title: 'Author',
          to: {type: 'person'},
        },
      ],
      group: 'content',
    }),
    // geopoint field
    defineField({
      title: 'Launchpad Location',
      name: 'location',
      type: 'geopoint',
      group: 'content',
    }),
    // number field
    defineField({
      title: 'Current popularity',
      name: 'popularity',
      type: 'number',
      group: 'content',
    }),
    // object field
    defineField({
      title: 'Address',
      name: 'address',
      type: 'object',
      fields: [
        {name: 'street', type: 'string', title: 'Street name'},
        {name: 'streetNo', type: 'string', title: 'Street number'},
        {name: 'city', type: 'string', title: 'City'},
      ],
      group: 'content',
    }),
    // reference field
    defineField({
      name: 'movie',
      type: 'object',
      fields: [
        {
          title: 'Director',
          name: 'director',
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
      group: 'content',
    }),
    // url field
    defineField({
      title: 'Link',
      name: 'href',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      group: 'content',
    }),
    // seo fields
    ...seoFields,
    canonicalUrlField,
    ...socialFields,
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      title: 'title',
      authors: 'authors',
      date: 'date',
      media: 'coverImage',
    },
    prepare({title, media, authors, date}) {
      const authorNames = authors
        ?.map((author: any) =>
          author.firstName && author.lastName
            ? `${author.firstName} ${author.lastName}`
            : author.firstName || author.lastName,
        )
        .filter(Boolean)
        .join(', ')

      const subtitles = [
        authorNames && `by ${authorNames}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
