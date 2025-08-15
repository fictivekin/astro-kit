import {TiersIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {blogVideoFields} from '../shared/videoFields'

export const blogVideo = defineType({
  title: 'Video',
  name: 'blogVideo',
  type: 'document',
  icon: TiersIcon,
  fields: [...blogVideoFields],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'Blog Video',
        subtitle: 'Video',
      }
    },
  },
})
