"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/motion";
import { type Locale } from "@/i18n/config";
import { getPortfolioContent } from "@/data/portfolio-content";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Single-open accordion. Answers are always present in the rendered HTML
 * (height animates, content never unmounts), so the full FAQ text stays
 * crawlable regardless of which item is expanded — same reasoning as the
 * role rotator. Pairs with the FAQPage JSON-LD in json-ld.tsx, which needs
 * its answers to match what's actually on the page.
 */
export function FaqSection({ locale }: { locale: Locale }) {
  const { faq, labels } = getPortfolioContent(locale);
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section id="faq" className="relative border-b border-border py-[var(--section-pad)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow={labels.faq.title} title={labels.faq.heading} description={labels.faq.subtitle} />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 space-y-3"
        >
          {faq.map((item, index) => {
            const isOpen = open === index;
            const buttonId = `${baseId}-faq-button-${index}`;
            const panelId = `${baseId}-faq-panel-${index}`;

            return (
              <motion.div
                key={item.question}
                variants={fadeUp}
                className="overflow-hidden rounded-card border border-border bg-card-elevated"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground transition hover:text-accent sm:text-base"
                  >
                    {item.question}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                    </motion.span>
                  </button>
                </h3>

                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-muted sm:text-base">{item.answer}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
