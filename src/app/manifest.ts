import type { MetadataRoute } from "next";
import { defaultLocale } from "@/i18n/config";
import { getPortfolioContent } from "@/data/portfolio-content";

export default function manifest(): MetadataRoute.Manifest {
  const { profile } = getPortfolioContent(defaultLocale);

  return {
    name: `${profile.name} — ${profile.headline}`,
    short_name: profile.name,
    description: profile.slogan,
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#f7f5f2",
    theme_color: "#0b0a12",
    lang: defaultLocale,
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
