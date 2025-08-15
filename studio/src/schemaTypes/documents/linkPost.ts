import {defineField, defineType} from 'sanity';
import {imageField} from '../shared/media';

export const linkPost = defineType({
  title: 'Linked Post',
  name: 'linkPost',
  type: 'document',
  fields: [
    defineField({ title: 'Title', name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ title: 'Type/Category', name: 'type', type: 'string' }),
    defineField({ title: 'Description', name: 'description', type: 'text' }),
    defineField({ title: 'Image', name: 'image', ...imageField }),
    defineField({ title: 'URL', name: 'url', type: 'url' }),
    defineField({ title: 'File', name: 'file', type: 'file' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
    prepare({title, subtitle}) { return {title, subtitle}; }
  }
});