import {defineField} from 'sanity'

export const ctaFields = getCtaFields()

/**
 * Generate a new field to prevent cross-contaminating across schema
 */
function getCtaFields() {
  return defineField({
    name: 'cta',
    title: 'CTA',
    type: 'array',
    of: [
      defineField({
        name: 'cta',
        title: 'CTA',
        type: 'cta',
      }),
    ],
  })
}

/**
 * Optionally add field to a fieldset (ex., 'headline')
 * https://www.sanity.io/docs/object-type#AbjN0ykp
 */
export const ctaFieldsWithFieldset = (fieldset: string) => {
  const field = getCtaFields()
  field.fieldset = fieldset
  return field
}
