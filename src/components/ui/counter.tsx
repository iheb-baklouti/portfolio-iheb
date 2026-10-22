"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up to `to` the first time it scrolls into view.
 *
 * Renders the final value on the server, so the figure is present without
 * JavaScript and for crawlers; the count-up only replaces it once running.
 */
export function Counter({ to, suffix = "", duration = 1.4, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [animatedValue, setAnimatedValue] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setAnimatedValue(Math.round(latest)),
      onComplete: () => setAnimatedValue(to),
    });

    return () => controls.stop();
  }, [inView, to, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {animatedValue ?? to}
      {suffix}
    </span>
  );
}
