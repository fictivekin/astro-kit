# Content Collections Architecture

## Overview

This project uses Astro Content Collections with custom loaders to fetch data from Sanity CMS at build time. The architecture provides type-safe access to CMS data using Zod schemas that match the exact structure of GROQ queries, following patterns from [Simeon Griggs' article on type-safe GROQ queries](https://www.simeongriggs.dev/type-safe-groq-queries-for-sanity-data-with-zod).

## Key Files

### Configuration
- `frontend/src/content/config.ts` - Defines collections and custom loaders
- `frontend/astro.config.mjs` - Astro configuration

### Data Layer
- `frontend/src/lib/schemas.ts` - **Zod schemas** matching GROQ query structure
- `frontend/src/lib/queries.ts` - Sanity GROQ queries with runtime validation
- `frontend/src/lib/sanity.ts` - Sanity client configuration
- `frontend/src/lib/componentMap.ts` - Maps section types to Astro components

### Pages
- `frontend/src/pages/index.astro` - Homepage using `home` collection
- `frontend/src/pages/[slug].astro` - Dynamic pages using `pages` collection

## Collections

### Home Collection
- **Purpose**: Single entry for the homepage
- **Loader**: Calls `fetchHomepage()` to retrieve homepage data from Sanity
- **ID**: Uses the `slug` field from the data (which is "homepage")
- **Access**: `getEntry('home', 'homepage')`
- **Data**: Homepage with sections array

### Pages Collection
- **Purpose**: All site pages with slugs
- **Loader**:
  1. Queries Sanity for all page slugs
  2. Calls `fetchPageBySlug()` for each slug
  3. Uses the existing `slug` field as the collection entry ID
- **ID**: The page's slug (e.g., "about", "contact")
- **Access**: `getEntry('pages', slug)` or `getCollection('pages')`
- **Data**: Pages with sections array

## Data Access Pattern

```typescript
// In .astro files
import { getEntry, getCollection } from 'astro:content';

// Get homepage (id is the slug "homepage")
const homepage = await getEntry('home', 'homepage');
const sections = homepage?.data?.sections;

// Get specific page (id is the page's slug)
const page = await getEntry('pages', 'about');
const sections = page?.data?.sections;

// Get all pages - page.id is the slug
const allPages = await getCollection('pages');
allPages.map(page => {
  console.log(page.id); // "about", "contact", etc.
  console.log(page.data.slug); // same as page.id
});
```

## Section Types and Components

Sections are rendered using the component map pattern:

**Available Section Types:**
- `ctaBanner` → `CtaBanner.astro`
- `feature` → `Feature.astro`
- `headline` → `Headline.astro`
- `hero` → `Hero.astro`
- `multicard` → `Multicard.astro`

**Rendering Pattern:**
```typescript
sections?.map((section) => {
  const Component = componentMap[section._type];
  return Component ? <Component {...{ [section._type]: section }} /> : null;
})
```

## Schema Design

The content schemas are defined in `frontend/src/lib/schemas.ts` using Zod with strict type checking that matches the exact GROQ query structure:

### Key Principles

1. **Explicit Fields**: No `.passthrough()` except for Portable Text blocks
2. **Discriminated Unions**: Section types use `z.discriminatedUnion('_type', [...])` for type safety
3. **Nullable to Undefined**: Transform `null` to `undefined` using `.optional().nullable().transform(v => v ?? undefined)`
4. **Match GROQ**: Schemas exactly match what GROQ queries return

### Schema Structure

**Base Schemas:**
- `assetZ` - Asset references (`_id`, `url`)
- `portableTextZ` - Portable Text with `.passthrough()` for flexible blocks
- `mediaZ` - Media objects (type, image, video)
- `ctaZ` - Call-to-action objects

**Section Schemas:**
- `ctaBannerZ`, `featureZ`, `headlineZ`, `heroZ`, `multicardZ`
- Each uses `z.literal('typeName')` for `_type` field
- Combined in `sectionZ` discriminated union

**Page Schema:**
- `pageZ` - Top-level with `_id`, `_type`, `title`, `slug`, `sections`, `noIndex`

### Runtime Validation

GROQ queries parse results through Zod schemas:

```typescript
export async function fetchHomepage() {
  const result = await sanityClient.fetch(query);
  return pageZ.parse(result); // Runtime validation
}
```

### TypeScript Types

All types are inferred from Zod schemas:

```typescript
export type Page = z.infer<typeof pageZ>;
export type Section = z.infer<typeof sectionZ>;
export type CtaBanner = z.infer<typeof ctaBannerZ>;
// ... etc
```

This approach:
- Validates exact fields returned by GROQ
- Catches schema/query mismatches at build time
- Provides accurate TypeScript types
- Transforms Sanity's `null` to TypeScript's `undefined`

## Build Process

1. **Content Sync**: Custom loaders fetch data from Sanity
2. **Type Generation**: Astro generates TypeScript types from schemas
3. **Static Generation**: Pages are built using collection data
4. **Output**: Static HTML files with no runtime CMS calls

## Adding New Section Types

1. Create component in `frontend/src/components/[SectionName]/`
2. Add to Sanity schema in `studio/src/schemaTypes/objects/`
3. Add section fields to `sectionFields` in `queries.ts`
4. Map component in `componentMap.ts`
5. Schema automatically handles new types via `passthrough()`

