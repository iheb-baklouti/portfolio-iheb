import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `script-src 'self' 'unsafe-inline' ${isProd ? "" : "'unsafe-eval'"} https://www.googletagmanager.com https://www.google-analytics.com`,
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com ws: wss:",
  "style-src 'self' 'unsafe-inline'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    const securityHeaders = [
      { key: "Content-Security-Policy", value: cspDirectives },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      ...(isProd
        ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }]
        : []),
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
