import {
  LinkIcon,
  LaunchIcon,
  ImageIcon,
  ThLargeIcon,
  ComposeSparklesIcon,
  MicrophoneIcon,
  PlugIcon,
  CommentIcon,
  NumberIcon,
} from '@sanity/icons'
import {linkFields} from '../linkFields'
import {HorizontalRuleStyle} from '../editorStyles'
import {imageField} from '../media'
import {defineArrayMember} from 'sanity'

/**
 * Default block styles
 */
export const defaultStyles = [
  {title: 'Normal', value: 'normal'},
  {title: 'H2', value: 'h2'},
  {title: 'H3', value: 'h3'},
  {title: 'H4', value: 'h4'},
  {title: 'Horizontal Rule', value: 'hr', component: HorizontalRuleStyle},
]

/**
 * Default list types
 */
export const defaultLists = [
  {title: 'Bullet', value: 'bullet'},
  {title: 'Numbered', value: 'number'},
]

/**
 * Default text decorators
 */
export const defaultDecorators = [
  {title: 'Strong', value: 'strong'},
  {title: 'Emphasis', value: 'em'},
]

/**
 * Annotations
 */
export const linkAnnotation = {
  name: 'link',
  type: 'object',
  title: 'Link',
  icon: LinkIcon,
  fields: linkFields,
  options: {
    modal: {
      type: 'dialog',
      width: 'auto',
    },
  },
}

export const footnoteAnnotation = {
  name: 'footnote',
  type: 'object',
  title: 'Footnote Reference',
  icon: NumberIcon,
  fields: [
    { name: 'reference', type: 'number', title: 'Reference Number' },
    { name: 'note', type: 'text', title: 'Footnote Text' }
  ],
  options: {
    modal: {
      type: 'dialog',
      width: 'auto',
    },
  },
}

export const ctaAnnotation = {
  name: 'cta',
  type: 'object',
  title: 'CTA Button',
  icon: LaunchIcon,
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Button Text',
      description: 'Text to display on the button',
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Button Style',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Text', value: 'text'},
        ],
      },
      initialValue: 'primary',
    },
    ...linkFields,
  ],
  options: {
    modal: {
      type: 'dialog',
      width: 'auto',
    },
  },
}

/**
 * Default image member
 */
export const defaultImageMember = defineArrayMember({
  ...imageField,
  icon: ImageIcon,
  fields: [
    ...imageField.fields,
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
    },
    {
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: [
          {title: 'Large', value: 'large'},
          {title: 'Normal', value: 'normal'},
        ],
      },
      initialValue: 'normal',
    },
    {
      name: 'position',
      type: 'string',
      title: 'Position',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
    },
  ],
})

/**
 * Default embed types
 */
export const defaultEmbeds = [
  defineArrayMember({
    type: 'hubspotForm',
    icon: ComposeSparklesIcon,
  }),
  defineArrayMember({
    type: 'embeddedQuote',
    icon: MicrophoneIcon,
  }),
  defineArrayMember({
    type: 'embeddedContent',
    icon: PlugIcon,
  }),
  defineArrayMember({
    type: 'note',
    icon: CommentIcon,
  }),
]
