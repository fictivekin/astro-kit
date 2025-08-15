import {ctaFieldsWithFieldset} from '../shared/ctaFields'
import {fullContent} from '../shared/itemContent'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {videoFields} from '../shared/videoFields'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Video'

export const video = defineType({
  title: SCHEMA_TITLE,
  name: 'video',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...fullContent({}, 'headline'),
    ctaFieldsWithFieldset('headline'),
    ...videoFields,
    defineField({
      name: 'btnPosition',
      title: 'Button Position',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Bottom Left', value: 'bottom-left'},
          {title: 'Bottom Right', value: 'bottom-right'},
        ],
      },
      initialValue: 'bottom-left',
    }),
    defineField({
      name: 'mediaPosition',
      title: 'Media Position',
      type: 'string',
      options: {
        list: [
          {title: 'Right Aligned', value: 'right'},
          {title: 'Full Width', value: 'full'},
        ],
      },
      initialValue: 'full',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInModal',
      title: 'Open in Modal',
      type: 'boolean',
      description: 'Open video in a modal overlay',
      initialValue: false,
    }),
  ],
  fieldsets: [...sectionIdentifierFieldset, {name: 'headline', title: 'Headline', options: {collapsible: true, collapsed: true}}],
  preview: modulePreview(SCHEMA_TITLE),
})