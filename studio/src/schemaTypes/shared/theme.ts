import {defineField} from 'sanity'

export const defaultThemeOptions = [
    {title: 'Light', value: 'light'},
    {title: 'Dark', value: 'dark'},
]

export const extendedThemeOptions = [
    {title: 'Gray', value: 'gray'},
]

/**
 * Create a theme field with specific theme options
 * @param themeOptions - Array of theme options to use
 * @param description - Optional field description
 */
export function getThemeField(
    themeOptions: {title: string; value: string}[],
    description?: string,
    group?: string,
) {
  return defineField({
      name: 'theme',
      title: 'Theme',
      description,
      type: 'string',
      options: {
          list: themeOptions,
      },
      group,
  })
}

/**
 * Convenience functions for adding theme fields
 *
 * @examples
 * // Base theme (light/dark only)
 * fields: [...baseTheme()]
 *
 * // Extended theme (light/dark/gray)
 * fields: [...extendedTheme('Select color scheme')]
 *
 * // Custom theme options
 * fields: [...customTheme([
 *   {title: 'Primary', value: 'primary'},
 *   {title: 'Secondary', value: 'secondary'}
 * ], 'Select theme variant')]
 */

export const baseTheme = (
    description?: string
) => [getThemeField(defaultThemeOptions, description)]

export const extendedTheme = (
    description?: string
) => [getThemeField([...defaultThemeOptions, ...extendedThemeOptions], description)]

export const pageTheme = (
    description?: string
) => [getThemeField(defaultThemeOptions, description, 'appearance')]

export const customTheme = (
    themeOptions: {title: string; value: string}[],
    description?: string
) => [getThemeField(themeOptions, description)]
