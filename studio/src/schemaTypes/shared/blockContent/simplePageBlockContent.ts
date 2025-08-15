import {defineArrayMember, defineType} from 'sanity'
import {
  defaultStyles,
  defaultLists,
  defaultDecorators,
  linkAnnotation,
  ctaAnnotation,
  defaultImageMember,
} from './blockConfig'

/**
 * Simple page block content - standard rich text with images
 * Used exclusively for simplePage document body content
 */
export const simplePageBlockContent = defineType({
  title: 'Simple Page Block Content',
  name: 'simplePageBlockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: defaultStyles,
      lists: defaultLists,
      marks: {
        decorators: defaultDecorators,
        annotations: [linkAnnotation, ctaAnnotation],
      },
    }),
    defaultImageMember,
  ],
})
