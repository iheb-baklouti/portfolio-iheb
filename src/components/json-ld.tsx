import { profile } from "@/data/cv";

export function JsonLd() {
  const site = process.env.NEXT_PUBLIC_SITE_URL;

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    email: profile.contact.email,
    telephone: profile.contact.phone,
    sameAs: [profile.contact.linkedin],
    knowsAbout: ["Développement web", "PHP", "React", "Data engineering", "Talend", "ETL"],
    ...(site ? { url: site } : {}),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
