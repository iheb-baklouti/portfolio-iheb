/** Writes a first-party, lax cookie. No-op outside the browser. */
export function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

export const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
