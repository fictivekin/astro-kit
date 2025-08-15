import {standardContent} from '../shared/itemContent'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Hubspot Form'

export const hubspotForm = defineType({
  title: SCHEMA_TITLE,
  name: 'hubspotForm',
  type: 'object',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    defineField({
      name: 'formId',
      title: 'Hubspot Form ID',
      type: 'string',
    }),
    ...standardContent({}, 'headline'),
  ],
  fieldsets: [...sectionIdentifierFieldset, {name: 'headline', title: 'Headline', options: {collapsible: true}}],
  preview: modulePreview(SCHEMA_TITLE)
})