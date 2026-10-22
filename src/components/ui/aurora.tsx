/** Decorative animated gradient blobs + film grain used behind sections. */
export function Aurora({ variant = "hero" }: { variant?: "hero" | "soft" }) {
  if (variant === "soft") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[var(--glow)] blur-[110px] animate-aurora-c" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[var(--glow-warm)] blur-[110px] animate-aurora-b" />
        <div className="noise absolute inset-0" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-70" />
      <div className="absolute -left-[18%] -top-[28%] h-[min(92vw,560px)] w-[min(92vw,560px)] rounded-full bg-[var(--glow)] blur-[110px] animate-aurora-a" />
      <div className="absolute -right-[14%] top-[6%] h-[min(82vw,460px)] w-[min(82vw,460px)] rounded-full bg-[var(--glow-warm)] blur-[120px] animate-aurora-b" />
      <div className="absolute bottom-[-24%] left-[22%] h-[min(74vw,420px)] w-[min(74vw,420px)] rounded-full bg-[var(--glow-pink)] blur-[100px] animate-aurora-c" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_92%)]" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
