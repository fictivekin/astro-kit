import { sanityClient } from "@/lib/sanity";
import { pageZ } from "@/lib/schemas/page";

// Reusable GROQ fragments
const media = `
  media {
    type,
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
    },
    video {
      asset->{
        _id,
        url
      }
    }
  }
`;

const cta = `
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
`;

const sectionFields = `
  _type == "ctaBanner" => {
    _type,
    eyebrow,
    title,
    "body": coalesce(body, []),
    alignment,
    theme,
    ${media},
    ${cta}
  },
  _type == "feature" => {
    _type,
    title,
    "body": coalesce(body, []),
    theme,
    mediaSide,
    ${media},
    ${cta}
  },
  _type == "headline" => {
    _type,
    theme,
    eyebrow,
    "title": coalesce(title, []),
    "subhead": coalesce(subhead, []),
    "body": coalesce(body, []),
    alignment,
    ${cta}
  },
  _type == "hero" => {
    _type,
    theme,
    eyebrow,
    "title": coalesce(title, []),
    "subhead": coalesce(subhead, []),
    "body": coalesce(body, []),
    ${media},
    ${cta}
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
    ${cta},
    multicardItems[] {
      ${media},
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
  const result = await sanityClient.fetch(
    `*[_type == "page" && _id == "homepage"][0] {
      _id,
      _type,
      title,
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

  return pageZ.parse(result);
}

export async function fetchPageBySlug(slug: string) {
  const result = await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      _type,
      title,
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

  return pageZ.parse(result);
}

