import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/data/cv";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.slogan,
  keywords: [
    "Iheb Baklouti",
    "développeur full stack",
    "développeur data",
    "React",
    "PHP",
    "Talend",
    "ETL",
    "freelance",
    "Tunisie",
  ],
  authors: [{ name: profile.name, url: profile.contact.linkedin }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: `${profile.name} — ${profile.headline}`,
    description: profile.slogan,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
    description: profile.slogan,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <Providers>
          <JsonLd />
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
