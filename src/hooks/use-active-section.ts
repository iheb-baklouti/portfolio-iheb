"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently under the header.
 *
 * Uses a single IntersectionObserver with a band near the top of the viewport,
 * and keeps the last match so the indicator never blanks out between sections.
 */
export function useActiveSection(ids: string[], offsetPx = 96) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Band just below the sticky header, so a section becomes active as it reaches it.
        rootMargin: `-${offsetPx}px 0px -62% 0px`,
        threshold: 0,
      },
    );

    for (const el of elements) observer.observe(el);

    // Bottom of the page: the last section can never reach the band on short pages.
    function handleScrollEnd() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setActive(ids[ids.length - 1]);
      }
    }

    window.addEventListener("scroll", handleScrollEnd, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, [ids, offsetPx]);

  return active;
}
