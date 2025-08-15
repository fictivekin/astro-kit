import {ctaFields} from '../shared/ctaFields'
import {standardContent, alignmentField} from '../shared/itemContent'
import {mediaField} from '../shared/media'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'CTA Banner'

export const ctaBanner = defineType({
  title: SCHEMA_TITLE,
  name: 'ctaBanner',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...standardContent({}, 'content'),
    ...alignmentField('content'),
    mediaField,
    ctaFields,
  ],

  fieldsets: [
    ...sectionIdentifierFieldset,
    {name: 'content', title: 'Content', options: {collapsible: true, collapsed: false}},
  ],
  preview: modulePreview(SCHEMA_TITLE)
})