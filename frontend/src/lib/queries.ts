import { sanityClient } from "./sanity";

const sectionFields = `
  _type == "ctaBanner" => {
    _type,
    eyebrow,
    title,
    "body": coalesce(body, []),
    alignment,
    theme,
    media {
      type,
      image {
        asset->{
          _id,
          url
        },
        altText
      },
      video {
        asset->{
          _id,
          url
        }
      }
    },
    cta[] {
      variant,
      size,
      label,
      linkType,
      internalLink->{
        _type,
        slug
      },
      externalLink,
      anchorLink
    }
  },
  _type == "feature" => {
    _type,
    title,
    "body": coalesce(body, []),
    theme,
    mediaSide,
    media {
      type,
      image {
        asset->{
          _id,
          url
        },
        altText
      },
      video {
        asset->{
          _id,
          url
        }
      }
    },
    cta[] {
      variant,
      size,
      label,
      linkType,
      internalLink->{
        _type,
        slug
      },
      externalLink,
      anchorLink
    }
  },
  _type == "headline" => {
    _type,
    theme,
    eyebrow,
    "title": coalesce(title, []),
    "subhead": coalesce(subhead, []),
    "body": coalesce(body, []),
    alignment,
    cta[] {
      variant,
      size,
      label,
      linkType,
      internalLink->{
        _type,
        slug
      },
      externalLink,
      anchorLink
    }
  },
  _type == "hero" => {
    _type,
    theme,
    eyebrow,
    "title": coalesce(title, []),
    "subhead": coalesce(subhead, []),
    "body": coalesce(body, []),
    media {
      type,
      image {
        asset->{
          _id,
          url
        },
        altText
      },
      video {
        asset->{
          _id,
          url
        }
      }
    },
    cta[] {
      variant,
      size,
      label,
      linkType,
      internalLink->{
        _type,
        slug
      },
      externalLink,
      anchorLink
    }
  },
  _type == "multicard" => {
    _type,
    theme,
    eyebrow,
    title,
    "subhead": coalesce(subhead, []),
    "body": coalesce(body, []),
    layout,
    columns,
    cta[] {
      variant,
      size,
      label,
      linkType,
      internalLink->{
        _type,
        slug
      },
      externalLink,
      anchorLink
    },
    multicardItems[] {
      media {
        type,
        image {
          asset->{
            _id,
            url
          },
          altText
        },
        video {
          asset->{
            _id,
            url
          }
        }
      },
      eyebrow,
      title,
      "subhead": coalesce(subhead, []),
      "body": coalesce(body, []),
      makeClickable,
      link {
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
        }
      }
    }
  }
`;

const sectionProjections = `
  _type == 'linkedSection' || _type == 'reference' => @->{
    ${sectionFields}
  },
  ${sectionFields}
`;

export async function fetchHomepage() {
  return await sanityClient.fetch(
    `*[_type == "page" && _id == "homepage"][0] {
      ...,
      "slug": select(
        _id == "homepage" => "homepage",
        _id == "notFoundPage" => "404",
        slug.current
      ),
      "sections": sections[] {
        ${sectionProjections}
      },
      noIndex
    }`
  );
}

export async function fetchPageBySlug(slug: string) {
  return await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      ...,
      "slug": select(
        _id == "homepage" => "homepage",
        _id == "notFoundPage" => "404",
        slug.current
      ),
      "sections": sections[] {
        ${sectionProjections}
      },
      noIndex
    }`,
    { slug }
  );
}

