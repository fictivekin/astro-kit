import {ctaFields} from '../shared/ctaFields'
import {fullContent} from '../shared/itemContent'
import {sectionIdentifier, sectionIdentifierFieldset} from '../shared/sectionIdentifier'
import {BarChartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {modulePreview} from '../shared/preview'

const SCHEMA_TITLE = 'Stats'

export const stats = defineType({
  title: SCHEMA_TITLE,
  name: 'stats',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    ...sectionIdentifier(),
    ...fullContent({titleFormat: 'richText'}),
    ctaFields,
    defineField({
      name: 'statsItems',
      title: 'Stats',
      type: 'array',
      of: [
        defineField({
          name: 'statItem',
          title: 'Stat Item',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The stat number or value (e.g., "$13B", "70+", "3")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description of the stat',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
            },
            prepare({value, label}) {
              return {
                title: value || 'No value',
                subtitle: label || 'No label',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(2).max(4),
    }),
  ],
  fieldsets: [...sectionIdentifierFieldset],
  preview: modulePreview(SCHEMA_TITLE),
})

