import {defineField} from 'sanity'
import {imageField} from './media'

export const videoFields = getVideoFields()
export const blogVideoFields = getBlogVideoFields()

function getVideoFields() {
  return [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'File Upload', value: 'file'},
        ],
        layout: 'radio',
      },
      initialValue: 'vimeo',
    }),
    defineField({
      name: 'vimeoId',
      title: 'Vimeo ID',
      type: 'string',
      description:
        'The numeric Vimeo video ID (e.g. 524933864 or 1091907305/fa66e5a0e0 for private videos).',
      hidden: ({parent}) => (parent as any)?.platform !== 'vimeo',
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if ((parent as any)?.platform === 'vimeo' && !value) return 'Vimeo ID is required'
          return true
        }),
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube ID',
      type: 'string',
      description: 'The numeric YouTube video ID (e.g. dQw4w9WgXcQ).',
      hidden: ({parent}) => (parent as any)?.platform !== 'youtube',
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if ((parent as any)?.platform === 'youtube' && !value) return 'YouTube ID is required'
          return true
        }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
      hidden: ({parent}) => (parent as any)?.platform !== 'file',
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if ((parent as any)?.platform === 'file' && !value) return 'Please upload a video file'
          return true
        }),
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      ...imageField,
      description: 'Custom background image shown before video plays',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      ...imageField,
      description: 'Thumbnail image for video preview (2:3): if modal mode is enabled',
    }),
  ]
}

function getBlogVideoFields() {
  return getVideoFields().filter((field) => field.name !== 'poster' && field.name !== 'thumbnail')
}
