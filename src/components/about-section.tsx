"use client";

import { motion } from "framer-motion";
import { profile, experiences, education, volunteering, internships } from "@/data/cv";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function AboutSection() {
  return (
    <section
      id="a-propos"
      className="relative border-b border-border bg-card/40 py-20 dark:bg-card/25"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            À propos
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Parcours, expérience & engagements
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            {profile.bio}
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >
            <motion.h3 variants={fadeUp} className="text-lg font-semibold text-foreground">
              Expérience professionnelle
            </motion.h3>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <motion.article
                  key={exp.company + exp.period}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card-elevated p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-indigo-500/10 dark:bg-card dark:hover:shadow-violet-500/10"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 transition group-hover:scale-x-100" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-accent">{exp.company}</p>
                      <h4 className="text-lg font-semibold text-foreground">{exp.role}</h4>
                    </div>
                    <p className="text-sm text-muted">{exp.period}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{exp.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-amber-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background/80 px-2.5 py-0.5 text-xs font-medium text-foreground dark:bg-background/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-10"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-foreground">Formation</h3>
              <ul className="mt-4 space-y-4">
                {education.map((ed) => (
                  <li
                    key={ed.degree}
                    className="rounded-2xl border border-border bg-card-elevated p-5 transition hover:border-accent/30 dark:bg-card"
                  >
                    <p className="font-medium text-foreground">{ed.degree}</p>
                    <p className="text-sm text-muted">{ed.school}</p>
                    <p className="mt-1 text-xs text-muted/80">{ed.period}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-foreground">Stages</h3>
              <ul className="mt-4 space-y-3">
                {internships.map((s) => (
                  <li
                    key={s.title}
                    className="rounded-xl border border-border bg-card-elevated px-4 py-3 text-sm transition hover:border-accent/25 dark:bg-card"
                  >
                    <p className="font-medium text-foreground">{s.title}</p>
                    <p className="text-muted">
                      {s.org} · {s.period}
                    </p>
                    <p className="mt-1 text-xs font-medium text-accent">{s.stack.join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-foreground">Bénévolat</h3>
              <ul className="mt-4 space-y-3">
                {volunteering.map((v) => (
                  <li key={v.org} className="flex items-start justify-between gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">{v.org}</p>
                      <p className="text-muted">{v.role}</p>
                    </div>
                    <p className="shrink-0 text-xs text-muted">{v.period}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-foreground">Langues</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {profile.languages.map((l) => (
                  <span
                    key={l.name}
                    className="rounded-full border border-border bg-card-elevated px-3 py-1.5 text-sm dark:bg-card"
                  >
                    <span className="font-semibold text-foreground">{l.name}</span>
                    <span className="text-muted"> — {l.level}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
