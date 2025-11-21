# Sanity Preview Setup Guide

This project includes a complete preview system that allows content editors to see draft content from Sanity CMS rendered in real-time within the Sanity Studio interface.

## Architecture

The preview system consists of three main components:

1. **Preview Sanity Client** (`frontend/src/lib/sanityPreview.ts`) - A dedicated Sanity client configured to fetch draft content
2. **Preview Queries** (`frontend/src/lib/queries/preview.ts`) - Functions to fetch content by slug and type with draft support
3. **Preview Page** (`frontend/src/pages/preview/index.astro`) - An SSR endpoint that renders content on-demand
4. **Preview Pane Configuration** (`studio/src/structure/previewPane.ts`) - Configures the iframe in Sanity Studio

## How It Works

1. When a content editor opens a document in Sanity Studio, the preview pane loads an iframe
2. The iframe URL points to `/preview/?secret=xxx&slug=xxx&type=xxx`
3. The preview page validates the secret token for security
4. The preview page fetches the content using the preview client (which fetches drafts via `perspective: 'previewDrafts'`)
5. The content is rendered using the appropriate component (SectionRenderer for pages, post layout for posts)

## Setup Instructions

### 1. Get Sanity API Token

You need a **project-scoped** Sanity API token with read permissions to access draft content:

1. Go to https://sanity.io/manage/project/{your-project-id}/api/tokens
2. Click "Add API token" (in the project settings, NOT personal tokens)
3. Name it (e.g., "Preview Token")
4. Grant it **Viewer** permissions or a custom role with read access
5. Copy the token - you'll need it in the next step

**Important:** Use a project token, not a personal token. Personal tokens will cause "Unauthorized - Session not found" errors.

### 2. Generate Preview Secret

Generate a random string to use as the preview secret. This secures the preview endpoint:

```bash
# On macOS/Linux, you can use:
openssl rand -hex 32

# Or use any password generator to create a strong random string
```

### 3. Configure Frontend Environment

Create `frontend/.env` with the following variables:

```env
# Sanity API Token for reading draft content
# Must be a PROJECT token from https://sanity.io/manage/project/{projectId}/api/tokens
SANITY_API_READ_TOKEN=your_sanity_token_from_step_1

# Preview secret (must match studio configuration)
SANITY_PREVIEW_SECRET=your_random_secret_from_step_2
```

### 4. Configure Studio Environment

Create `studio/.env` with the following variables:

```env
# URL of your Astro frontend
SANITY_STUDIO_PREVIEW_URL=http://localhost:4321

# Preview secret (must match frontend configuration)
SANITY_STUDIO_PREVIEW_SECRET=your_random_secret_from_step_2
```

**Note**: For production, update `SANITY_STUDIO_PREVIEW_URL` to your production domain.

### 5. Start Both Servers

```bash
# Terminal 1 - Start Astro frontend
cd frontend
npm run dev

# Terminal 2 - Start Sanity Studio
cd studio
npm run dev
```

### 6. Test the Preview

1. Open Sanity Studio (usually http://localhost:3333)
2. Navigate to any page, post, or simplePage document
3. Click the "Preview" tab at the top of the document
4. You should see your content rendered in the iframe
5. Make changes to the document and save - the preview will update automatically (you may need to refresh)

## Supported Content Types

The preview currently supports:

- `page` - Standard pages with sections
- `simplePage` - Simple pages with sections
- `post` - Blog posts with full post layout

To add support for more content types:

1. Add the type to `previewableTypes` in `studio/src/structure/previewPane.ts`
2. Add a case for the type in `fetchPreviewContent()` in `frontend/src/lib/queries/preview.ts`
3. Add rendering logic in `frontend/src/pages/preview/index.astro`

## Security

The preview endpoint is protected by a secret token. Without the correct `SANITY_PREVIEW_SECRET`, requests will return a 401 Unauthorized response.

**Important**: Never commit your `.env` files to version control. The `.env.example` files are provided as templates.

## Troubleshooting

### Preview shows "Unauthorized"

- Check that `SANITY_PREVIEW_SECRET` matches in both `frontend/.env` and `studio/.env`
- Restart both servers after changing environment variables

### Preview shows "Content not found"

- Verify the document has a slug
- Check that the document type is in the `previewableTypes` array
- Ensure `SANITY_API_READ_TOKEN` has the correct permissions

### Preview shows "Unauthorized - Session not found"

- This means you're using a personal token instead of a project token
- Go to your project's API settings (not personal tokens): https://sanity.io/manage/project/{your-project-id}/api/tokens
- Create a new project-scoped token with Viewer permissions
- Update `SANITY_API_READ_TOKEN` in your `frontend/.env` file
- Restart your Astro dev server

### Preview shows blank page

- Check the browser console for errors
- Verify that the Astro dev server is running on the URL specified in `SANITY_STUDIO_PREVIEW_URL`
- Check that all required environment variables are set

### Changes don't show in preview

- The preview uses the `previewDrafts` perspective which prioritizes drafts over published content
- You may need to save your changes in Sanity first
- Try clicking the refresh button in the preview pane

## Technical Details

### Preview Client Configuration

The preview client uses:

- `useCdn: false` - Bypasses CDN to get latest content
- `perspective: "drafts"` - Automatically prefers draft versions over published
- `token` - API token for authenticated requests to access drafts

### URL Structure

Preview URLs follow this pattern:

```
/preview/?secret={SECRET}&slug={SLUG}&type={TYPE}
```

Example:

```
/preview/?secret=abc123&slug=about&type=page
```

### Special Cases

- Homepage: Uses slug `homepage`
- 404 Page: Uses slug `404`

## Production Deployment

For production:

1. Update `SANITY_STUDIO_PREVIEW_URL` to your production frontend URL
2. Ensure environment variables are set in your hosting platform (Vercel, Netlify, etc.)
3. Keep the same `SANITY_PREVIEW_SECRET` across environments
4. Consider using different Sanity API tokens for different environments

## Further Reading

- [Sanity Content Lake](https://www.sanity.io/docs/datastore)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Astro Server-Side Rendering](https://docs.astro.build/en/guides/server-side-rendering/)
