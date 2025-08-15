import {fullContent} from '../shared/itemContent'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {baseTheme} from '../shared/theme'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Team'

export const team = defineType({
  title: SCHEMA_TITLE,
  name: 'team',
  type: 'object',
  icon: TiersIcon,
  fields: [
    ...sectionIdentifier(),
    ...fullContent({}, 'headline'),
    ...baseTheme(),
    defineField({
      title: 'Team Members',
      name: 'teamMembers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'people'}],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footBody',
      title: 'Footer Body',
      type: 'bodyBlockContent',
      fieldset: 'footer',
    }),
  ],
  fieldsets: [
    ...sectionIdentifierFieldset,
    {name: 'headline', title: 'Headline', options: {collapsible: true}},
    {name: 'footer', title: 'Footer', options: {collapsible: true, collapsed: true}},
  ],
  preview: modulePreview(SCHEMA_TITLE),
})
