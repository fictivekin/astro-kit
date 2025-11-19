// Reusable GROQ fragments for queries

// Image asset with dimensions and alt text
export const image = `
  image {
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

// Video asset
export const video = `
  video {
    asset->{
      _id,
      url
    }
  }
`;

// Full media object with image and video
export const media = `
  media {
    type,
    ${image},
    ${video}
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

