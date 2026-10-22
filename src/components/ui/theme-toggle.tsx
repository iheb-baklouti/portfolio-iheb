"use client";

import { flushSync } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

/** Light / dark switch with an animated icon swap. Renders a stable shell until mounted. */
export function ThemeToggle({ label }: { label: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();

  const isDark = mounted && resolvedTheme === "dark";

  function toggle() {
    const next = isDark ? "light" : "dark";

    // Crossfade the whole document where the View Transitions API is available.
    // flushSync is required so the DOM is updated inside the transition callback.
    const doc = document as Document & { startViewTransition?: (callback: () => void) => unknown };

    if (reduceMotion || typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      onClick={toggle}
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-card-elevated text-foreground shadow-sm transition hover:border-accent/45 hover:shadow-md"
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-accent/10 transition-transform duration-300 group-hover:scale-100" />
      <AnimatePresence mode="wait" initial={false}>
        {!mounted ? (
          <motion.span key="placeholder" className="relative">
            <Moon className="h-4 w-4 opacity-30" />
          </motion.span>
        ) : isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            className="relative"
          >
            <Sun className="h-4 w-4 text-accent-secondary" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            className="relative"
          >
            <Moon className="h-4 w-4 text-accent" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
