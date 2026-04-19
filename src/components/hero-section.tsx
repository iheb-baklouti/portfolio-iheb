"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/cv";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[20%] -top-[30%] h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-[var(--glow)] blur-[100px] animate-mesh-a" />
        <div className="absolute -right-[15%] top-[10%] h-[min(80vw,440px)] w-[min(80vw,440px)] rounded-full bg-[var(--glow-warm)] blur-[110px] animate-mesh-b" />
        <div className="absolute bottom-[-20%] left-[25%] h-[min(70vw,380px)] w-[min(70vw,380px)] rounded-full bg-violet-500/15 blur-[90px] dark:bg-violet-400/10 animate-mesh-c" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_88%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-xl lg:max-w-none"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card-elevated/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm dark:bg-card/80"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            <span className="text-muted">{profile.availability}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[2.75rem] lg:leading-[1.08]"
          >
            <span className="text-gradient">{profile.name}</span>
            <span className="mt-2 block text-2xl font-medium tracking-tight text-muted sm:text-3xl">
              {profile.headline}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.slogan}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/25 transition hover:shadow-xl hover:shadow-indigo-900/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 transition group-hover:brightness-110 dark:from-indigo-500 dark:via-violet-500 dark:to-fuchsia-500" />
              <span className="relative">Me contacter</span>
              <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projets"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card-elevated/90 px-5 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:border-accent/40 hover:shadow-md dark:bg-card/80"
            >
              Voir les projets
            </a>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold text-accent underline-offset-4 transition hover:underline"
            >
              LinkedIn
            </a>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-8 sm:max-w-xl"
          >
            {[
              { k: "Expérience", v: "Full Stack & Data" },
              { k: "Focus", v: "Produit & intégration" },
              { k: "Mode", v: "Freelance OK" },
            ].map((row) => (
              <div key={row.k}>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted">{row.k}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{row.v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-md justify-self-center lg:justify-self-end"
        >
          <motion.div
            whileHover={{ y: -6, rotate: -0.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-[1.65rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-amber-500 opacity-80 blur-sm dark:opacity-60" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-1 shadow-2xl shadow-indigo-950/20 dark:shadow-black/50">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-muted/20">
                <Image
                  src="/portrait.png"
                  alt={`Portrait professionnel de ${profile.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
