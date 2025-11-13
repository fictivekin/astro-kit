import { defineCollection } from 'astro:content';
import { fetchHomepage, fetchPageBySlug } from '../lib/queries/page';
import { fetchAllPosts } from '../lib/queries/post';
import { sanityClient } from '../lib/sanity';
import { pageZ } from '../lib/schemas/page';
import { postZ } from '../lib/schemas/post';

// Home collection - single entry for homepage
const homeCollection = defineCollection({
  loader: async () => {
    const homepage = await fetchHomepage();

    if (!homepage) {
      return [];
    }

    return [{
      id: homepage.slug,
      ...homepage,
    }];
  },
  schema: pageZ,
});

// Pages collection - all pages with slugs
const pagesCollection = defineCollection({
  loader: async () => {
    // First, get all page slugs
    const pages = await sanityClient.fetch<Array<{ slug: string }>>(
      `*[_type == "page" && defined(slug.current)] {
        "slug": slug.current
      }`
    );

    if (!pages || pages.length === 0) {
      return [];
    }

    // Fetch each page by slug - data is already parsed by fetchPageBySlug
    const pageData = await Promise.all(
      pages.map(async (page) => {
        const data = await fetchPageBySlug(page.slug);
        return {
          id: data.slug,
          ...data,
        };
      })
    );

    return pageData.filter(page => page !== null && page !== undefined);
  },
  schema: pageZ,
});

// Posts collection - all posts
const postsCollection = defineCollection({
  loader: async () => {
    const posts = await fetchAllPosts();

    if (!posts || posts.length === 0) {
      return [];
    }

    return posts.map(post => ({
      id: post.slug,
      ...post,
    }));
  },
  schema: postZ,
});

export const collections = {
  home: homeCollection,
  pages: pagesCollection,
  posts: postsCollection,
};

