import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { getPortfolioContent, getPortfolioStats } from "@/data/portfolio-content";
import { isLocale, type Locale } from "@/i18n/config";

/** Rebuild daily so the derived "years of experience" figure stays current. */
export const revalidate = 86400;

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const activeLocale = locale as Locale;
  // Computed on the server so the hero counters never disagree with the markup.
  const stats = getPortfolioStats(getPortfolioContent(activeLocale));

  return (
    <main className="flex flex-1 flex-col">
      <HeroSection locale={activeLocale} stats={stats} />
      <AboutSection locale={activeLocale} />
      <ProjectsSection locale={activeLocale} />
      <SkillsSection locale={activeLocale} />
      <FaqSection locale={activeLocale} />
      <ContactSection locale={activeLocale} />
    </main>
  );
}
