import {fullContent, minimalContent} from '../shared/itemContent'
import {mediaField, mediaFields} from '../shared/media'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'
import {itemPreview} from '../shared/previewItem'

const SCHEMA_TITLE = 'Accordion'

export const accordion = defineType({
  title: SCHEMA_TITLE,
  name: 'accordion',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    defineField({
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Full', value: 'full'},
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      title: 'Initial Items Open',
      name: 'openItems',
      type: 'string',
      description: 'Select which accordion items should be open by default',
      options: {
        list: [
          {title: 'First', value: 'first'},
          {title: 'All', value: 'all'},
          {title: 'None', value: 'none'},
        ],
        layout: 'radio',
      },
      initialValue: 'first',
    }),
    ...fullContent({}, 'headline'),

    mediaField,

    defineField({
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
        {
          name: 'accordionItem',
          type: 'object',
          fields: [
            ...minimalContent({}),
            defineField({
              name: 'media',
              title: 'Media',
              type: 'object',
              fields: mediaFields,
            }),
          ],
          preview: itemPreview(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  fieldsets: [...sectionIdentifierFieldset, {name: 'headline', title: 'Headline', options: {collapsible: true, collapsed: true}}],
  preview: modulePreview(SCHEMA_TITLE)
})