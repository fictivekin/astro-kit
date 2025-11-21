import sanityClient from "@/lib/sanity";
import { pageZ } from "@/lib/schemas/page";
import { linkFields, media } from "@/lib/queries/fragments";

// Reusable GROQ fragments
const cta = `
  cta[] {
    ${linkFields},
    variant,
    size
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
        ${linkFields}
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
    `*[_type == "page" && (_id == "homepage" || _id == "drafts.homepage")][0] {
      _id,
      _type,
      title,
      "slug": select(
        _id == "homepage" => "homepage",
        _id == "drafts.homepage" => "homepage",
        _id == "notFoundPage" => "404",
        slug.current
      ),
      "sections": sections[] {
        ${sectionProjections}
      },
      seoTitle,
      seoDescription,
      seoKeywords,
      noIndex,
      socialTitle,
      socialDescription,
      socialImage {
        asset-> {
          _id,
          url
        },
        altText
      },
      socialImageAlt
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
      seoTitle,
      seoDescription,
      seoKeywords,
      noIndex,
      socialTitle,
      socialDescription,
      socialImage {
        asset-> {
          _id,
          url
        },
        altText
      },
      socialImageAlt
    }`,
    { slug }
  );

  return pageZ.parse(result);
}
