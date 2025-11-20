import { sanityClient } from "@/lib/sanity";
import { siteSettingsZ } from "@/lib/schemas/siteSettings";
import { image } from "@/lib/queries/fragments";

export async function fetchSiteSettings() {
  const result = await sanityClient.fetch(
    `*[_type == "siteSettings" && _id == "siteSettings"][0] {
      _id,
      _type,
      title,
      legalName,
      seoTitle,
      seoDescription,
      seoKeywords,
      noIndex,
      socialTitle,
      socialDescription,
      ${image.replace("image", "socialImage")},
      socialImageAlt,
      twitter,
      googleTagManagerId,
      googleAnalyticsId,
      facebookAppId
    }`
  );

  if (!result) {
    return null;
  }

  return siteSettingsZ.parse(result);
}

