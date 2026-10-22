"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Cycles through role titles with a vertical swap, one every `interval` ms. */
export function RoleRotator({ roles, interval = 2600 }: { roles: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || roles.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), interval);
    return () => window.clearInterval(id);
  }, [roles.length, interval, reduceMotion]);

  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      {/* Reserves the widest possible width so the line never reflows mid-swap. */}
      <span aria-hidden className="pointer-events-none invisible block whitespace-nowrap">
        {roles.reduce((longest, role) => (role.length > longest.length ? role : longest), "")}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 whitespace-nowrap text-gradient"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
