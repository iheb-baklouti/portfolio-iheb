import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import { Providers } from "../providers";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { getPortfolioContent } from "@/data/portfolio-content";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iheb-baklouti.vercel.app";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0a12" },
  ],
  colorScheme: "light dark",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { profile } = getPortfolioContent(locale);
  const title = `${profile.name} — ${profile.headline}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${profile.name}` },
    description: profile.slogan,
    applicationName: `${profile.name} Portfolio`,
    authors: [{ name: profile.name, url: profile.contact.linkedin }],
    creator: profile.name,
    keywords:
      locale === "fr"
        ? ["développeur full stack", "ingénieur data", "React", "Next.js", "Symfony", "Talend", "ETL", "freelance"]
        : ["full stack developer", "data engineer", "React", "Next.js", "Symfony", "Talend", "ETL", "freelance"],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": `/${locales[0]}`,
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      title,
      description: profile.slogan,
      url: `${siteUrl}/${locale}`,
      siteName: `${profile.name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: profile.slogan,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: "GSESM8WNH7E1TAdBpQgIRZsy4RNAurIt1ks4bNNXP6U",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const activeLocale = locale as Locale;
  const { labels } = getPortfolioContent(activeLocale);

  return (
    <html
      lang={localeMeta[activeLocale].htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}

        <Providers>
          <a
            href="#accueil"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
          >
            {labels.a11y.skipToContent}
          </a>

          <ScrollProgress />
          <JsonLd locale={activeLocale} />
          <SiteHeader locale={activeLocale} />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter locale={activeLocale} />
          <BackToTop label={labels.a11y.backToTop} />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
