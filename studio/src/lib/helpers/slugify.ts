import {SlugifierFn} from 'sanity'

/**
 * Slugify function that creates URL-safe slugs
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters (keeps only a-z, 0-9, and hyphens)
 * - Limits to 200 characters
 *
 * @example
 * ```ts
 * defineField({
 *   name: 'slug',
 *   type: 'slug',
 *   options: {
 *     source: 'name',
 *     slugify: slugify,
 *   },
 * })
 * ```
 */
export const slugify: SlugifierFn = (input) =>
  input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '') // Remove special characters
    .slice(0, 200)

