"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Compétences" },
  { href: "#contact", label: "Contact" },
];

const menuList = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const menuItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 380, damping: 28 } },
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
        <Link
          href="#accueil"
          className="group relative text-sm font-bold tracking-tight text-foreground"
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent transition group-hover:from-indigo-600 group-hover:to-violet-600 dark:group-hover:from-indigo-300 dark:group-hover:to-fuchsia-300">
            Iheb Baklouti
          </span>
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-indigo-500 to-amber-500 transition-all duration-300 group-hover:w-full" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted transition hover:text-foreground"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 scale-90 rounded-full bg-foreground/[0.04] opacity-0 transition hover:scale-100 hover:opacity-100 dark:bg-white/[0.06]" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Basculer le thème"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-elevated text-foreground shadow-sm transition hover:border-accent/35 hover:shadow-md dark:bg-card"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {!mounted ? (
              <Moon className="h-4 w-4 opacity-40" />
            ) : isDark ? (
              <Sun className="h-4 w-4 text-amber-300" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600" />
            )}
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-elevated text-foreground shadow-sm md:hidden dark:bg-card"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.div
              variants={menuList}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-1 px-4 py-4"
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  variants={menuItem}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-card hover:shadow-sm"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
