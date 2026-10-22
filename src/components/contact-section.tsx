"use client";

import { useActionState, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Clock3, Loader2 } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { fadeUp, slideInRight, staggerContainer, viewportOnce } from "@/lib/motion";
import { type Locale } from "@/i18n/config";
import { getPortfolioContent } from "@/data/portfolio-content";
import { Magnetic } from "@/components/ui/magnetic";
import { SectionHeading } from "@/components/ui/section-heading";

const MAX_MESSAGE_LENGTH = 4000;

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-faint focus:border-accent/50 focus:ring-2 focus:ring-[var(--ring)]";

export function ContactSection({ locale }: { locale: Locale }) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, null);
  const { profile, labels } = getPortfolioContent(locale);
  const [messageLength, setMessageLength] = useState(0);

  // After a server action resolves, the browser natively resets the <form> —
  // clearing every field, including hidden ones, back to their defaultValue.
  // The character counter needs to resync with that reset or it goes stale;
  // this is React's documented "adjust state during render" pattern (not an
  // effect), so it applies before paint instead of causing an extra render.
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    setMessageLength(0);
  }

  // Captured once, the first time this component renders — `useState`'s lazy
  // initializer is the one place React guarantees an impure call like
  // `Date.now()` runs exactly once, unlike `useRef(Date.now())`, which the
  // compiler flags because it would otherwise re-evaluate on every render.
  // Never re-read after that, so a form reset can't touch it. Stamped into
  // the hidden field at submit time via onSubmit below, which also sidesteps
  // the reset: a mount-only effect would only stamp once, and every attempt
  // after the first would submit with an already-cleared (empty-string)
  // field, which the server reads as timestamp 0 and permanently rejects.
  const [formSessionStart] = useState(() => Date.now());
  const formStartedAtRef = useRef<HTMLInputElement>(null);

  const channels = [
    { icon: Mail, label: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { icon: Phone, label: profile.contact.phone, href: `tel:${profile.contact.phone.replace(/\s/g, "")}` },
    { icon: LinkedInIcon, label: "LinkedIn", href: profile.contact.linkedin, external: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-[var(--section-pad)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[var(--glow)] to-transparent opacity-50"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <SectionHeading
              eyebrow={labels.contact.title}
              title={labels.contact.subtitle}
              description={profile.availability}
            />

            <motion.ul variants={staggerContainer} className="mt-10 space-y-3">
              {channels.map(({ icon: Icon, label, href, external }) => (
                <motion.li key={label} variants={fadeUp}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex w-full max-w-md items-center gap-3.5 rounded-card border border-border bg-card-elevated px-4 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-md"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/18 to-accent-secondary/18 text-accent transition group-hover:from-accent/30 group-hover:to-accent-secondary/30">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="truncate">{label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p variants={fadeUp} className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
              <Clock3 className="h-4 w-4 text-accent" aria-hidden />
              {labels.contact.responseTime}
            </motion.p>
          </motion.div>

          <motion.form
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            action={formAction}
            onSubmit={() => {
              if (formStartedAtRef.current) formStartedAtRef.current.value = String(formSessionStart);
            }}
            className="rounded-card border border-border bg-card-elevated p-6 shadow-xl shadow-black/5 sm:p-8 dark:shadow-black/30"
          >
            <input type="hidden" name="locale" value={locale} />
            <input ref={formStartedAtRef} type="hidden" name="formStartedAt" />
            {/* Honeypot: hidden from humans, usually filled by bots. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid gap-5">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">{labels.contact.name}</span>
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className={fieldClass}
                  placeholder={labels.contact.namePlaceholder}
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">{labels.contact.email}</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={fieldClass}
                  placeholder={labels.contact.emailPlaceholder}
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">{labels.contact.subject}</span>
                <input
                  name="subject"
                  required
                  minLength={3}
                  maxLength={160}
                  className={fieldClass}
                  placeholder={labels.contact.subjectPlaceholder}
                />
              </label>

              <label className="block">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted">
                    {labels.contact.message}
                  </span>
                  <span className="font-mono text-[11px] text-faint">
                    {MAX_MESSAGE_LENGTH - messageLength} {labels.contact.charactersLeft}
                  </span>
                </span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={MAX_MESSAGE_LENGTH}
                  rows={5}
                  onChange={(event) => setMessageLength(event.target.value.length)}
                  className={`${fieldClass} resize-y`}
                  placeholder={labels.contact.messagePlaceholder}
                />
              </label>
            </div>

            <AnimatePresence mode="wait">
              {state ? (
                <motion.div
                  key={state.ok ? "ok" : "error"}
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  role="status"
                  aria-live="polite"
                  className="overflow-hidden"
                >
                  <div
                    className={`mt-5 inline-flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-sm ${
                      state.ok
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                        : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {state.ok ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    )}
                    <span>{state.message}</span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <Magnetic strength={8} className="mt-8 inline-flex w-full sm:w-auto">
              <button
                type="submit"
                disabled={pending}
                className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[color-mix(in_oklch,var(--accent)_32%,transparent)] transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent-tertiary to-accent-secondary transition group-hover:brightness-110" />
                <span className="relative">{pending ? labels.contact.sending : labels.contact.send}</span>
                {pending ? (
                  <Loader2 className="relative h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                )}
              </button>
            </Magnetic>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
