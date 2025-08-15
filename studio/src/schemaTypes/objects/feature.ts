import {featureFields} from '../shared/featureFields'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Feature'

export const feature = defineType({
  title: SCHEMA_TITLE,
  name: 'feature',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...featureFields.fields,
  ],

  fieldsets: [...sectionIdentifierFieldset],
  preview: modulePreview(SCHEMA_TITLE)
})
