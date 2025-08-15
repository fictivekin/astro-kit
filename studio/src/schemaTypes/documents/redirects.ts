import {defineField, defineType, isSlug, SlugValue} from 'sanity'
import {RedoIcon} from '@sanity/icons'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: RedoIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'slug',
      description: `The original URL that will now redirect to the given destination. It should begin with a '/' and can contain a wildcard ending to the url as '<path:path>', which would look something like '/blog/<path:path>' and would match '/blog/test' or '/blog/example/3', etc.`,
      validation: (Rule) =>
        Rule.required().custom((source: SlugValue | undefined) => {
          if (!source || !source.current || source.current === '') return 'Source URL is required'
          //if (!isSlug(source.current)) return 'Source URL must be a valid slug';
          if (!source.current.startsWith('/')) {
            return 'Source URL must start with a slash. (e.g. /old-path)'
          }
          // Check for trailing slashes only (redirects need leading slash but not trailing)
          if (source.current.endsWith('/')) {
            return 'Source URL cannot end with a slash'
          }
          return true
        }),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: `The target URL to redirect to. It can contain a wildcard ending by using '{path}', which would look something like '/articles/{path}'. A redirect from '/blog/example/3' via rule '/blog/<path:path>' to rule '/articles/{path}' would go to '/articles/example/3'.`,
      validation: (Rule) =>
        Rule.required().custom((destination: string | undefined) => {
          if (!destination || destination === '') return 'Destination URL is required'
          try {
            if (destination.startsWith('//')) {
              throw new Error()
            }
            if (destination.startsWith('/')) {
              // The base URL is irrelevant for this validation, but we provide it to ensure
              // that relative paths are correctly parsed without throwing an error.
              new URL(destination, 'https://cursor.io')
            } else {
              const parsed = new URL(destination)
              if (
                !parsed.protocol ||
                !['ftp:', 'ftps:', 'http:', 'https:'].includes(parsed.protocol)
              ) {
                throw new Error()
              }
            }
          } catch {
            return (
              'Destination URL must be a valid URL (relative or absolute are both accepted, ' +
              'but absolute URLs must include a valid protocol like http:// or https://)'
            )
          }
          return true
        }),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent Redirect',
      type: 'boolean',
      description: 'Whether the redirect is permanent (301) or temporary (302)',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'source.current',
      target: 'destination',
    },
    prepare({title, target}) {
      return {
        title: title || 'Redirect',
        subtitle: `Redirects to ${target || 'another URL'}`,
      }
    },
  },
})
