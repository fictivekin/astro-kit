import {card} from '../shared/card'
import {ctaFieldsWithFieldset} from '../shared/ctaFields'
import {fullContent} from '../shared/itemContent'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Multicard'

export const multicard = defineType({
  title: SCHEMA_TITLE,
  name: 'multicard',
  type: 'object',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...fullContent({}, 'headline'),
    ctaFieldsWithFieldset('headline'),
    defineField({
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: ['grid', 'carousel', 'carousel-sidebar'],
      },
      initialValue: 'grid',
    }),
    defineField({
      title: 'Columns',
      name: 'columns',
      type: 'string',
      options: {
        list: ['2', '3', '4'],
      },
      hidden: ({parent}) => parent?.layout !== 'grid',
    }),
    defineField({
      title: 'Cards',
      name: 'multicardItems',
      type: 'array',
      of: [card],
      validation: (Rule) => Rule.required(),
    }),
  ],
  fieldsets: [
    ...sectionIdentifierFieldset,
    {name: 'headline', title: 'Headline', options: {collapsible: true, collapsed: true}},
  ],
  preview: modulePreview(SCHEMA_TITLE)
})