import {defineField, defineType} from 'sanity'
import {TiersIcon} from '@sanity/icons'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {quoteFieldsWithMedia} from '../shared/quoteFields'
import {baseTheme} from '../shared/theme'
import {modulePreview} from '../shared/preview'
import {itemPreview} from '../shared/previewItem'

const SCHEMA_TITLE = 'Testimonials'

export const testimonials = defineType({
  title: SCHEMA_TITLE,
  name: 'testimonials',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Layout',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Carousel', value: 'carousel'},
        ],
      },
      initialValue: 'carousel',
    }),
    defineField({
      name: 'autoplay',
      type: 'boolean',
      title: 'Autoplay',
      description: 'Automatically advance through testimonials',
      hidden: ({parent}) => parent?.variant !== 'carousel',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Testimonials',
      of: [
        {
          name: 'testimonialItem',
          type: 'object',
          title: 'Testimonial',
          fields: quoteFieldsWithMedia,
          preview: itemPreview({ titlePath: 'text', mediaPath: 'media.image', fallbackTitle: 'Testimonial' }),
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  fieldsets: [...sectionIdentifierFieldset],
  preview: modulePreview(SCHEMA_TITLE)
})

