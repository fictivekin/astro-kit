import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Divider'

export const divider = defineType({
  title: SCHEMA_TITLE,
  name: 'divider',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    defineField({
      name: 'variant',
      title: 'Divider Variant',
      type: 'string',
      description: 'Choose the divider style.',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Thick', value: 'thick'},
        ],
      },
      initialValue: 'default',
    }),
  ],

  fieldsets: [...sectionIdentifierFieldset],
  preview: modulePreview(SCHEMA_TITLE)
})
