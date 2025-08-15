import {defineField} from 'sanity'
import {ctaFields} from './ctaFields'
import {sectionId, internalName} from '../shared/sectionIdentifier'
import {baseTheme} from '../shared/theme'

/**
 * Banner fields with optional conditional sectionId requirement
 * @param conditionalRequirement - Optional validation function for conditional sectionId requirement
 * @example
 * // Always required (default):
 * fields: bannerFields()
 *
 * // Conditionally required based on parent field:
 * fields: bannerFields((value, context) => {
 *   if (!context.document?.globalBannerEnabled) return true
 *   return value ? true : 'Required when banner is enabled'
 * })
 */
export const bannerFields = (
    conditionalRequirement?: (value: any, context: any) => true | string,
) => [
    defineField({
        name: 'sectionId',
        title: 'Section ID',
        type: 'string',
        description: 'Stable id for dismissal persistence (e.g., global-banner)',
        fieldset: 'sectionIdentifier',
        validation: (Rule: any) =>
            conditionalRequirement ? Rule.custom(conditionalRequirement) : Rule.required(),
    }),
    ...internalName(),
    ...baseTheme('Select the color scheme for this banner'),
    defineField({
        title: 'Variant',
        name: 'variant',
        type: 'string',
        description: 'Choose how the banner is displayed',
        options: {
            list: [
                {title: 'Stack', value: 'stack'},
                {title: 'Fixed', value: 'fixed'},
            ],
        },
        initialValue: 'stack',
    }),
    defineField({
        title: 'Text',
        name: 'text',
        type: 'text',
        rows: 3,
    }),
    ctaFields,
]
