import {ctaFieldsWithFieldset} from '../shared/ctaFields'
import {fullContent} from '../shared/itemContent'
import {featureFields} from '../shared/featureFields'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Feature Stack'

export const featureStack = defineType({
  title: SCHEMA_TITLE,
  name: 'featureStack',
  type: 'document',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...fullContent({}, 'headline'),
    ctaFieldsWithFieldset('headline'),
    defineField({
      title: 'Features',
      name: 'features',
      type: 'array',
      of: [featureFields],
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      description: 'Optional text alignment override',
      options: {
        list: [
          {title: 'Bottom', value: 'bottom'},
          {title: 'Top', value: 'top'},
        ],
      },
    }),
  ],

  fieldsets: [
    ...sectionIdentifierFieldset,
    {name: 'headline', title: 'Headline', options: {collapsible: true, collapsed: true}},
  ],
  preview: modulePreview(SCHEMA_TITLE)
})
