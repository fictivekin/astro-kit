import { z } from 'astro:content';
import { slugZ, assetZ } from './page';

// Internal link reference (for navigation links)
export const internalLinkZ = z.object({
  _type: z.string(),
  slug: slugZ.optional().nullable(),
});

// Link schema matching Sanity's link structure
export const linkZ = z.object({
  label: z.string().optional().nullable(),
  linkType: z.string().optional().nullable(),
  href: z.string().optional().nullable(),
  hash: z.string().optional().nullable(),
  page: internalLinkZ.optional().nullable(),
  simplePage: internalLinkZ.optional().nullable(),
  post: internalLinkZ.optional().nullable(),
  file: z.object({
    asset: assetZ,
  }).optional().nullable(),
  openInNewTab: z.boolean().optional().nullable(),
  onClick: z.string().optional().nullable(),
});

// Navigation item schema with recursive children
export const navigationItemZ: any = z.lazy(() =>
  z.object({
    link: linkZ.optional().nullable(),
    linkText: z.string().optional().nullable(),
    children: z.array(navigationItemZ).optional().nullable(),
  })
);

// Main navigation schema
export const mainNavigationZ = z.object({
  _id: z.string(),
  _type: z.literal('mainNavigation'),
  items: z.array(navigationItemZ).optional().nullable(),
});

// Footer navigation column schema
export const navigationColumnZ = z.object({
  title: z.string().optional().nullable(),
  items: z.array(navigationItemZ).optional().nullable(),
});

// Social platform schema
export const socialPlatformZ = z.object({
  platform: z.string(),
  url: z.string(),
});

// Footer navigation schema
export const footerNavigationZ = z.object({
  _id: z.string(),
  _type: z.literal('footerNavigation'),
  brandingText: z.string().optional().nullable(),
  navigationColumns: z.array(navigationColumnZ).optional().nullable(),
  platforms: z.array(socialPlatformZ).optional().nullable(),
  legalNavigation: z.array(navigationItemZ).optional().nullable(),
  copyrightText: z.string().optional().nullable(),
});

// Export TypeScript types
export type Link = z.infer<typeof linkZ>;
export type NavigationItem = z.infer<typeof navigationItemZ>;
export type MainNavigation = z.infer<typeof mainNavigationZ>;
export type NavigationColumn = z.infer<typeof navigationColumnZ>;
export type SocialPlatform = z.infer<typeof socialPlatformZ>;
export type FooterNavigation = z.infer<typeof footerNavigationZ>;

