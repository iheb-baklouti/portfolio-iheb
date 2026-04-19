"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, ExternalLink, Globe } from "lucide-react";
import { profile } from "@/data/cv";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ContactSection() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, null);

  return (
    <section id="contact" className="relative py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--glow)]/30 to-transparent dark:from-violet-600/10" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-14 lg:grid-cols-[1fr_1.05fr]"
        >
          <motion.div variants={fadeUp}>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Parlons de votre projet
            </h2>
            <p className="mt-5 text-lg text-muted">
              {profile.availability} Réponse sous 24–48h en semaine.
            </p>

            <ul className="mt-10 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="group inline-flex w-full max-w-md items-center gap-3 rounded-2xl border border-border bg-card-elevated px-4 py-3.5 font-semibold text-foreground shadow-sm transition hover:border-accent/40 hover:shadow-md dark:bg-card"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-amber-500/15 text-indigo-700 transition group-hover:from-indigo-500/25 group-hover:to-amber-500/25 dark:text-indigo-200">
                    <Mail className="h-4 w-4" />
                  </span>
                  {profile.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.contact.phone.replace(/\s/g, "")}`}
                  className="group inline-flex w-full max-w-md items-center gap-3 rounded-2xl border border-border bg-card-elevated px-4 py-3.5 font-semibold text-foreground shadow-sm transition hover:border-accent/40 hover:shadow-md dark:bg-card"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-amber-500/15 text-indigo-700 transition group-hover:from-indigo-500/25 group-hover:to-amber-500/25 dark:text-indigo-200">
                    <Phone className="h-4 w-4" />
                  </span>
                  {profile.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-full max-w-md items-center gap-3 rounded-2xl border border-border bg-card-elevated px-4 py-3.5 font-semibold text-foreground shadow-sm transition hover:border-accent/40 hover:shadow-md dark:bg-card"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-amber-500/15 text-indigo-700 transition group-hover:from-indigo-500/25 group-hover:to-amber-500/25 dark:text-indigo-200">
                    <Globe className="h-4 w-4" />
                  </span>
                  Profil LinkedIn
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.form
            variants={fadeUp}
            action={formAction}
            className="rounded-2xl border border-border bg-card-elevated p-6 shadow-xl shadow-indigo-950/5 sm:p-8 dark:bg-card dark:shadow-black/40"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">Nom</span>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25"
                  placeholder="Votre nom"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">E-mail</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25"
                  placeholder="vous@exemple.com"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25"
                  placeholder="Décrivez votre besoin, délais, stack…"
                />
              </label>
            </div>

            {state && !state.ok && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
                {state.message}
              </p>
            )}
            {state?.ok && (
              <div className="mt-4 space-y-3 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4 text-sm text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-50">
                <p role="status">{state.message}</p>
                <a
                  href={state.mailto}
                  className="inline-flex items-center gap-2 font-bold text-emerald-800 underline-offset-4 hover:underline dark:text-emerald-100"
                >
                  Ouvrir la messagerie
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 dark:from-indigo-500 dark:via-violet-500 dark:to-fuchsia-500 sm:w-auto"
            >
              {pending ? "Vérification…" : "Valider & préparer l’e-mail"}
              <Send className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-muted">
              Après validation, un lien ouvre votre messagerie avec un message prérempli (aucun envoi serveur sans
              configuration SMTP / API).
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
