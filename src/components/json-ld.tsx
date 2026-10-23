import { localeMeta, type Locale } from "@/i18n/config";
import { getPortfolioContent } from "@/data/portfolio-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iheb-baklouti.vercel.app";

/** Structured data: a Person node plus the ProfilePage and WebSite that describe it. */
export function JsonLd({ locale }: { locale: Locale }) {
  const { profile, experiences, education, skillGroups, faq } = getPortfolioContent(locale);
  const pageUrl = `${siteUrl}/${locale}`;
  const personId = `${siteUrl}/#person`;

  const knowsAbout = Array.from(new Set(skillGroups.flatMap((group) => group.items)));

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      jobTitle: profile.headline,
      description: profile.bio,
      email: `mailto:${profile.contact.email}`,
      telephone: profile.contact.phone,
      image: `${siteUrl}/portrait.png`,
      url: pageUrl,
      sameAs: [profile.contact.linkedin],
      knowsAbout,
      knowsLanguage: profile.languages.map((language) => language.name),
      address: { "@type": "PostalAddress", addressCountry: "TN" },
      worksFor: experiences
        .filter((experience) => experience.current)
        .map((experience) => ({ "@type": "Organization", name: experience.company })),
      alumniOf: education.map((item) => ({ "@type": "EducationalOrganization", name: item.school })),
    },
    {
      "@type": "ProfilePage",
      "@id": `${pageUrl}#page`,
      url: pageUrl,
      name: `${profile.name} — ${profile.headline}`,
      description: profile.metaDescription,
      inLanguage: localeMeta[locale].htmlLang,
      mainEntity: { "@id": personId },
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${profile.name} Portfolio`,
      inLanguage: localeMeta[locale].htmlLang,
      publisher: { "@id": personId },
    },
    // Mirrors the visible FAQ section exactly (same questions/answers) — required
    // for Google to treat it as a genuine FAQPage rather than hidden/mismatched markup.
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: localeMeta[locale].htmlLang,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
