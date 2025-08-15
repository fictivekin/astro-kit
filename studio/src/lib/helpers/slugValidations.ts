import {Slug, SlugValidationContext} from 'sanity'

/**
 * Validates that a slug doesn't start or end with a slash
 * @param slugString - The slug object from Sanity
 * @returns true if valid, error message if invalid
 */
export const validateSlugFormat = (slugString: Slug | undefined) => {
    if (slugString?.current?.startsWith('/') || slugString?.current?.endsWith('/')) {
        return 'Slug cannot start or end with a slash'
    }
    return true
}

/**
 * Checks if a slug is unique for the given document type
 * This validator ensures slug uniqueness across both draft and published versions
 *
 * @param slug - The slug string to validate
 * @param context - Sanity validation context
 * @returns true if unique, false if duplicate exists
 *
 * @example
 * ```ts
 * defineField({
 *   name: 'slug',
 *   type: 'slug',
 *   validation: (Rule) => [
 *     Rule.required(),
 *     Rule.custom(validateSlugFormat),
 *   ],
 *   options: {
 *     source: 'title',
 *     isUnique: isUniqueSlug,
 *   },
 * })
 * ```
 */
export async function isUniqueSlug(slug: string, context: SlugValidationContext): Promise<boolean> {
    const {document, getClient} = context

    if (!document) return true

    const client = getClient({apiVersion: '2023-01-01'})
    const id = document._id.replace(/^drafts\./, '')
    const docType = document._type

    const params = {
        type: docType,
        draft: `drafts.${id}`,
        published: id,
        slug,
    }

    // Query to find documents with matching slug
    // Excludes both draft and published versions of current document
    const query = `*[
    _type == $type &&
    slug.current == $slug &&
    _id != $draft &&
    _id != $published
  ] {
    _id
  }`

    const result = await client.fetch(query, params)

    // Return true if no conflicting documents found
    return result.length === 0
}

/**
 * Checks if a slug is unique within the same language/locale
 * Useful for multilingual sites where the same slug can exist in different languages
 *
 * Note: Requires documents to have a 'language' field
 *
 * @param slug - The slug string to validate
 * @param context - Sanity validation context
 * @param defaultLanguage - The default language code (e.g., 'en')
 * @returns true if unique within language, false if duplicate exists
 *
 * @example
 * ```ts
 * import {defaultLanguage} from '../config'
 *
 * defineField({
 *   name: 'slug',
 *   type: 'slug',
 *   options: {
 *     source: 'title',
 *     isUnique: (slug, context) => isUniqueSlugForLanguage(slug, context, defaultLanguage),
 *   },
 * })
 * ```
 */
export async function isUniqueSlugForLanguage(
    slug: string,
    context: SlugValidationContext,
    defaultLanguage: string = 'en',
): Promise<boolean> {
    const {document, getClient} = context

    if (!document) return true

    const client = getClient({apiVersion: '2023-01-01'})
    const id = document._id.replace(/^drafts\./, '')
    const currentLanguage = (document as any).language || defaultLanguage
    const docType = document._type

    const params = {
        type: docType,
        draft: `drafts.${id}`,
        published: id,
        slug,
        currentLanguage,
        defaultLanguage,
    }

    // Language matching logic:
    // - If in default language, also match docs without language field (for backwards compatibility)
    // - If in other language, only match docs with same language
    let langCondition = 'language == $currentLanguage'
    if (currentLanguage === defaultLanguage) {
        langCondition = '(language == $currentLanguage || defined(language) == false)'
    }

    // Query to find documents with matching slug and same language
    const query = `*[
    _type == $type &&
    slug.current == $slug &&
    _id != $draft &&
    _id != $published &&
    ${langCondition}
  ] {
    _id,
    language
  }`

    const result = await client.fetch(query, params)

    // Return true if no conflicting documents found
    return result.length === 0
}

/**
 * Validation rule for slug uniqueness across page types
 * Checks if a slug is unique across both 'page' and 'simplePage' document types
 *
 * @example
 * ```ts
 * defineField({
 *   name: 'slug',
 *   type: 'slug',
 *   validation: (Rule) => [
 *     Rule.required(),
 *     Rule.custom(validateSlugFormat),
 *     Rule.custom(validateUniqueAcrossPageTypes),
 *   ],
 *   options: {
 *     source: 'title',
 *     isUnique: () => true, // Disable default check
 *   },
 * })
 * ```
 */
export async function validateUniqueAcrossPageTypes(value: Slug | undefined, context: any) {
    if (!value?.current) return true

    const {document, getClient} = context
    if (!document) return true

    const client = getClient({apiVersion: '2023-01-01'})
    const id = document._id.replace(/^drafts\./, '')

    const params = {
        draft: `drafts.${id}`,
        published: id,
        slug: value.current,
    }

    // Query to find documents with matching slug in both page and simplePage types
    const query = `*[
    (_type == "page" || _type == "simplePage") &&
    slug.current == $slug &&
    _id != $draft &&
    _id != $published
  ] {
    _id,
    _type
  }`

    const result = await client.fetch(query, params)

    if (result.length > 0) {
        return 'Slug is already in use'
    }

    return true
}
