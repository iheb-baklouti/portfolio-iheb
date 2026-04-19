"use client";

import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Globe } from "lucide-react";
import { profile } from "@/data/cv";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ContactSection() {
  const handleSendMail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = `[Portfolio] Mission freelance - ${name}`;
    const body = [
      "Bonjour Iheb,",
      "",
      "Je vous contacte depuis votre portfolio.",
      "",
      `Nom: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      "---",
      "Envoye via https://iheb-baklouti.vercel.app/",
    ].join("\n");

    const mailtoUrl = `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank", "noopener,noreferrer");
  };

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
            onSubmit={handleSendMail}
            className="rounded-2xl border border-border bg-card-elevated p-6 shadow-xl shadow-indigo-950/5 sm:p-8 dark:bg-card dark:shadow-black/40"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">Nom</span>
                <input
                  name="name"
                  required
                  minLength={2}
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
                  minLength={10}
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/25"
                  placeholder="Décrivez votre besoin, délais, stack…"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 dark:from-indigo-500 dark:via-violet-500 dark:to-fuchsia-500 sm:w-auto"
            >
              Envoyer l'e-mail
              <Send className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-muted">
              Un nouvel onglet ouvre votre messagerie avec l'objet et le message deja prets a envoyer.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
