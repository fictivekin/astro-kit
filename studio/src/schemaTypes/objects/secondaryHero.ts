import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {ctaFields} from '../shared/ctaFields'
import {fullContent} from '../shared/itemContent'
import {mediaField} from '../shared/media'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Secondary Hero'

export const secondaryHero = defineType({
  title: SCHEMA_TITLE,
  name: 'secondaryHero',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...fullContent({}, 'headline'),
    ctaFields,
    mediaField,
  ],
  fieldsets: [...sectionIdentifierFieldset, {name: 'headline', title: 'Headline', options: {collapsible: true}}],
  preview: modulePreview(SCHEMA_TITLE),
})