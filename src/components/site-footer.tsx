import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { type Locale } from "@/i18n/config";
import { getPortfolioContent } from "@/data/portfolio-content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const { profile, labels } = getPortfolioContent(locale);

  const navLinks = [
    { href: "#accueil", label: labels.nav.home },
    { href: "#a-propos", label: labels.nav.about },
    { href: "#projets", label: labels.nav.projects },
    { href: "#competences", label: labels.nav.skills },
    { href: "#faq", label: labels.nav.faq },
    { href: "#contact", label: labels.nav.contact },
  ];

  const elsewhere = [
    { href: profile.contact.linkedin, label: "LinkedIn", icon: LinkedInIcon, external: true },
    { href: `mailto:${profile.contact.email}`, label: profile.contact.email, icon: Mail },
    { href: `tel:${profile.contact.phone.replace(/\s/g, "")}`, label: profile.contact.phone, icon: Phone },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-subtle/70">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-[var(--glow)] blur-[120px] opacity-60"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href={`/${locale}#accueil`} className="text-base font-bold tracking-tight">
              <span className="text-gradient">{profile.name}</span>
            </Link>
            <p className="pretty mt-3 max-w-sm text-sm text-muted">{labels.footer.tagline}</p>
            <p className="mt-4 text-sm text-muted">{profile.location}</p>
          </div>

          <nav aria-label={labels.footer.nav}>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-faint">{labels.footer.nav}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-muted transition hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-faint">{labels.footer.elsewhere}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {elsewhere.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="inline-flex items-center gap-2 text-muted transition hover:text-accent"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>{labels.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
