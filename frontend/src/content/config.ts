import { defineCollection } from "astro:content";
import { fetchHomepage, fetchPageBySlug } from "@/lib/queries/page";
import { fetchAllPosts, fetchPostsByTopic } from "@/lib/queries/post";
import {
  fetchMainNavigation,
  fetchFooterNavigation,
} from "@/lib/queries/navigation";
import { fetchSiteSettings } from "@/lib/queries/siteSettings";
import sanityClient from "@/lib/sanity";
import { pageZ } from "@/lib/schemas/page";
import { postZ } from "@/lib/schemas/post";
import { mainNavigationZ, footerNavigationZ } from "@/lib/schemas/navigation";
import { siteSettingsZ } from "@/lib/schemas/siteSettings";
import { topicZ } from "@/lib/schemas/topic";

// Home collection - single entry for homepage
const homeCollection = defineCollection({
  loader: async () => {
    const homepage = await fetchHomepage();

    if (!homepage) {
      return [];
    }

    return [
      {
        id: homepage.slug,
        ...homepage,
      },
    ];
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

    return pageData.filter((page) => page !== null && page !== undefined);
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

    return posts.map((post) => ({
      id: post.slug,
      ...post,
    }));
  },
  schema: postZ,
});

// Topics collection - all topics
const topicsCollection = defineCollection({
  loader: async () => {
    const topics = await sanityClient.fetch<
      Array<{ _id: string; slug: { current: string }; title: string }>
    >(
      `*[_type == "topic"] | order(title asc) {
        _id,
        _type,
        slug,
        title
      }`
    );

    if (!topics || topics.length === 0) {
      return [];
    }

    return topics.map((topic) => ({
      id: topic.slug.current,
      ...topic,
    }));
  },
  schema: topicZ,
});

// Fetch all topics and create collections dynamically
const topics = await sanityClient.fetch<
  Array<{ slug: { current: string }; title: string }>
>(
  `*[_type == "topic"] {
    slug,
    title
  }`
);

// Create a collection for each topic
const topicCollections: Record<
  string,
  ReturnType<typeof defineCollection>
> = {};

for (const topic of topics) {
  const topicSlug = topic.slug.current;

  topicCollections[`posts-${topicSlug}`] = defineCollection({
    loader: async () => {
      const posts = await fetchPostsByTopic(topicSlug);

      if (!posts || posts.length === 0) {
        return [];
      }

      return posts.map((post) => ({
        id: post.slug,
        ...post,
      }));
    },
    schema: postZ,
  });
}

// Main navigation collection - singleton
const mainNavigationCollection = defineCollection({
  loader: async () => {
    const mainNavigation = await fetchMainNavigation();

    if (!mainNavigation) {
      return [];
    }

    return [
      {
        id: "mainNavigation",
        ...mainNavigation,
      },
    ];
  },
  schema: mainNavigationZ,
});

// Footer navigation collection - singleton
const footerNavigationCollection = defineCollection({
  loader: async () => {
    const footerNavigation = await fetchFooterNavigation();

    if (!footerNavigation) {
      return [];
    }

    return [
      {
        id: "footerNavigation",
        ...footerNavigation,
      },
    ];
  },
  schema: footerNavigationZ,
});

// Site settings collection - singleton
const siteSettingsCollection = defineCollection({
  loader: async () => {
    const siteSettings = await fetchSiteSettings();

    if (!siteSettings) {
      return [];
    }

    return [
      {
        id: "siteSettings",
        ...siteSettings,
      },
    ];
  },
  schema: siteSettingsZ,
});

export const collections = {
  home: homeCollection,
  pages: pagesCollection,
  posts: postsCollection,
  topics: topicsCollection,
  mainNavigation: mainNavigationCollection,
  footerNavigation: footerNavigationCollection,
  siteSettings: siteSettingsCollection,
  ...topicCollections,
};
