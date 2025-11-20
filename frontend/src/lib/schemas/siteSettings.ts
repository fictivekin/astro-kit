import { z } from 'astro:content';
import { imageAssetZ } from './page';

// Helper to convert Sanity's null to TypeScript's undefined
const nullToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().nullable().transform(v => v ?? undefined);

// Site settings schema
export const siteSettingsZ = z.object({
  _id: z.string(),
  _type: z.literal('siteSettings'),
  title: nullToUndefined(z.string()),
  legalName: nullToUndefined(z.string()),
  seoTitle: nullToUndefined(z.string()),
  seoDescription: nullToUndefined(z.string()),
  seoKeywords: nullToUndefined(z.array(z.string())),
  noIndex: nullToUndefined(z.boolean()),
  socialTitle: nullToUndefined(z.string()),
  socialDescription: nullToUndefined(z.string()),
  socialImage: nullToUndefined(imageAssetZ),
  socialImageAlt: nullToUndefined(z.string()),
  twitter: nullToUndefined(z.string()),
  googleTagManagerId: nullToUndefined(z.string()),
  googleAnalyticsId: nullToUndefined(z.string()),
  facebookAppId: nullToUndefined(z.string()),
});

// Export TypeScript type
export type SiteSettings = z.infer<typeof siteSettingsZ>;

