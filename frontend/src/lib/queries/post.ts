import { sanityClient } from "../sanity";
import { postZ } from "../schemas/post";

// Reusable GROQ fragments for post data

const heroImage = `
  heroImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    altText
  }
`;

const author = `
  author[]->{
    _id,
    _type,
    name,
    slug,
    position,
    company,
    photo {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      altText
    },
    bio
  }
`;

const topics = `
  topics[]->{
    _id,
    _type,
    title,
    slug
  }
`;

const format = `
  format->{
    _id,
    _type,
    title,
    slug
  }
`;

const relatedPosts = `
  relatedPosts[]->{
    _id,
    _type,
    title,
    "slug": slug.current,
    publishedOn,
    thumbnailText,
    ${heroImage}
  }
`;

const seoFields = `
  metaTitle,
  metaDescription,
  noIndex,
  ogTitle,
  ogDescription,
  ogImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    altText
  },
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    altText
  }
`;

// Fetch single post by slug with all data
export async function fetchPostBySlug(slug: string) {
  const result = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      publishedOn,
      thumbnailText,
      "body": coalesce(body, []),
      ${heroImage},
      ${author},
      ${format},
      ${topics},
      ${relatedPosts},
      showRelatedPosts,
      showTOC,
      showReadingTime,
      ${seoFields}
    }`,
    { slug }
  );

  if (!result) {
    return null;
  }

  return postZ.parse(result);
}

// Fetch all posts with basic data for listings
export async function fetchAllPosts() {
  const results = await sanityClient.fetch<Array<any>>(
    `*[_type == "post"] | order(publishedOn desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      publishedOn,
      thumbnailText,
      ${heroImage},
      ${author},
      ${format},
      ${topics},
      showRelatedPosts,
      showTOC,
      showReadingTime,
      ${seoFields}
    }`
  );

  console.log('fetchAllPosts - Raw results from Sanity:', results?.length);

  if (!results || results.length === 0) {
    return [];
  }

  const parsed = results.map(result => postZ.parse(result));
  console.log('fetchAllPosts - Parsed results:', parsed.length);

  return parsed;
}

// Fetch posts filtered by topic
export async function fetchPostsByTopic(topicSlug: string) {
  const results = await sanityClient.fetch<Array<any>>(
    `*[_type == "post" && $topicSlug in topics[]->slug.current] | order(publishedOn desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      publishedOn,
      thumbnailText,
      ${heroImage},
      ${author},
      ${format},
      ${topics},
      showRelatedPosts,
      showTOC,
      showReadingTime,
      ${seoFields}
    }`,
    { topicSlug }
  );

  if (!results || results.length === 0) {
    return [];
  }

  return results.map(result => postZ.parse(result));
}

// Fetch posts filtered by format
export async function fetchPostsByFormat(formatSlug: string) {
  const results = await sanityClient.fetch<Array<any>>(
    `*[_type == "post" && format->slug.current == $formatSlug] | order(publishedOn desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      publishedOn,
      thumbnailText,
      ${heroImage},
      ${author},
      ${format},
      ${topics},
      showRelatedPosts,
      showTOC,
      showReadingTime,
      ${seoFields}
    }`,
    { formatSlug }
  );

  if (!results || results.length === 0) {
    return [];
  }

  return results.map(result => postZ.parse(result));
}

