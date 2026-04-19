"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/cv";
import type { LucideIcon } from "lucide-react";
import { Code2, LayoutPanelTop, Server, Database, LineChart, Wrench } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const icons: LucideIcon[] = [Code2, LayoutPanelTop, Server, Database, LineChart, Wrench];

export function SkillsSection() {
  return (
    <section
      id="competences"
      className="relative border-b border-border bg-card/35 py-20 dark:bg-card/20"
    >
      <div className="pointer-events-none absolute left-0 bottom-24 h-56 w-56 rounded-full bg-[var(--glow-warm)] blur-[90px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Compétences
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Stack technique & outils
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg text-muted">
            Développement full stack, données et intégration — aligné sur le terrain et le CV.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group, i) => {
            const Icon = icons[i] ?? Wrench;
            return (
              <motion.div
                key={group.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card-elevated p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-violet-500/10 dark:bg-card"
              >
                <motion.div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-500/20 to-amber-500/15 blur-2xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative flex items-center gap-3">
                  <motion.span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/25 dark:from-indigo-400 dark:to-fuchsia-500 dark:shadow-fuchsia-900/20"
                    whileHover={{ rotate: [0, -6, 6, 0], scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.span>
                  <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
                </div>
                <ul className="relative mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted">
                      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-amber-500" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
