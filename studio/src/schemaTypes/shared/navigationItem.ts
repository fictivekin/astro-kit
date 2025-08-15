import {defineType} from 'sanity';

export const navigationItem = defineType({
  name: 'navigationItem',
  type: 'object',
  title: 'Navigation Item',
  preview: {
    select: {
      title: 'link.label',
    },
  },
  fields: [
    {
      name: 'link',
      type: 'link',
      title: 'Link',
    },
    {
      name: 'linkText',
      type: 'string',
      title: 'Link Text',
      description: 'Very short text that appears below the link label',
    },
    {
      name: 'children',
      type: 'array',
      title: 'Child Items',
      description: 'Add child navigation items for dropdowns/nested menus - restrict to 1 level deep',
      of: [
        {
          type: 'navigationItem',
        },
      ],
    },
  ],
});
