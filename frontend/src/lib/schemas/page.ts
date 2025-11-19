import { z } from 'astro:content';

// Helper to convert Sanity's null to TypeScript's undefined
const nullToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().nullable().transform(v => v ?? undefined);

// Base schemas for common structures

// Asset reference from Sanity
export const assetZ = z.object({
  _id: z.string(),
  url: z.string(),
  metadata: nullToUndefined(z.object({
    dimensions: nullToUndefined(z.object({
      width: z.number(),
      height: z.number(),
    })),
  })),
});

// Slug object
export const slugZ = z.object({
  current: z.string(),
});

// Internal link reference (used in CTAs and multicard links)
export const internalLinkZ = z.object({
  _type: z.string(),
  slug: nullToUndefined(slugZ),
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
  altText: nullToUndefined(z.string()),
});

export const videoAssetZ = z.object({
  asset: assetZ,
});

export const mediaZ = nullToUndefined(z.object({
  type: nullToUndefined(z.string()),
  image: nullToUndefined(imageAssetZ),
  video: nullToUndefined(videoAssetZ),
}));

// CTA schema (used across multiple section types)
export const ctaZ = z.object({
  variant: nullToUndefined(z.enum(['primary', 'secondary', 'tertiary'])),
  size: nullToUndefined(z.enum(['small', 'regular', 'large'])),
  label: z.string(),
  linkType: nullToUndefined(z.enum(['href', 'page', 'simplePage', 'post', 'file', 'hash'])),
  href: nullToUndefined(z.string()),
  hash: nullToUndefined(z.string()),
  page: nullToUndefined(internalLinkZ),
  simplePage: nullToUndefined(internalLinkZ),
  post: nullToUndefined(internalLinkZ),
  file: nullToUndefined(z.object({
    asset: assetZ,
  })),
  openInNewTab: nullToUndefined(z.boolean()),
});

// Section schemas - one for each section type matching GROQ queries

// CtaBanner section
const ctaBannerZ = z.object({
  _type: z.literal('ctaBanner'),
  eyebrow: nullToUndefined(z.string()),
  title: nullToUndefined(z.string()),
  body: portableTextZ,
  alignment: nullToUndefined(z.string()),
  theme: nullToUndefined(z.string()),
  media: mediaZ,
  cta: nullToUndefined(z.array(ctaZ)),
});

// Feature section
const featureZ = z.object({
  _type: z.literal('feature'),
  title: nullToUndefined(z.string()),
  body: portableTextZ,
  theme: nullToUndefined(z.string()),
  mediaSide: nullToUndefined(z.string()),
  media: mediaZ,
  cta: nullToUndefined(z.array(ctaZ)),
});

// Headline section
const headlineZ = z.object({
  _type: z.literal('headline'),
  theme: nullToUndefined(z.string()),
  eyebrow: nullToUndefined(z.string()),
  title: portableTextZ,
  subhead: portableTextZ,
  body: portableTextZ,
  alignment: nullToUndefined(z.string()),
  cta: nullToUndefined(z.array(ctaZ)),
});

// Hero section
const heroZ = z.object({
  _type: z.literal('hero'),
  theme: nullToUndefined(z.string()),
  eyebrow: nullToUndefined(z.string()),
  title: portableTextZ,
  subhead: portableTextZ,
  body: portableTextZ,
  media: mediaZ,
  cta: nullToUndefined(z.array(ctaZ)),
});

// Multicard link schema (more complex than regular CTA)
const multicardLinkZ = nullToUndefined(z.object({
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
}));

// Multicard item
const multicardItemZ = z.object({
  media: mediaZ,
  eyebrow: nullToUndefined(z.string()),
  title: nullToUndefined(z.string()),
  subhead: portableTextZ,
  body: portableTextZ,
  makeClickable: nullToUndefined(z.boolean()),
  link: multicardLinkZ,
});

// Multicard section
const multicardZ = z.object({
  _type: z.literal('multicard'),
  theme: nullToUndefined(z.string()),
  eyebrow: nullToUndefined(z.string()),
  title: nullToUndefined(z.string()),
  subhead: portableTextZ,
  body: portableTextZ,
  layout: nullToUndefined(z.string()),
  columns: nullToUndefined(z.string()), // Note: columns is a string in the data, not a number
  cta: nullToUndefined(z.array(ctaZ)),
  multicardItems: nullToUndefined(z.array(multicardItemZ)),
});

// Union schema for all section types using discriminated union on _type
const sectionZ = z.discriminatedUnion('_type', [
  ctaBannerZ,
  featureZ,
  headlineZ,
  heroZ,
  multicardZ,
]);

// Page schema - top-level page object matching GROQ query structure
export const pageZ = z.object({
  _id: z.string(),
  _type: z.string(),
  title: nullToUndefined(z.string()),
  slug: z.string(),
  sections: nullToUndefined(z.array(sectionZ)),
  noIndex: nullToUndefined(z.boolean()),
});

// Export TypeScript types inferred from schemas
export type Page = z.infer<typeof pageZ>;
export type Section = z.infer<typeof sectionZ>;
export type CtaBanner = z.infer<typeof ctaBannerZ>;
export type Feature = z.infer<typeof featureZ>;
export type Headline = z.infer<typeof headlineZ>;
export type Hero = z.infer<typeof heroZ>;
export type Multicard = z.infer<typeof multicardZ>;
export type MulticardItem = z.infer<typeof multicardItemZ>;
export type MulticardLink = z.infer<typeof multicardLinkZ>;
export type Media = z.infer<typeof mediaZ>;
export type Cta = z.infer<typeof ctaZ>;
export type PortableText = z.infer<typeof portableTextZ>;

export {
  ctaBannerZ,
  featureZ,
  headlineZ,
  heroZ,
  multicardZ,
  multicardItemZ,
  multicardLinkZ,
  sectionZ,
};

