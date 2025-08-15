import {seoFields} from '../shared/seoFields'
import {socialFields} from '../shared/socialFields'
import {defineField, defineType} from 'sanity'
import {bannerFields} from '../shared/bannerFields'
import {sectionIdentifierFieldset} from '../shared/sectionIdentifier'

export const siteSettings = defineType({
    title: 'Site Settings',
    name: 'siteSettings',
    type: 'document',
    groups: [
        {
            name: 'settings',
            title: 'Settings',
            default: true,
        },
        {
            name: 'banner',
            title: 'Banner',
        },
        {
            name: 'seo',
            title: 'SEO',
        },
        {
            name: 'social',
            title: 'Social Media',
        },
        {
            name: 'analytics',
            title: 'Analytics',
        },
        {
            name: 'integrations',
            title: 'Integrations',
        },
    ],
    fields: [
        defineField({
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'settings',
        }),
        defineField({
            title: 'Legal Name',
            name: 'legalName',
            type: 'string',
            group: 'settings',
        }),
        defineField({
            title: 'Enable Search',
            name: 'enableSearch',
            type: 'boolean',
            initialValue: false,
            group: 'settings',
        }),
        defineField({
            title: 'Google Tag Manager ID',
            name: 'googleTagManagerId',
            type: 'string',
            description: 'The GTM container ID (e.g. GTM-XXXXXX)',
            group: 'analytics',
        }),
        defineField({
            title: 'Google Analytics ID',
            name: 'googleAnalyticsId',
            type: 'string',
            description: 'The Google Analytics ID (e.g. G-XXXXXXXXXX)',
            group: 'analytics',
        }),
        defineField({
            title: 'Facebook App ID',
            name: 'facebookAppId',
            type: 'string',
            group: 'analytics',
        }),
        ...seoFields,
        ...socialFields,
        defineField({
            title: 'Twitter Username',
            name: 'twitter',
            type: 'string',
            group: 'social',
        }),
        defineField({
            name: 'portalId',
            title: 'Hubspot Portal ID',
            type: 'string',
            group: 'integrations',
        }),
        defineField({
            name: 'region',
            title: 'Hubspot Region',
            type: 'string',
            group: 'integrations',
        }),
        defineField({
            title: 'Marker IO Destination ID',
            name: 'markerIoDestinationId',
            description: 'The marker.io destination ID, enables the feedback tool on QA',
            type: 'string',
            group: 'integrations',
        }),
        // Global banner controls
        defineField({
            title: 'Enable Global Banner',
            name: 'globalBannerEnabled',
            type: 'boolean',
            initialValue: false,
            group: 'banner',
            description:
                'When enabled, the Global Banner shows on every page (unless a page renders a scoped banner and opts out of site-wide).',
        }),
        defineField({
            title: 'Global Banner',
            name: 'globalBanner',
            type: 'object',
            group: 'banner',
            description: 'Global banner that appears on every page when enabled.',
            fields: bannerFields((value, context) => {
                // Only require sectionId when globalBannerEnabled is true
                if (!context.document?.globalBannerEnabled) {
                    return true
                }
                return value ? true : 'Required when Global Banner is enabled'
            }),
            fieldsets: [...sectionIdentifierFieldset],
        }),
    ],
})
