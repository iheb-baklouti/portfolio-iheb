import type { Transition, Variants } from "framer-motion";

export const springSnappy: Transition = { type: "spring", stiffness: 420, damping: 30, mass: 0.85 };
export const springSoft: Transition = { type: "spring", stiffness: 280, damping: 32 };
export const springBouncy: Transition = { type: "spring", stiffness: 360, damping: 20 };
export const easeOutExpo: Transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

/** Shared `whileInView` config so every section reveals at the same scroll offset. */
export const viewportOnce = { once: true, margin: "-80px 0px -80px 0px" } as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.045 },
  },
};

/*
 * Reveals animate opacity and transform only. Animating `filter: blur()`
 * looked nice but forces an offscreen re-render per frame, and the page has
 * ~60 reveal targets — enough to stall the compositor on mid-range hardware.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: springSnappy },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: springSnappy },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: springSoft },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: springSoft },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: springSoft },
};

/** Card entrance used by the project / skill grids. */
export const popCard: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: springSoft },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
};
