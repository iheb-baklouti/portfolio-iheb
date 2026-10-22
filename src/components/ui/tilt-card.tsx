"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  tilt?: number;
  /** Adds a cursor-following highlight on top of the card. */
  glare?: boolean;
};

/**
 * Card that tilts in 3D toward the pointer and tracks a soft highlight.
 * Falls back to a plain static card for touch input and reduced motion.
 */
export function TiltCard({ children, className = "", tilt = 6, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 180, damping: 26 });

  const glareBackground = useMotionTemplate`radial-gradient(240px circle at ${glareX}% ${glareY}%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 70%)`;

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * tilt * 2);
    rotateX.set((0.5 - py) * tilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      {glare ? (
        <motion.span
          aria-hidden
          style={{ background: glareBackground, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      ) : null}
    </motion.div>
  );
}
