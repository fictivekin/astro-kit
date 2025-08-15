import {defineField} from 'sanity'

/**
 * Section ID field
 * @param description - Optional custom description
 * @param required - Whether the field is required (default: false)
 * @examples
 * // Basic usage
 * fields: [...sectionId()]
 *
 * // With custom description (still uses sectionIdentifierFieldset if included)
 * fields: [...sectionId('Add a unique anchor ID for this section'), ...internalName()]
 * fieldsets: [...sectionIdentifierFieldset]
 *
 * // Required field
 * fields: [...sectionId('Unique identifier', true)]
 */
export const sectionId = (description?: string, required = false) => [
  defineField({
    name: 'sectionId',
    title: 'Section ID',
    type: 'string',
    description: description || '(lowercase letters and hyphens)',
    fieldset: 'sectionIdentifier',
    ...(required && {
      validation: (Rule: any) => Rule.required(),
    }),
  }),
]

/**
 * Required Section ID field - convenience wrapper
 * @param description - Optional custom description
 * @example
 * fields: [...requiredSectionId('Stable id for dismissal persistence')]
 */
export const requiredSectionId = (description?: string) => sectionId(description, true)

/**
 * Internal Name field - used in CMS overview
 * @param description - Optional custom description
 * @examples
 * // Basic usage
 * fields: [...internalName()]
 *
 * // With custom description (still uses sectionIdentifierFieldset if included)
 * fields: [...sectionId(), ...internalName('Name displayed in content lists')]
 * fieldsets: [...sectionIdentifierFieldset]
 */
export const internalName = (description?: string) => [
  defineField({
    name: 'internalName',
    title: 'Internal Name',
    type: 'string',
    description: description || 'used in the CMS overview',
    fieldset: 'sectionIdentifier',
  }),
]

/**
 * Combined section identifier fields
 * @param idDescription - Optional custom description for Section ID field
 * @param nameDescription - Optional custom description for Internal Name field
 * @examples
 * // Basic usage with defaults:
 * fields: [...sectionIdentifier()],
 * fieldsets: [...sectionIdentifierFieldset],
 *
 * // With custom descriptions:
 * fields: [...sectionIdentifier('Custom ID hint', 'Custom name hint')]
 *
 * // For required ID, use individual fields:
 * fields: [...requiredSectionId('Custom hint'), ...internalName()]
 * fieldsets: [...sectionIdentifierFieldset]
 */
export const sectionIdentifier = (idDescription?: string, nameDescription?: string) => [
  ...sectionId(idDescription),
  ...internalName(nameDescription)
]

export const sectionIdentifierFieldset = [
  {
    name: 'sectionIdentifier',
    title: 'Section Identifiers',
    options: {
      columns: 2,
      collapsible: true,
      collapsed: false,
    },
  },
]

