import {DocumentIcon, LaunchIcon, LinkIcon} from '@sanity/icons';

export const annotationLinks = [
  {
    name: 'link',
    type: 'object',
    title: 'External link',
    icon: LaunchIcon,
    fields: [
      {
        name: 'url',
        type: 'string',
        title: 'URL',
      },
      {
        title: 'Open in new tab',
        name: 'newWindow',
        type: 'boolean',
        initialValue: false,
      },
    ],
  },
  {
    name: 'internalLink',
    type: 'object',
    title: 'Internal link',
    icon: LinkIcon,
    fields: [
      {
        name: 'reference',
        type: 'reference',
        title: 'Reference',
              to: [
        {type: 'post'},
        {type: 'page'},
        {type: 'simplePage'},
      ],
      },
    ],
  },
  {
    // This can be the name of your choice but make note of it
    // as you will reference it when writing your front end code
    name: 'assetReference',
    type: 'object',
    title: 'File Reference',
    icon: DocumentIcon,
    description: 'Link pieces of text to a previously uploaded file.',
    fields: [
      {
        name: 'file',
        // Notice the the type here is 'file'.
        // In the unsuccessful approach, it was originally 'reference'
        type: 'file',
        title: 'File Attachment',
      },
    ],
  },
];
