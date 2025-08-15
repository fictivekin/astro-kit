import {fullContent} from '../shared/itemContent'
import {ctaFields, ctaFieldsWithFieldset} from '../shared/ctaFields'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineArrayMember, defineType, defineField} from 'sanity'
import {modulePreview} from '../shared/preview'
import {itemPreview} from '../shared/previewItem'

const SCHEMA_TITLE = 'List'

export const list = defineType({
  title: SCHEMA_TITLE,
  name: 'list',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...fullContent({}, 'headline'),
    ctaFieldsWithFieldset('headline'),
    defineField({
      name: 'variant',
      title: 'Layout',
      type: 'string',
      description: 'Choose the list layout style',
      options: {
        list: [
          {title: 'One Column', value: 'one-column'},
          {title: 'Two Column', value: 'two-column'},
        ],
        layout: 'radio',
      },
      initialValue: 'one-column',
    }),
    defineField({
      name: 'showIndex',
      title: 'Show Numbers',
      type: 'boolean',
      description: 'Display numbers in front of list items',
      initialValue: false,
    }),
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'item',
          title: 'Item',
          fields: [
            ...fullContent(),
            {
              ...ctaFields,
              description: 'Link for this list item',
            },
            defineField({
              name: 'wrapInLink',
              title: 'Wrap Item in Link',
              type: 'boolean',
              description: 'If true, wraps the entire item in a link. If false, shows a separate button.',
              initialValue: false,
            }),
          ],
          preview: itemPreview(),
        }),
      ],
    },
  ],
  fieldsets: [
    ...sectionIdentifierFieldset,
    {name: 'headline', title: 'Headline', options: {collapsible: true, collapsed: true}},
  ],
  preview: modulePreview(SCHEMA_TITLE)
})