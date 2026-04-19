"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/cv";
import { Layers } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ProjectsSection() {
  return (
    <section id="projets" className="relative border-b border-border py-20">
      <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-[var(--glow)] blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Projets
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Réalisations sélectionnées
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg text-muted">
            Produits SaaS, data & intégration, applications métiers — extraits représentatifs du parcours.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.article
              key={p.name}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 360, damping: 22 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card-elevated p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-indigo-500/15 dark:bg-card dark:hover:shadow-violet-500/10 ${
                p.featured ? "ring-1 ring-accent/25" : ""
              }`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-amber-500/10" />
              </div>
              {p.featured && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm dark:from-indigo-400 dark:to-fuchsia-500">
                  Vedette
                </span>
              )}
              <div className="relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-amber-500/15 text-indigo-700 dark:from-indigo-400/20 dark:to-amber-400/15 dark:text-indigo-200">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="relative text-lg font-semibold text-foreground">{p.name}</h3>
              <p className="relative mt-1 text-xs font-bold uppercase tracking-widest text-muted">{p.client}</p>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background/70 px-2.5 py-0.5 text-xs font-medium text-foreground transition group-hover:border-accent/35 dark:bg-background/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
