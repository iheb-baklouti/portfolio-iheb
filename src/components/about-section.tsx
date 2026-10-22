"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Briefcase, HeartHandshake, Languages } from "lucide-react";
import { fadeUp, popCard, staggerContainer, viewportOnce } from "@/lib/motion";
import { type Locale } from "@/i18n/config";
import { getPortfolioContent } from "@/data/portfolio-content";
import { Aurora } from "@/components/ui/aurora";
import { SectionHeading } from "@/components/ui/section-heading";

type TabKey = "education" | "internships" | "volunteering" | "languages";

export function AboutSection({ locale }: { locale: Locale }) {
  const { profile, experiences, education, volunteering, internships, labels } = getPortfolioContent(locale);
  const [tab, setTab] = useState<TabKey>("education");

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const tabs: Array<{ key: TabKey; label: string; icon: typeof GraduationCap }> = [
    { key: "education", label: labels.about.educationTitle, icon: GraduationCap },
    { key: "internships", label: labels.about.internshipsTitle, icon: Briefcase },
    { key: "volunteering", label: labels.about.volunteeringTitle, icon: HeartHandshake },
    { key: "languages", label: labels.about.languagesTitle, icon: Languages },
  ];

  return (
    <section id="a-propos" className="relative overflow-hidden border-b border-border bg-background-subtle/60 py-[var(--section-pad)]">
      <Aurora variant="soft" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={labels.about.title} title={labels.about.subtitle} description={profile.bio} />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* ---------------------------------------------------- timeline --- */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">{labels.about.experienceTitle}</h3>

            <div ref={timelineRef} className="relative mt-7 pl-8">
              <div className="absolute left-[7px] top-2 h-full w-px bg-border" aria-hidden />
              <motion.div
                aria-hidden
                style={{ scaleY: lineScale }}
                className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-tertiary to-accent-secondary"
              />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="space-y-7"
              >
                {experiences.map((exp) => (
                  <motion.div key={exp.company + exp.period} variants={fadeUp} className="relative">
                    {/* The marker lives outside the card: the card clips its own overflow. */}
                    <span
                      aria-hidden
                      className={`absolute -left-[32px] top-7 h-3.5 w-3.5 rounded-full border-2 border-background ${
                        exp.current ? "bg-accent" : "bg-border-strong"
                      }`}
                    >
                      {exp.current ? (
                        <span className="absolute -inset-px rounded-full bg-accent animate-pulse-ring" />
                      ) : null}
                    </span>

                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                      className="group relative overflow-hidden rounded-card border border-border bg-card-elevated p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-[color-mix(in_oklch,var(--accent)_12%,transparent)]"
                    >
                      <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-tertiary to-accent-secondary transition-transform duration-500 group-hover:scale-x-100" />

                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-accent">{exp.company}</p>
                          <h4 className="text-lg font-semibold text-foreground">{exp.role}</h4>
                        </div>
                        <p className="inline-flex items-center gap-2 text-sm text-muted">
                          {exp.period}
                          {exp.current ? (
                            <span className="rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                              {labels.about.present}
                            </span>
                          ) : null}
                        </p>
                      </div>

                      <p className="pretty mt-3 text-sm leading-relaxed text-muted">{exp.summary}</p>

                      <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                        {exp.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2.5">
                            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-secondary" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border bg-background/70 px-2.5 py-0.5 text-xs font-medium text-foreground transition group-hover:border-accent/35"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* -------------------------------------------------------- tabs --- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div
              role="tablist"
              aria-label={labels.about.subtitle}
              className="flex flex-wrap gap-1.5 rounded-full border border-border bg-card-elevated p-1.5"
            >
              {tabs.map(({ key, label, icon: Icon }) => {
                const active = tab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    id={`tab-${key}`}
                    aria-selected={active}
                    aria-controls={`panel-${key}`}
                    onClick={() => setTab(key)}
                    className={`relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                      active ? "text-background" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="about-tab-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-foreground"
                      />
                    ) : null}
                    <Icon className="relative h-3.5 w-3.5" aria-hidden />
                    <span className="relative hidden sm:inline">{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 min-h-[22rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  id={`panel-${tab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${tab}`}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.16 } }}
                >
                  <motion.h3 variants={fadeUp} className="mb-4 text-lg font-semibold text-foreground sm:hidden">
                    {tabs.find((t) => t.key === tab)?.label}
                  </motion.h3>

                  {tab === "education" ? (
                    <ul className="space-y-3">
                      {education.map((item) => (
                        <motion.li
                          key={item.degree}
                          variants={popCard}
                          className="rounded-card border border-border bg-card-elevated p-5 transition hover:border-accent/35"
                        >
                          <p className="font-medium text-foreground">{item.degree}</p>
                          <p className="mt-1 text-sm text-muted">{item.school}</p>
                          <p className="mt-1.5 font-mono text-xs text-faint">{item.period}</p>
                        </motion.li>
                      ))}
                    </ul>
                  ) : null}

                  {tab === "internships" ? (
                    <ul className="space-y-3">
                      {internships.map((item) => (
                        <motion.li
                          key={item.title}
                          variants={popCard}
                          className="rounded-card border border-border bg-card-elevated px-5 py-4 transition hover:border-accent/35"
                        >
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="mt-1 text-sm text-muted">
                            {item.org} · <span className="font-mono text-xs">{item.period}</span>
                          </p>
                          <p className="mt-2 text-xs font-medium text-accent">{item.stack.join(" · ")}</p>
                        </motion.li>
                      ))}
                    </ul>
                  ) : null}

                  {tab === "volunteering" ? (
                    <ul className="space-y-3">
                      {volunteering.map((item) => (
                        <motion.li
                          key={item.org}
                          variants={popCard}
                          className="flex items-start justify-between gap-4 rounded-card border border-border bg-card-elevated px-5 py-4 transition hover:border-accent/35"
                        >
                          <div>
                            <p className="font-medium text-foreground">{item.org}</p>
                            <p className="text-sm text-muted">{item.role}</p>
                          </div>
                          <p className="shrink-0 font-mono text-xs text-faint">{item.period}</p>
                        </motion.li>
                      ))}
                    </ul>
                  ) : null}

                  {tab === "languages" ? (
                    <ul className="space-y-3">
                      {profile.languages.map((item) => (
                        <motion.li
                          key={item.name}
                          variants={popCard}
                          className="flex items-center justify-between gap-4 rounded-card border border-border bg-card-elevated px-5 py-4 transition hover:border-accent/35"
                        >
                          <span className="font-medium text-foreground">{item.name}</span>
                          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                            {item.level}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
