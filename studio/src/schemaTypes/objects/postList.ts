import {defineField, defineType} from 'sanity'
import {TiersIcon} from '@sanity/icons'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'
import {fullContent} from '../shared/itemContent'
import {ctaFieldsWithFieldset} from '../shared/ctaFields'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Post List'

export const postList = defineType({
  title: SCHEMA_TITLE,
  name: 'postList',
  type: 'object',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...baseTheme(),
    ...fullContent({}, 'headline'),
    ctaFieldsWithFieldset('headline'),
    defineField({
      title: 'Posts',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
    }),
    defineField({
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: ['grid', 'carousel', 'carousel-sidebar'],
      },
      initialValue: 'grid',
    }),
  ],
  fieldsets: [
    ...sectionIdentifierFieldset,
    {name: 'headline', title: 'Headline', options: {collapsible: true, collapsed: true}}
  ],
  preview: modulePreview(SCHEMA_TITLE)
})
