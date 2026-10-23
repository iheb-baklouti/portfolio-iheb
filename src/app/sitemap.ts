import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}`]));

  // `/` only redirects, so the localized URLs are the canonical entries.
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === locales[0] ? 1 : 0.9,
    alternates: { languages },
  }));
}
