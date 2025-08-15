import {defineField} from 'sanity'

export const linkFields = [
  defineField({
    name: 'linkType',
    title: 'Link Type',
    type: 'string',
    initialValue: 'href',
    options: {
      list: [
        {title: 'URL', value: 'href'},
        {title: 'Page', value: 'page'},
        {title: 'Simple Page', value: 'simplePage'},
        {title: 'Post', value: 'post'},
        {title: 'File', value: 'file'},
        {title: 'Hash', value: 'hash'},
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: 'href',
    title: 'URL',
    type: 'string',
    initialValue: '/',
    hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
    validation: (Rule) =>
      Rule.custom((value, context: any) => {
        if (context.parent?.linkType === 'href' && !value) {
          return 'URL is required when Link Type is URL'
        }
        if (context.parent?.linkType === 'href' && value) {
          // Allow mailto: links, standard URLs, and relative paths
          const isValidUrl = /^(https?:\/\/|mailto:|\/)/i.test(value)
          if (!isValidUrl) {
            return 'URL must start with http://, https://, mailto:, or / for relative links'
          }
        }
        return true
      }),
  }),
  defineField({
    name: 'hash',
    title: 'Hash',
    description: 'Section id you want to scroll to',
    type: 'string',
    hidden: ({parent}) => parent?.linkType !== 'hash' && parent?.linkType != null,
    validation: (Rule) =>
      Rule.custom((value, context: any) => {
        if (context.parent?.linkType === 'hash' && !value) {
          return 'Hash is required when Link Type is Hash'
        }
        return true
      }),
  }),
  defineField({
    name: 'page',
    title: 'Page',
    type: 'reference',
    to: [{type: 'page'}],
    hidden: ({parent}) => parent?.linkType !== 'page',
    validation: (Rule) =>
      // Custom validation to ensure page reference is provided if the link type is 'page'
      Rule.custom((value, context: any) => {
        if (context.parent?.linkType === 'page' && !value) {
          return 'Page reference is required when Link Type is Page'
        }
        return true
      }),
  }),
  defineField({
    name: 'simplePage',
    title: 'Simple Page',
    type: 'reference',
    to: [{type: 'simplePage'}],
    hidden: ({parent}) => parent?.linkType !== 'simplePage',
    validation: (Rule) =>
      // Custom validation to ensure simple page reference is provided if the link type is 'simplePage'
      Rule.custom((value, context: any) => {
        if (context.parent?.linkType === 'simplePage' && !value) {
          return 'Simple Page reference is required when Link Type is Simple Page'
        }
        return true
      }),
  }),
  defineField({
    name: 'post',
    title: 'Post',
    type: 'reference',
    to: [{type: 'post'}],
    hidden: ({parent}) => parent?.linkType !== 'post',
    validation: (Rule) =>
      // Custom validation to ensure post reference is provided if the link type is 'post'
      Rule.custom((value, context: any) => {
        if (context.parent?.linkType === 'post' && !value) {
          return 'Post reference is required when Link Type is Post'
        }
        return true
      }),
  }),
  defineField({
    name: 'file',
    title: 'File',
    type: 'file',
    hidden: ({parent}) => parent?.linkType !== 'file',
    validation: (Rule) =>
      // Custom validation to ensure file reference is provided if the link type is 'file'
      Rule.custom((value, context: any) => {
        if (context.parent?.linkType === 'file' && !value) {
          return 'File reference is required when Link Type is File'
        }
        return true
      }),
  }),
  defineField({
    name: 'openInNewTab',
    title: 'Open in new tab',
    type: 'boolean',
    initialValue: false,
  }),
  defineField({
    name: 'onClick',
    title: 'onClick',
    type: 'string',
    description: 'JavaScript function to execute when the link is clicked. USE WITH CAUTION',
  }),
]
