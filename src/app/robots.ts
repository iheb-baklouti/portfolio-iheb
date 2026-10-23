import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    // No `host` directive: it's Yandex-only and never supported by Google,
    // which flags it as an ignored rule in Search Console for no benefit.
  };
}
