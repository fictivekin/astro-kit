import {defineArrayMember, defineType} from 'sanity'
import {defaultDecorators, linkAnnotation} from './blockConfig'

/**
 * Minimal rich text: no lists, link annotation only, one line mode
 */
export const simpleBlockContent = defineType({
  title: 'Simple Block Content',
  name: 'simpleBlockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      options: {
        oneLine: true,
      },
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: defaultDecorators,
        annotations: [linkAnnotation],
      },
    }),
  ],
})
