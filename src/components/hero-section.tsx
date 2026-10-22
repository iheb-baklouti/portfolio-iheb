"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, MousePointer2 } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";
import { type Locale } from "@/i18n/config";
import { getPortfolioContent } from "@/data/portfolio-content";
import { Aurora } from "@/components/ui/aurora";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { RoleRotator } from "@/components/ui/role-rotator";
import { TiltCard } from "@/components/ui/tilt-card";

export type HeroStats = {
  years: number;
  projects: number;
  technologies: number;
  internships: number;
};

/** Tech chips that float around the portrait. */
const FLOATING_TECH = [
  { label: "React", className: "-left-4 top-10", delay: 0 },
  { label: "Talend", className: "-right-5 top-28", delay: 0.6 },
  { label: "Symfony", className: "-left-6 bottom-28", delay: 1.2 },
  { label: "GraphQL", className: "-right-3 bottom-12", delay: 1.8 },
];

export function HeroSection({ locale, stats }: { locale: Locale; stats: HeroStats }) {
  const { profile, labels } = getPortfolioContent(locale);

  const statItems = [
    { value: stats.years, suffix: labels.stats.experienceSuffix, label: labels.stats.experience },
    { value: stats.projects, suffix: "", label: labels.stats.projects },
    { value: stats.technologies, suffix: "", label: labels.stats.technologies },
    { value: stats.internships, suffix: "", label: labels.stats.internships },
  ];

  return (
    <section id="accueil" className="relative overflow-hidden border-b border-border">
      <Aurora />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-28">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-xl lg:max-w-none">
          <motion.div
            variants={fadeUp}
            className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-medium shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-muted">{profile.availability}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="balance mt-7 text-[clamp(2.4rem,6vw,3.6rem)] font-semibold leading-[1.05] tracking-tight"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 flex flex-wrap items-baseline gap-x-2.5 text-[clamp(1.25rem,3vw,1.9rem)] font-medium tracking-tight text-muted"
          >
            <span>{labels.hero.rolePrefix}</span>
            <RoleRotator roles={profile.roles} />
          </motion.p>

          <motion.p variants={fadeUp} className="pretty mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.slogan}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[color-mix(in_oklch,var(--accent)_35%,transparent)] transition hover:shadow-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent-tertiary to-accent-secondary transition group-hover:brightness-110" />
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-accent-secondary via-accent-tertiary to-accent transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative">{labels.hero.contactCta}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>

            <Magnetic strength={10}>
              <a
                href="#projets"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-accent/45 hover:text-accent"
              >
                {labels.hero.projectsCta}
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" aria-hidden />
              {profile.location}
            </li>
            <li>
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center gap-2 transition hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" aria-hidden />
                {profile.contact.email}
              </a>
            </li>
            <li>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-accent"
              >
                <LinkedInIcon className="h-4 w-4 text-accent" />
                LinkedIn
              </a>
            </li>
          </motion.ul>

          <motion.dl
            variants={fadeUp}
            className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7 border-t border-border pt-9 sm:grid-cols-4"
          >
            {statItems.map((stat) => (
              <div key={stat.label}>
                <dd className="text-gradient text-[clamp(1.6rem,4vw,2.1rem)] font-bold leading-none tracking-tight">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{stat.label}</dt>
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
          <TiltCard tilt={7} className="rounded-[1.75rem]">
            <div className="absolute -inset-[3px] rounded-[1.85rem] bg-gradient-to-br from-accent via-accent-tertiary to-accent-secondary opacity-70 blur-[2px] dark:opacity-55" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-1.5 shadow-2xl shadow-black/20">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-background-subtle">
                <Image
                  src="/portrait.png"
                  alt={`${profile.name} — ${profile.headline}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
              </div>
            </div>
          </TiltCard>

          {/* Entrance is animated on the wrapper; the inner span owns the CSS float
              loop, so the two never fight over the same transform. */}
          {FLOATING_TECH.map((tech) => (
            <motion.span
              key={tech.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + tech.delay * 0.2, type: "spring", stiffness: 300, damping: 22 }}
              className={`pointer-events-none absolute hidden sm:block ${tech.className}`}
            >
              <span
                style={{ animationDelay: `${tech.delay}s` }}
                className="glass block animate-float rounded-full px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg"
              >
                {tech.label}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="relative hidden justify-center pb-10 lg:flex"
      >
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
          <MousePointer2 className="h-3.5 w-3.5 animate-float" aria-hidden />
          {labels.a11y.scrollHint}
        </span>
      </motion.div>
    </section>
  );
}
