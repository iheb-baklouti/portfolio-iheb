"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Code2, LayoutPanelTop, Server, Database, LineChart, Wrench } from "lucide-react";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";
import { type Locale } from "@/i18n/config";
import { getPortfolioContent, getTechMarquee } from "@/data/portfolio-content";
import { Aurora } from "@/components/ui/aurora";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";

const icons: LucideIcon[] = [Code2, LayoutPanelTop, Server, Database, LineChart, Wrench];

export function SkillsSection({ locale }: { locale: Locale }) {
  const content = getPortfolioContent(locale);
  const { skillGroups, labels } = content;
  const marqueeItems = getTechMarquee(content);

  return (
    <section
      id="competences"
      className="relative overflow-hidden border-b border-border bg-background-subtle/60 py-[var(--section-pad)]"
    >
      <Aurora variant="soft" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={labels.skills.title}
          title={labels.skills.heading}
          description={labels.skills.subtitle}
        />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group, index) => {
            const Icon = icons[index] ?? Wrench;
            return (
              <motion.div
                key={group.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="group relative overflow-hidden rounded-card border border-border bg-card-elevated p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-[color-mix(in_oklch,var(--accent)_12%,transparent)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-accent/25 to-accent-secondary/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
                />

                <div className="relative flex items-center gap-3">
                  <motion.span
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-tertiary text-white shadow-lg shadow-[color-mix(in_oklch,var(--accent)_30%,transparent)]"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </motion.span>
                  <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
                </div>

                <ul className="relative mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm">
                      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-secondary" />
                      <span className="text-foreground/90 transition-colors group-hover:text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="relative mt-16">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
          {labels.skills.marqueeLabel}
        </p>
        <Marquee
          items={marqueeItems.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-border bg-card-elevated px-4 py-2 text-sm font-medium text-muted transition hover:border-accent/45 hover:text-accent"
            >
              {tech}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
