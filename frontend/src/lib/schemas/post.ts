import { z } from 'astro:content';
import { slugZ, portableTextZ, imageAssetZ } from './page';

// People/Author schema
export const peopleZ = z.object({
  _id: z.string(),
  _type: z.literal('people'),
  name: z.string(),
  slug: slugZ,
  position: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  photo: imageAssetZ.optional().nullable(),
  bio: portableTextZ.optional().nullable(),
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
  thumbnailText: z.string().optional().nullable(),
  heroImage: imageAssetZ.optional().nullable(),
});

// Full post schema
export const postZ = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string(),
  slug: z.string(),
  publishedOn: z.string(),
  thumbnailText: z.string().optional().nullable(),
  body: portableTextZ.optional().nullable(),
  heroImage: imageAssetZ.optional().nullable(),
  author: z.array(peopleZ).optional().nullable(),
  format: formatZ.optional().nullable(),
  topics: z.array(topicZ).optional().nullable(),
  relatedPosts: z.array(postRefZ).optional().nullable(),
  showRelatedPosts: z.boolean().optional().nullable(),
  showTOC: z.boolean().optional().nullable(),
  showReadingTime: z.boolean().optional().nullable(),
  // SEO fields
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  noIndex: z.boolean().optional().nullable(),
  socialTitle: z.string().optional().nullable(),
  socialDescription: z.string().optional().nullable(),
  socialImage: imageAssetZ.optional().nullable(),
  socialImageAlt: z.string().optional().nullable(),
});

// Export TypeScript types inferred from schemas
export type Post = z.infer<typeof postZ>;
export type PostRef = z.infer<typeof postRefZ>;
export type People = z.infer<typeof peopleZ>;
export type Topic = z.infer<typeof topicZ>;
export type Format = z.infer<typeof formatZ>;

