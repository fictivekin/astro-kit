import {card} from '../shared/card'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Carousel'

export const carousel = defineType({
  title: SCHEMA_TITLE,
  name: 'carousel',
  type: 'object',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Cards',
      name: 'items',
      type: 'array',
      of: [card],
      validation: (Rule) => Rule.required(),
    }),
  ],

  fieldsets: [...sectionIdentifierFieldset],
  preview: modulePreview(SCHEMA_TITLE),
})