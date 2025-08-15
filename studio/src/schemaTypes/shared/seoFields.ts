import {defineField} from 'sanity'

export const seoFields = [
  defineField({
    title: 'SEO Title',
    name: 'seoTitle',
    type: 'string',
    group: 'seo',
  }),
  defineField({
    title: 'SEO Description',
    name: 'seoDescription',
    type: 'text',
    group: 'seo',
    rows: 3,
  }),
  defineField({
    title: 'SEO Keywords',
    name: 'seoKeywords',
    type: 'array',
    of: [{type: 'string'}],
    group: 'seo',
  }),
  defineField({
    title: 'No Index',
    name: 'noIndex',
    type: 'boolean',
    group: 'seo',
    description: 'Check this box to prevent search engines from indexing this page',
    initialValue: false,
  }),
]

export const canonicalUrlField = defineField({
  title: 'Canonical URL',
  name: 'canonicalUrl',
  description:
    'A canonical URL is the preferred version of a page that Google uses when there are multiple versions of the same page.',
  type: 'url',
  group: 'seo',
})
