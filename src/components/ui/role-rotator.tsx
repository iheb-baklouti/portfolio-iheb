"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Cycles through role titles with a vertical swap, one every `interval` ms.
 *
 * Every role stays mounted at all times — only its opacity/position animates —
 * instead of unmounting the inactive ones. Two reasons: it's the standard
 * ARIA carousel pattern (inactive panels stay in the DOM, `aria-hidden` just
 * keeps screen readers from announcing them), and it means search engines see
 * the full list of roles in the rendered HTML, not only whichever one happens
 * to be showing when the page is crawled.
 */
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

      {roles.map((role, i) => (
        <motion.span
          key={role}
          initial={false}
          animate={
            i === index
              ? { y: "0%", opacity: 1 }
              : { y: i < index ? "-100%" : "100%", opacity: 0 }
          }
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={i !== index}
          className="absolute inset-0 whitespace-nowrap text-gradient"
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
}
