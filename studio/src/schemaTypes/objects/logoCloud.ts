import {TiersIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {ctaFieldsWithFieldset} from '../shared/ctaFields'
import {standardContent, alignmentField} from '../shared/itemContent'
import {imageField} from '../shared/media'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {modulePreview} from '../shared/preview'
import {itemPreview} from '../shared/previewItem'

const SCHEMA_TITLE = 'Logo Cloud'

export const logoCloud = defineType({
  title: SCHEMA_TITLE,
  name: 'logoCloud',
  type: 'object',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...standardContent({}, 'headline'),
    ...alignmentField('headline'),
    ctaFieldsWithFieldset('headline'),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'logoCloudItem',
          type: 'object',
          fields: [
            defineField({
              name: 'media',
              title: 'Media',
              ...imageField,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: itemPreview({ titlePath: 'media.alt', mediaPath: 'media.asset', fallbackTitle: 'Logo' }),
        }),
      ],
    }),
  ],
  fieldsets: [...sectionIdentifierFieldset, {name: 'headline', title: 'Headline', options: {collapsible: true, collapsed: true}}],
  preview: modulePreview(SCHEMA_TITLE)
})