// Reusable GROQ fragments for queries

// Image asset with dimensions and alt text
export const imageFields = `
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
`;

// Full media object with image and video
export const media = `
  media {
    type,
    image {
      ${imageFields}
    },
    video {
      asset->{
        _id,
        url
      }
    }
  }
`;

// Base link fields (without variant/size/onClick - can be composed)
export const linkFields = `
  label,
  linkType,
  href,
  hash,
  page->{
    _type,
    slug
  },
  simplePage->{
    _type,
    slug
  },
  post->{
    _type,
    slug
  },
  file {
    asset->{
      _id,
      url
    }
  },
  openInNewTab
`;

// SEO and social media fields
export const seoFields = `
  seoTitle,
  seoDescription,
  seoKeywords,
  noIndex,
  socialTitle,
  socialDescription,
  socialImage {
    asset-> {
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
  socialImageAlt
`;
