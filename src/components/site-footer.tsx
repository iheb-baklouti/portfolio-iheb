import { profile } from "@/data/cv";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card/50 py-12 text-sm text-muted dark:bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="font-semibold text-foreground">
            © {year} {profile.name}
          </p>
          <p className="mt-1 max-w-md">Ingénieur génie informatique — Full Stack & Data.</p>
        </div>
        <a
          href={profile.contact.linkedin}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card-elevated px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/40 dark:bg-card"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
