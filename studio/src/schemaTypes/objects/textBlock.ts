import {standardContent} from '../shared/itemContent'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {ctaFields} from '../shared/ctaFields'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Text Block'

export const textBlock = defineType({
  title: SCHEMA_TITLE,
  name: 'textBlock',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...standardContent(),
    ctaFields,
    defineField({
      name: 'variant',
      title: 'Text Block Variant',
      type: 'string',
      description: 'Choose the text block style.',
      options: {
        list: [
          {title: 'Style 1', value: 'variant-1'},
          {title: 'Style 2', value: 'variant-2'},
        ],
      },
      initialValue: 'variant-1',
    }),
  ],

  fieldsets: [...sectionIdentifierFieldset],
  preview: modulePreview(SCHEMA_TITLE),
})