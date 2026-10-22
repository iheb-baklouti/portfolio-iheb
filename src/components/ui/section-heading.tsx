"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/** Shared eyebrow + title + description block used at the top of every section. */
export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}
    >
      <motion.span
        variants={fadeUp}
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-card-elevated/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur ${
          centered ? "mx-auto" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="balance mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p variants={fadeUp} className="pretty mt-4 text-lg leading-relaxed text-muted">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
