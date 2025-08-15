import {defineField, defineType} from 'sanity'

export const footerNavigation = defineType({
  title: 'Footer Navigation',
  name: 'footerNavigation',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      initialValue: 'Footer Navigation',
      hidden: true,
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'light',
      hidden: true,
      description: 'Footer theme (automatically set to gray)',
    }),
    defineField({
      title: 'Branding Text',
      name: 'brandingText',
      type: 'text',
      rows: 3,
      description: 'Main branding text displayed in the footer',
    }),
    defineField({
      name: 'navigationColumns',
      type: 'array',
      title: 'Navigation Columns',
      description: 'Three columns of navigation items',
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: 'object',
          title: 'Navigation Column',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Column Title',
              description:
                'Title for this navigation column (e.g., "Solutions", "Quick Links", "Legal")',
            }),
            defineField({
              name: 'items',
              type: 'array',
              title: 'Navigation Items',
              of: [{type: 'navigationItem'}],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'items',
            },
            prepare({title, subtitle}) {
              const itemCount = Array.isArray(subtitle) ? subtitle.length : 0
              return {
                title: title || 'Untitled Column',
                subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'platforms',
      type: 'array',
      title: 'Social Platforms',
      description: 'Add social media and platform links',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Platform',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  {title: 'Discord', value: 'discord'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'YouTube', value: 'youtube'},
                ],
              },
            }),
            defineField({
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({platform, url}) {
              return {
                title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Platform',
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'legalNavigation',
      type: 'array',
      title: 'Legal Navigation',
      description: 'Legal and compliance links (e.g., Privacy Policy, Terms of Service, etc.)',
      of: [{type: 'navigationItem'}],
    }),
    defineField({
      name: 'copyrightText',
      type: 'string',
      title: 'Copyright Text',
      description: 'Copyright notice text addition (e.g. after "© 2025 Machinify")',
      initialValue: 'All rights reserved.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Navigation',
      }
    },
  },
})
