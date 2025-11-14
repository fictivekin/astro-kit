import { sanityClient } from "@/lib/sanity";
import { mainNavigationZ, footerNavigationZ } from "@/lib/schemas/navigation";

// Reusable GROQ fragments for navigation
const link = `
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
    },
    openInNewTab,
    onClick
  }
`;

const navigationItem = `
  ${link},
  linkText,
  children[] {
    ${link},
    linkText
  }
`;

export async function fetchMainNavigation() {
  const result = await sanityClient.fetch(
    `*[_type == "mainNavigation" && _id == "mainNavigation"][0] {
      _id,
      _type,
      items[] {
        ${navigationItem}
      }
    }`
  );

  if (!result) {
    return null;
  }

  return mainNavigationZ.parse(result);
}

export async function fetchFooterNavigation() {
  const result = await sanityClient.fetch(
    `*[_type == "footerNavigation" && _id == "footerNavigation"][0] {
      _id,
      _type,
      brandingText,
      navigationColumns[] {
        title,
        items[] {
          ${navigationItem}
        }
      },
      platforms[] {
        platform,
        url
      },
      legalNavigation[] {
        ${navigationItem}
      },
      copyrightText
    }`
  );

  if (!result) {
    return null;
  }

  return footerNavigationZ.parse(result);
}

