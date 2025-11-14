import type { Link } from './schemas/navigation';

/**
 * Resolves a Sanity link object to an href string
 * Handles internal pages, external URLs, hashes, files, and posts
 */
export function resolveLink(link: Link | undefined): string {
  if (!link) return '#';

  const { linkType, href, hash, page, simplePage, post, file } = link;

  switch (linkType) {
    case 'href':
      return href || '#';

    case 'hash':
      return hash ? `#${hash}` : '#';

    case 'page':
      if (page?.slug?.current) {
        return `/${page.slug.current}`;
      }
      return '#';

    case 'simplePage':
      if (simplePage?.slug?.current) {
        return `/${simplePage.slug.current}`;
      }
      return '#';

    case 'post':
      if (post?.slug?.current) {
        return `/resources/${post.slug.current}`;
      }
      return '#';

    case 'file':
      if (file?.asset?.url) {
        return file.asset.url;
      }
      return '#';

    default:
      return '#';
  }
}

