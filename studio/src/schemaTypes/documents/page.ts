import {canonicalUrlField, seoFields} from '../shared/seoFields'
import {socialFields} from '../shared/socialFields'
import {pageTheme} from '../shared/theme'
import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {validateSlugFormat, validateUniqueAcrossPageTypes} from '../../lib/helpers'

const isSpecialPage = (id?: string) => /^(drafts\.)?(homepage|notFoundPage)$/.test(id || '')

export const pageSectionTypes = [
    {type: 'accordion'},
    {type: 'banner'},
    {type: 'carousel'},
    {type: 'ctaBanner'},
    {type: 'divider'},
    {type: 'feature'},
    {type: 'featureStack'},
    {type: 'headline'},
    {type: 'hubspotForm'},
    {type: 'hero'},
    {type: 'secondaryHero'},
    {type: 'stats'},
    {type: 'list'},
    {type: 'logoCloud'},
    {type: 'multicard'},
    {type: 'postList'},
    {type: 'quote'},
    {type: 'team'},
    {type: 'testimonials'},
    {type: 'textBlock'},
    {type: 'video'},
]

export const page = defineType({
    title: 'Page',
    name: 'page',
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
        {
            name: 'advanced',
            title: 'Advanced',
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
                Rule.custom(validateSlugFormat),
                Rule.custom((value, context) => {
                    if (isSpecialPage(context.document?._id)) {
                        return true
                    } else if (!value?.current) {
                        return 'Required'
                    }
                    return true
                }),
                Rule.custom((value) => {
                    if (value?.current === '404') {
                        return 'Slug cannot be "404"'
                    }
                    return true
                }),
                Rule.custom(validateUniqueAcrossPageTypes),
            ],
            group: 'content',
            hidden: ({document}) => isSpecialPage(document?._id),
        }),
        defineField({
            title: 'Sections',
            name: 'sections',
            type: 'array',
            of: [
                ...pageSectionTypes,
                {
                    name: 'linkedSection',
                    title: 'Linked Section',
                    type: 'reference',
                    icon: LinkIcon,
                    to: pageSectionTypes,
                },
            ],
            group: 'content',
        }),
        ...pageTheme(),
        ...seoFields,
        canonicalUrlField,
        ...socialFields,
    ],
})

export const blankPageTemplate = {
    id: 'blankPage',
    title: 'Blank Page',
    schemaType: 'page',
    value: {},
}

// initial value templates
