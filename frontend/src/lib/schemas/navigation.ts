import { z } from 'astro:content';
import { slugZ, assetZ } from './page';

// Helper to convert Sanity's null to TypeScript's undefined
const nullToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().nullable().transform(v => v ?? undefined);

// Internal link reference (for navigation links)
export const internalLinkZ = z.object({
  _type: z.string(),
  slug: nullToUndefined(slugZ),
});

// Link schema matching Sanity's link structure
export const linkZ = z.object({
  label: nullToUndefined(z.string()),
  linkType: nullToUndefined(z.string()),
  href: nullToUndefined(z.string()),
  hash: nullToUndefined(z.string()),
  page: nullToUndefined(internalLinkZ),
  simplePage: nullToUndefined(internalLinkZ),
  post: nullToUndefined(internalLinkZ),
  file: nullToUndefined(z.object({
    asset: assetZ,
  })),
  openInNewTab: nullToUndefined(z.boolean()),
  onClick: nullToUndefined(z.string()),
});

// Navigation item schema with recursive children
export const navigationItemZ: z.ZodType<{
  link?: {
    label?: string | undefined;
    linkType?: string | undefined;
    href?: string | undefined;
    hash?: string | undefined;
    page?: { _type: string; slug?: { current: string } | undefined } | undefined;
    simplePage?: { _type: string; slug?: { current: string } | undefined } | undefined;
    post?: { _type: string; slug?: { current: string } | undefined } | undefined;
    file?: { asset: { _id: string; url: string; metadata?: { dimensions?: { width: number; height: number } | undefined } | undefined } } | undefined;
    openInNewTab?: boolean | undefined;
    onClick?: string | undefined;
  } | undefined;
  linkText?: string | undefined;
  children?: Array<any> | undefined;
}> = z.lazy(() =>
  z.object({
    link: nullToUndefined(linkZ),
    linkText: nullToUndefined(z.string()),
    children: nullToUndefined(z.array(navigationItemZ)),
  })
);

// Main navigation schema
export const mainNavigationZ = z.object({
  _id: z.string(),
  _type: z.literal('mainNavigation'),
  items: nullToUndefined(z.array(navigationItemZ)),
});

// Footer navigation column schema
export const navigationColumnZ = z.object({
  title: nullToUndefined(z.string()),
  items: nullToUndefined(z.array(navigationItemZ)),
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
  brandingText: nullToUndefined(z.string()),
  navigationColumns: nullToUndefined(z.array(navigationColumnZ)),
  platforms: nullToUndefined(z.array(socialPlatformZ)),
  legalNavigation: nullToUndefined(z.array(navigationItemZ)),
  copyrightText: nullToUndefined(z.string()),
});

// Export TypeScript types
export type Link = z.infer<typeof linkZ>;
export type NavigationItem = z.infer<typeof navigationItemZ>;
export type MainNavigation = z.infer<typeof mainNavigationZ>;
export type NavigationColumn = z.infer<typeof navigationColumnZ>;
export type SocialPlatform = z.infer<typeof socialPlatformZ>;
export type FooterNavigation = z.infer<typeof footerNavigationZ>;

