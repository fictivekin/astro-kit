import {seoFields} from '../shared/seoFields'
import {canonicalUrlField} from '../shared/seoFields'
import {socialFields} from '../shared/socialFields'
import {pageTheme} from '../shared/theme'
import {defineField, defineType} from 'sanity'
import {validateSlugFormat, validateUniqueAcrossPageTypes} from '../../lib/helpers'

export const simplePage = defineType({
    title: 'Simple Page',
    name: 'simplePage',
    type: 'document',
    groups: [
        {
            name: 'content',
            title: 'Content',
            default: true,
        },
        {
            name: 'appearance',
            title: 'Appearance',
        },
        {
            name: 'seo',
            title: 'SEO',
        },
        {
            name: 'social',
            title: 'Social',
        },
    ],
    fields: [
        defineField({
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'content',
        }),
        defineField({
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                isUnique: () => true, // Disable default uniqueness check; using custom validation instead
            },
            validation: (Rule) => [
                Rule.required(),
                Rule.custom(validateSlugFormat),
                Rule.custom((value) => {
                    if (value?.current === '404') {
                        return 'Slug cannot be "404"'
                    }
                    return true
                }),
                Rule.custom(validateUniqueAcrossPageTypes),
            ],
            group: 'content',
        }),
        defineField({
            title: 'Summary',
            name: 'summary',
            type: 'simpleBlockContent',
            group: 'content',
        }),
        defineField({
            title: 'Body',
            name: 'body',
            type: 'simplePageBlockContent',
            group: 'content',
        }),
        defineField({
            name: 'toc',
            title: 'Table of Contents',
            type: 'boolean',
            initialValue: false,
            group: 'content',
        }),

        defineField({
            title: 'Last Updated',
            name: 'lastUpdated',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            description: 'Date when this legal document was last updated',
            group: 'content',
        }),
        defineField({
            title: 'Last Version PDF',
            name: 'lastVersionPdf',
            type: 'file',
            group: 'content',
            options: {
                accept: '.pdf',
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Description of the PDF for accessibility',
                },
            ],
            description: 'Upload the last version of this legal document in PDF format',
        }),
        defineField({
            title: 'Current Version PDF',
            name: 'currentVersionPdf',
            type: 'file',
            group: 'content',
            options: {
                accept: '.pdf',
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Description of the PDF for accessibility',
                },
            ],
            description: 'Upload the current version of this legal document in PDF format',
        }),
        ...pageTheme(),
        ...seoFields,
        canonicalUrlField,
        ...socialFields,
    ],
})
