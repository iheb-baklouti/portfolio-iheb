"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Database, Layers, Smartphone, Boxes } from "lucide-react";
import { fadeUp, popCard, staggerFast, viewportOnce } from "@/lib/motion";
import { type Locale } from "@/i18n/config";
import { getPortfolioContent, type ProjectCategory } from "@/data/portfolio-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

type Filter = ProjectCategory | "all";

const categoryIcon: Record<ProjectCategory, typeof Layers> = {
  product: Layers,
  data: Database,
  business: Boxes,
  mobile: Smartphone,
};

export function ProjectsSection({ locale }: { locale: Locale }) {
  const { projects, labels } = getPortfolioContent(locale);
  const [filter, setFilter] = useState<Filter>("all");

  // Only offer filters that actually have projects behind them.
  const filters = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    const ordered: ProjectCategory[] = ["product", "data", "business", "mobile"];
    return [
      { key: "all" as const, label: labels.projects.all, count: projects.length },
      ...ordered
        .filter((category) => present.has(category))
        .map((category) => ({
          key: category,
          label: labels.projects.categories[category],
          count: projects.filter((p) => p.category === category).length,
        })),
    ];
  }, [projects, labels.projects]);

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projets" className="relative overflow-hidden border-b border-border py-[var(--section-pad)]">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[var(--glow)] blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={labels.projects.title}
          title={labels.projects.heading}
          description={labels.projects.subtitle}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 flex flex-wrap gap-2"
        >
          {filters.map((item) => {
            const active = filter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.key)}
                className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-transparent text-background"
                    : "border-border bg-card-elevated text-muted hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-foreground"
                  />
                ) : null}
                <span className="relative">{item.label}</span>
                <span
                  className={`relative font-mono text-[11px] ${active ? "text-background/70" : "text-faint"}`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        <LayoutGroup>
          <motion.div
            layout
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project) => {
                const Icon = categoryIcon[project.category];
                return (
                  <motion.div key={project.name} layout variants={popCard} exit="exit">
                    <TiltCard
                      tilt={5}
                      className={`group h-full rounded-card border border-border bg-card-elevated p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-[color-mix(in_oklch,var(--accent)_14%,transparent)] ${
                        project.featured ? "ring-1 ring-accent/25" : ""
                      }`}
                    >
                      <div className="relative flex h-full flex-col">
                        {project.featured ? (
                          <span className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-accent to-accent-tertiary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                            {labels.projects.featured}
                          </span>
                        ) : null}

                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/18 to-accent-secondary/18 text-accent">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>

                        <p className="font-mono text-[11px] uppercase tracking-widest text-faint">{project.year}</p>
                        <h3 className="mt-1.5 text-lg font-semibold text-foreground">{project.name}</h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted">{project.client}</p>
                        <p className="pretty mt-3.5 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border bg-background/70 px-2.5 py-0.5 text-xs font-medium text-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {labels.projects.categories[project.category]}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {visible.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">{labels.projects.empty}</p>
        ) : null}
      </div>
    </section>
  );
}
