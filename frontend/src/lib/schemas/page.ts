import { z } from 'astro:content';

// Base schemas for common structures

// Asset reference from Sanity
export const assetZ = z.object({
  _id: z.string(),
  url: z.string(),
  metadata: z.object({
    dimensions: z.object({
      width: z.number(),
      height: z.number(),
    }).optional().nullable(),
  }).optional().nullable(),
});

// Slug object
export const slugZ = z.object({
  current: z.string(),
});

// Internal link reference (used in CTAs and multicard links)
export const internalLinkZ = z.object({
  _type: z.string(),
  slug: slugZ.optional().nullable(),
});

// Portable Text - flexible array with passthrough for block content
export const portableTextZ = z.array(
  z.object({
    _type: z.string(),
    _key: z.string(),
  }).passthrough()
);

// Media schemas

export const imageAssetZ = z.object({
  asset: assetZ,
  altText: z.string().optional().nullable(),
});

export const videoAssetZ = z.object({
  asset: assetZ,
});

export const mediaZ = z.object({
  type: z.string().optional().nullable(),
  image: imageAssetZ.optional().nullable(),
  video: videoAssetZ.optional().nullable(),
}).optional().nullable();

// CTA schema (used across multiple section types)
export const ctaZ = z.object({
  variant: z.enum(['primary', 'secondary', 'tertiary']).optional().nullable(),
  size: z.enum(['small', 'regular', 'large']).optional().nullable(),
  label: z.string(),
  linkType: z.enum(['href', 'page', 'simplePage', 'post', 'file', 'hash']).optional().nullable(),
  href: z.string().optional().nullable(),
  hash: z.string().optional().nullable(),
  page: internalLinkZ.optional().nullable(),
  simplePage: internalLinkZ.optional().nullable(),
  post: internalLinkZ.optional().nullable(),
  file: z.object({
    asset: assetZ,
  }).optional().nullable(),
  openInNewTab: z.boolean().optional().nullable(),
});

// Section schemas - one for each section type matching GROQ queries

// CtaBanner section
const ctaBannerZ = z.object({
  _type: z.literal('ctaBanner'),
  eyebrow: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  body: portableTextZ,
  alignment: z.string().optional().nullable(),
  theme: z.string().optional().nullable(),
  media: mediaZ,
  cta: z.array(ctaZ).optional().nullable(),
});

// Feature section
const featureZ = z.object({
  _type: z.literal('feature'),
  title: z.string().optional().nullable(),
  body: portableTextZ,
  theme: z.string().optional().nullable(),
  mediaSide: z.string().optional().nullable(),
  media: mediaZ,
  cta: z.array(ctaZ).optional().nullable(),
});

// Headline section
const headlineZ = z.object({
  _type: z.literal('headline'),
  theme: z.string().optional().nullable(),
  eyebrow: z.string().optional().nullable(),
  title: portableTextZ,
  subhead: portableTextZ,
  body: portableTextZ,
  alignment: z.string().optional().nullable(),
  cta: z.array(ctaZ).optional().nullable(),
});

// Hero section
const heroZ = z.object({
  _type: z.literal('hero'),
  theme: z.string().optional().nullable(),
  eyebrow: z.string().optional().nullable(),
  title: portableTextZ,
  subhead: portableTextZ,
  body: portableTextZ,
  media: mediaZ,
  cta: z.array(ctaZ).optional().nullable(),
});

// Multicard link schema (more complex than regular CTA)
const multicardLinkZ = z.object({
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
}).optional().nullable();

// Multicard item
const multicardItemZ = z.object({
  media: mediaZ,
  eyebrow: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  subhead: portableTextZ,
  body: portableTextZ,
  makeClickable: z.boolean().optional().nullable(),
  link: multicardLinkZ,
});

// Multicard section
const multicardZ = z.object({
  _type: z.literal('multicard'),
  theme: z.string().optional().nullable(),
  eyebrow: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  subhead: portableTextZ,
  body: portableTextZ,
  layout: z.string().optional().nullable(),
  columns: z.string().optional().nullable(), // Note: columns is a string in the data, not a number
  cta: z.array(ctaZ).optional().nullable(),
  multicardItems: z.array(multicardItemZ).optional().nullable(),
});

// Stats item
const statsItemZ = z.object({
  value: z.string(),
  label: z.string(),
});

// Stats section
const statsZ = z.object({
  _type: z.literal('stats'),
  eyebrow: z.string().optional().nullable(),
  title: portableTextZ,
  subhead: portableTextZ,
  body: portableTextZ,
  cta: z.array(ctaZ).optional().nullable(),
  statsItems: z.array(statsItemZ).optional().nullable(),
});

// Feature Stack item (feature within a stack)
const featureStackItemZ = z.object({
  title: z.string().optional().nullable(),
  body: portableTextZ,
  mediaSide: z.string().optional().nullable(),
  media: mediaZ,
  cta: z.array(ctaZ).optional().nullable(),
});

// Feature Stack section
const featureStackZ = z.object({
  _type: z.literal('featureStack'),
  theme: z.string().optional().nullable(),
  eyebrow: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  subhead: portableTextZ,
  body: portableTextZ,
  textAlignment: z.string().optional().nullable(),
  cta: z.array(ctaZ).optional().nullable(),
  features: z.array(featureStackItemZ).optional().nullable(),
});

// Accordion item
const accordionItemZ = z.object({
  title: z.string().optional().nullable(),
  body: portableTextZ,
  media: mediaZ,
});

// Accordion section
const accordionZ = z.object({
  _type: z.literal('accordion'),
  theme: z.string().optional().nullable(),
  layout: z.string().optional().nullable(),
  openItems: z.string().optional().nullable(),
  eyebrow: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  subhead: portableTextZ,
  body: portableTextZ,
  media: mediaZ,
  items: z.array(accordionItemZ).optional().nullable(),
});

// List item
const listItemZ = z.object({
  eyebrow: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  subhead: portableTextZ,
  body: portableTextZ,
  cta: z.array(ctaZ).optional().nullable(),
  wrapInLink: z.boolean().optional().nullable(),
});

// List section
const listZ = z.object({
  _type: z.literal('list'),
  theme: z.string().optional().nullable(),
  variant: z.string().optional().nullable(),
  showIndex: z.boolean().optional().nullable(),
  eyebrow: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  subhead: portableTextZ,
  body: portableTextZ,
  cta: z.array(ctaZ).optional().nullable(),
  items: z.array(listItemZ).optional().nullable(),
});

// Union schema for all section types using discriminated union on _type
const sectionZ = z.discriminatedUnion('_type', [
  accordionZ,
  ctaBannerZ,
  featureZ,
  featureStackZ,
  headlineZ,
  heroZ,
  listZ,
  multicardZ,
  statsZ,
]);

// Page schema - top-level page object matching GROQ query structure
export const pageZ = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string().optional().nullable(),
  slug: z.string(),
  sections: z.array(sectionZ).optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: z.array(z.string()).optional().nullable(),
  noIndex: z.boolean().optional().nullable(),
  socialTitle: z.string().optional().nullable(),
  socialDescription: z.string().optional().nullable(),
  socialImage: imageAssetZ.optional().nullable(),
  socialImageAlt: z.string().optional().nullable(),
});

// Export TypeScript types inferred from schemas
export type Page = z.infer<typeof pageZ>;
export type Section = z.infer<typeof sectionZ>;
export type Accordion = z.infer<typeof accordionZ>;
export type AccordionItem = z.infer<typeof accordionItemZ>;
export type CtaBanner = z.infer<typeof ctaBannerZ>;
export type Feature = z.infer<typeof featureZ>;
export type FeatureStack = z.infer<typeof featureStackZ>;
export type FeatureStackItem = z.infer<typeof featureStackItemZ>;
export type Headline = z.infer<typeof headlineZ>;
export type Hero = z.infer<typeof heroZ>;
export type List = z.infer<typeof listZ>;
export type ListItem = z.infer<typeof listItemZ>;
export type Multicard = z.infer<typeof multicardZ>;
export type MulticardItem = z.infer<typeof multicardItemZ>;
export type MulticardLink = z.infer<typeof multicardLinkZ>;
export type Stats = z.infer<typeof statsZ>;
export type StatsItem = z.infer<typeof statsItemZ>;
export type Media = z.infer<typeof mediaZ>;
export type Cta = z.infer<typeof ctaZ>;
export type PortableText = z.infer<typeof portableTextZ>;

export {
  accordionZ,
  accordionItemZ,
  ctaBannerZ,
  featureZ,
  featureStackZ,
  featureStackItemZ,
  headlineZ,
  heroZ,
  listZ,
  listItemZ,
  multicardZ,
  multicardItemZ,
  multicardLinkZ,
  statsZ,
  statsItemZ,
  sectionZ,
};

