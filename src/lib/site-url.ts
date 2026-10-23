/**
 * Absolute site URL, with any trailing slash stripped.
 *
 * `NEXT_PUBLIC_SITE_URL` is set per-environment (e.g. in the Vercel project
 * settings) and isn't guaranteed to come without a trailing slash. Every
 * consumer here builds URLs as `${siteUrl}/path`, so a trailing slash in the
 * env var silently produces doubled slashes (`https://example.com//fr`) in
 * the sitemap, robots.txt, og:url, and JSON-LD — normalizing once here is
 * what keeps that from happening again anywhere it's used.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://iheb-baklouti.vercel.app").replace(/\/+$/, "");
