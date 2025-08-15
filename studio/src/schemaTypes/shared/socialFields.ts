import {defineField} from 'sanity'
import {imageField} from './media'

export const socialFields = [
  defineField({
    title: 'Social Title',
    name: 'socialTitle',
    type: 'string',
    group: 'social',
  }),
  defineField({
    title: 'Social Description',
    name: 'socialDescription',
    type: 'text',
    group: 'social',
    rows: 3,
  }),
  defineField({
    title: 'Social Image',
    name: 'socialImage',
    ...imageField,
    group: 'social',
  }),
  defineField({
    title: 'Social Image Alt',
    name: 'socialImageAlt',
    type: 'string',
    group: 'social',
  }),
]
