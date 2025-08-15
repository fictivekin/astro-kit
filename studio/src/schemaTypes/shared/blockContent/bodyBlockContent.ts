import {defineArrayMember, defineType} from 'sanity'
import {
  defaultStyles,
  defaultLists,
  defaultDecorators,
  linkAnnotation,
  ctaAnnotation,
  defaultImageMember,
  defaultEmbeds,
} from './blockConfig'

/**
 * Default body block content
 */
export const bodyBlockContent = defineType({
  title: 'Body Block Content',
  name: 'bodyBlockContent',
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
    ...defaultEmbeds,
  ],
})
