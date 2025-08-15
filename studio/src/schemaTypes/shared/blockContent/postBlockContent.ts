import {defineArrayMember, defineType} from 'sanity'
import {VideoIcon} from '@sanity/icons'
import {
  defaultStyles,
  defaultLists,
  defaultDecorators,
  linkAnnotation,
  footnoteAnnotation,
  ctaAnnotation,
  defaultImageMember,
  defaultEmbeds,
} from './blockConfig'

/**
 * Default post block content
 */
export const postBlockContent = defineType({
  title: 'Post Block Content',
  name: 'postBlockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: defaultStyles,
      lists: defaultLists,
      marks: {
        decorators: [
          ...defaultDecorators,
          {title: 'Code', value: 'code'},
        ],
        annotations: [linkAnnotation, ctaAnnotation, footnoteAnnotation],
      },
    }),
    defaultImageMember,
    defineArrayMember({
      type: 'blogVideo',
      icon: VideoIcon,
    }),
    ...defaultEmbeds,
  ],
})
