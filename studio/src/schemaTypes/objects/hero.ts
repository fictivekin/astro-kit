import {ctaFields} from '../shared/ctaFields'
import {fullContent} from '../shared/itemContent'
import {mediaField} from '../shared/media'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Primary Hero'

export const hero = defineType({
  title: SCHEMA_TITLE,
  name: 'hero',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme('Select the color scheme with best contrast'),
    ...fullContent({ titleFormat: 'richText' }),
    ctaFields,
    mediaField
  ],
  fieldsets: [...sectionIdentifierFieldset],
  preview: modulePreview(SCHEMA_TITLE),
})