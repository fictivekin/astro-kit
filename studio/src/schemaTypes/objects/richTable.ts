import {defineField, defineType} from 'sanity'

import {Link} from '../../../sanity.types'

export type RichTableCell = {
  links?: Link[]
  subtext?: string
  text?: string
}

const richTableCell = defineField({
  name: 'richTableCell',
  title: 'Column',
  type: 'object',
  fields: [
    {name: 'text', type: 'string'},
    {
      name: 'subtext',
      type: 'string',
      hidden: ({parent, value}) => !value && !parent?.text,
    },
    {
      name: 'links',
      type: 'array',
      of: [{type: 'link'}],
      hidden: ({parent, value}) => {
        return Boolean(!value && parent?.text)
      },
    },
  ],
  preview: {
    select: {
      link0: 'links.0.label',
      link1: 'links.1.label',
      linkLabels: 'links',
      subtext: 'subtext',
      text: 'text',
    },
    prepare({link0, link1, subtext, text}) {
      const links = [link0, link1].filter(Boolean)

      return {
        subtitle: link0 ? 'Links' : subtext,
        title: link0 ? links.join(', ') : text,
      }
    },
  },
})

// richTableRow is implemented as a standalone type as a workaround to Sanity's
// limitation on multidimensional arrays
// https://www.sanity.io/docs/help/schema-array-of-array
export const richTableRow = defineType({
  title: 'Rich Table Row',
  name: 'richTableRow',
  type: 'object',
  fields: [
    {
      name: 'columns',
      type: 'array',
      of: [richTableCell],
    },
  ],
  preview: {
    select: {
      cell0: 'columns.0.text',
    },
    prepare({cell0}) {
      return {
        title: cell0,
      }
    },
  },
})

export const richTable = defineField({
  title: 'RichTable',
  name: 'richTable',
  type: 'object',
  fields: [
    {name: 'title', type: 'string'},
    {
      name: 'headerCells',
      title: 'Headers',
      type: 'array',
      of: [richTableCell],
    },
    {
      name: 'dataCells',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'richTableRow',
        },
      ],
    },
    {name: 'footnote', type: 'string'},
  ],
})
