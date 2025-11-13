import { z } from 'astro:content';
import { assetZ, slugZ, portableTextZ, imageAssetZ } from './page';

// Helper to convert Sanity's null to TypeScript's undefined
const nullToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().nullable().transform(v => v ?? undefined);

// People/Author schema
export const peopleZ = z.object({
  _id: z.string(),
  _type: z.literal('people'),
  name: z.string(),
  slug: slugZ,
  position: nullToUndefined(z.string()),
  company: nullToUndefined(z.string()),
  photo: nullToUndefined(imageAssetZ),
  bio: nullToUndefined(portableTextZ),
});

// Topic reference schema
export const topicZ = z.object({
  _id: z.string(),
  _type: z.literal('topic'),
  title: z.string(),
  slug: slugZ,
});

// Format reference schema
export const formatZ = z.object({
  _id: z.string(),
  _type: z.literal('format'),
  title: z.string(),
  slug: slugZ,
});

// Basic post reference (for relatedPosts)
const postRefZ = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string(),
  slug: z.string(),
  publishedOn: z.string(),
  thumbnailText: nullToUndefined(z.string()),
  heroImage: nullToUndefined(imageAssetZ),
});

// Full post schema
export const postZ = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string(),
  slug: z.string(),
  publishedOn: z.string(),
  thumbnailText: nullToUndefined(z.string()),
  body: nullToUndefined(portableTextZ),
  heroImage: nullToUndefined(imageAssetZ),
  author: nullToUndefined(z.array(peopleZ)),
  format: nullToUndefined(formatZ),
  topics: nullToUndefined(z.array(topicZ)),
  relatedPosts: nullToUndefined(z.array(postRefZ)),
  showRelatedPosts: nullToUndefined(z.boolean()),
  showTOC: nullToUndefined(z.boolean()),
  showReadingTime: nullToUndefined(z.boolean()),
  // SEO fields
  metaTitle: nullToUndefined(z.string()),
  metaDescription: nullToUndefined(z.string()),
  noIndex: nullToUndefined(z.boolean()),
  ogTitle: nullToUndefined(z.string()),
  ogDescription: nullToUndefined(z.string()),
  ogImage: nullToUndefined(imageAssetZ),
  twitterCard: nullToUndefined(z.string()),
  twitterTitle: nullToUndefined(z.string()),
  twitterDescription: nullToUndefined(z.string()),
  twitterImage: nullToUndefined(imageAssetZ),
});

// Export TypeScript types inferred from schemas
export type Post = z.infer<typeof postZ>;
export type PostRef = z.infer<typeof postRefZ>;
export type People = z.infer<typeof peopleZ>;
export type Topic = z.infer<typeof topicZ>;
export type Format = z.infer<typeof formatZ>;

