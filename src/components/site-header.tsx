"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { type Locale } from "@/i18n/config";
import { getPortfolioContent } from "@/data/portfolio-content";
import { useActiveSection } from "@/hooks/use-active-section";
import { LocaleSwitch } from "@/components/ui/locale-switch";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const SECTION_IDS: string[] = ["accueil", "a-propos", "projets", "competences", "faq", "contact"];

const menuList = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};

const menuItem = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 380, damping: 28 } },
};

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const content = getPortfolioContent(locale);
  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 12));

  const links = [
    { id: "accueil", label: content.labels.nav.home },
    { id: "a-propos", label: content.labels.nav.about },
    { id: "projets", label: content.labels.nav.projects },
    { id: "competences", label: content.labels.nav.skills },
    { id: "faq", label: content.labels.nav.faq },
    { id: "contact", label: content.labels.nav.contact },
  ];

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 shadow-[0_1px_0_0_color-mix(in_oklch,var(--border)_70%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/55"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link
          href={`/${locale}#accueil`}
          className="group relative shrink-0 text-sm font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-gradient">Iheb Baklouti</span>
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-accent to-accent-secondary transition-all duration-300 group-hover:w-full" />
        </Link>

        <nav aria-label={content.labels.footer.nav} className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-foreground/[0.07] ring-1 ring-border dark:bg-white/[0.08]"
                  />
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LocaleSwitch
              locale={locale}
              labels={content.labels.localeName}
              ariaLabel={content.labels.a11y.switchLanguage}
            />
          </div>

          <ThemeToggle label={content.labels.a11y.toggleTheme} />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-elevated text-foreground shadow-sm transition hover:border-accent/45 md:hidden"
            aria-label={content.labels.a11y.toggleMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.div variants={menuList} initial="hidden" animate="show" className="flex flex-col gap-1 px-4 py-5">
              <motion.div variants={menuItem} className="mb-3">
                <LocaleSwitch
                  locale={locale}
                  labels={content.labels.localeName}
                  ariaLabel={content.labels.a11y.switchLanguage}
                  layoutId="locale-pill-mobile"
                />
              </motion.div>

              {links.map((link) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  variants={menuItem}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active === link.id
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-card hover:shadow-sm"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
