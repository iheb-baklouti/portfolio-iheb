import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE, isLocale, locales, negotiateLocale } from "@/i18n/config";

/**
 * Sends locale-less URLs to a localized one.
 *
 * Priority: an explicit choice stored in the cookie, then the browser's
 * `Accept-Language`, then the default locale.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return NextResponse.next();

  const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    preferred && isLocale(preferred) ? preferred : negotiateLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, metadata routes and files with an extension.
  matcher: ["/((?!_next/|api/|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|.*\\.[\\w]+$).*)"],
};
