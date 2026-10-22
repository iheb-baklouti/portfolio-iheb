"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { ONE_YEAR_SECONDS, setCookie } from "@/lib/cookies";

type LocaleSwitchProps = {
  locale: Locale;
  labels: Record<Locale, string>;
  ariaLabel: string;
  /** Distinguishes the desktop and mobile instances for the shared layout indicator. */
  layoutId?: string;
};

/**
 * Two-way language pill with a sliding active indicator.
 * Persists the choice in a cookie so `proxy.ts` honours it on the next visit.
 */
export function LocaleSwitch({ locale, labels, ariaLabel, layoutId = "locale-pill" }: LocaleSwitchProps) {
  function remember(next: Locale) {
    setCookie(LOCALE_COOKIE, next, ONE_YEAR_SECONDS);
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center rounded-full border border-border bg-card-elevated p-1"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={`/${l}`}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            onClick={() => remember(l)}
            className={`relative rounded-full px-2.5 py-1 text-xs font-semibold transition ${
              active ? "text-background" : "text-muted hover:text-foreground"
            }`}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 rounded-full bg-foreground"
              />
            ) : null}
            <span className="relative">{labels[l]}</span>
          </Link>
        );
      })}
    </div>
  );
}
