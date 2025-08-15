import {ctaFields} from '../shared/ctaFields'
import {fullContent, alignmentField} from '../shared/itemContent'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Headline'

export const headline = defineType({
  title: SCHEMA_TITLE,
  name: 'headline',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...fullContent({ titleFormat: 'richText' }, 'headline'),
    ...alignmentField('headline'),
    ctaFields
  ],
  fieldsets: [...sectionIdentifierFieldset, {name: 'headline', title: 'Headline', options: {collapsible: true}}],
  preview: modulePreview(SCHEMA_TITLE)
})