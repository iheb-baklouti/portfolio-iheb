import { ImageResponse } from "next/og";
import { getPortfolioContent } from "@/data/portfolio-content";
import { isLocale, locales, defaultLocale } from "@/i18n/config";

export const alt = "Iheb Baklouti — Full Stack & Data Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Social card generated per locale, mirroring the site's gradient identity. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getPortfolioContent(isLocale(locale) ? locale : defaultLocale);
  const { profile } = content;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0a12",
          backgroundImage:
            "radial-gradient(1000px 500px at 12% -10%, rgba(124,92,255,0.45), transparent 60%), radial-gradient(800px 420px at 95% 20%, rgba(255,170,70,0.28), transparent 62%), radial-gradient(700px 400px at 55% 120%, rgba(226,120,230,0.26), transparent 60%)",
          color: "#f6f4ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#b9b2d6" }}>
            {profile.location.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 42,
              fontWeight: 600,
              color: "#c3b8ff",
              letterSpacing: -1,
            }}
          >
            {profile.headline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 900,
              fontSize: 27,
              lineHeight: 1.45,
              color: "#a79ec4",
            }}
          >
            {profile.slogan}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {["React", "Next.js", "PHP / Symfony", "GraphQL", "Talend", "ETL"].map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                fontSize: 23,
                color: "#e6e1ff",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
