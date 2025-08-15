import {defineType} from 'sanity'
import {TiersIcon} from '@sanity/icons'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {quoteFieldsWithMedia} from '../shared/quoteFields'
import {baseTheme} from '../shared/theme'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Quote'

export const quote = defineType({
  title: SCHEMA_TITLE,
  name: 'quote',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...quoteFieldsWithMedia,
  ],
  fieldsets: [...sectionIdentifierFieldset],
  preview: modulePreview(SCHEMA_TITLE, {
    customSelect: {text: 'text', citation: 'citation', media: 'media.image'},
    customTitle: ({internalName, text}) => {
      const truncated = text ? (text.length > 50 ? text.substring(0, 50) + '...' : text) : undefined
      return internalName || truncated
    },
    customSubtitle: ({sectionId, citation}) => {
      return `${SCHEMA_TITLE}${citation ? ` - ${citation}` : ''}${sectionId ? `, ID: ${sectionId}` : ''}`
    },
  }),
})
