export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const LOCALE_COOKIE = "portfolio-locale";

/** BCP-47 / OpenGraph tags derived from the app locale. */
export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  fr: { htmlLang: "fr-FR", ogLocale: "fr_FR", label: "Français" },
  en: { htmlLang: "en-US", ogLocale: "en_US", label: "English" },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Picks the best supported locale out of a raw `Accept-Language` header.
 * Falls back to {@link defaultLocale} when nothing matches.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), quality: q ? Number.parseFloat(q.split("=")[1]) || 0 : 1 };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}
