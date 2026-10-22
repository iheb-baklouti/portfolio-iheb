"use client";

import { type ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  reverse?: boolean;
  /** One full loop, in seconds. */
  speed?: number;
  className?: string;
};

/**
 * Infinite horizontal ticker. The item list is rendered twice and translated by
 * -50%, so the seam is invisible. Pauses on hover and stops under reduced motion
 * (handled globally in globals.css).
 */
export function Marquee({ items, reverse = false, speed = 38, className = "" }: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div className={`marquee-mask group relative overflow-hidden ${className}`}>
      <div
        className="flex w-max gap-3 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {sequence.map((item, index) => (
          <span key={index} aria-hidden={index >= items.length} className="shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
