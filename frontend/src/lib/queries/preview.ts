import { fetchPageBySlug, fetchHomepage } from "@/lib/queries/page";
import { fetchPostBySlug } from "@/lib/queries/post";

// Main preview fetch function - reuses existing query functions
// The smart client in sanity.ts automatically handles drafts in development
export async function fetchPreviewContent(slug: string, type: string) {
  switch (type) {
    case "page":
    case "simplePage":
      // Homepage is a special case - it uses _id instead of slug
      if (slug === "homepage") {
        return fetchHomepage();
      }
      return fetchPageBySlug(slug);
    case "post":
      return fetchPostBySlug(slug);
    default:
      return null;
  }
}
