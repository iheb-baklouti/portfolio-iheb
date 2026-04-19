"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";

export type ContactState =
  | { ok: true; message: string }
  | { ok: false; message: string }
  | null;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 4000;
const MIN_FORM_FILL_MS = 2000;

type RateEntry = { count: number; expiresAt: number };
const rateLimitStore = new Map<string, RateEntry>();

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeOrigin(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function getClientIp(headerStore: Headers) {
  const forwardedFor = headerStore.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  return headerStore.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string, now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.expiresAt <= now) rateLimitStore.delete(key);
  }

  const current = rateLimitStore.get(ip);
  if (!current || current.expiresAt <= now) {
    rateLimitStore.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  current.count += 1;
  return false;
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const headerStore = await headers();
  const now = Date.now();
  const origin = normalizeOrigin(headerStore.get("origin") ?? "");
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "";
  const proto = headerStore.get("x-forwarded-proto") ?? "https";
  const expectedOrigin = normalizeOrigin(process.env.ALLOWED_ORIGIN ?? `${proto}://${host}`);
  const clientIp = getClientIp(headerStore);

  // Basic origin validation to reduce cross-site request forgery risk.
  if (origin && expectedOrigin && origin !== expectedOrigin) {
    return { ok: false, message: "Origine de requête invalide." };
  }

  if (isRateLimited(clientIp, now)) {
    return {
      ok: false,
      message: "Trop de tentatives. Réessayez dans quelques minutes.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const formStartedAt = Number(formData.get("formStartedAt") ?? 0);

  // Honeypot field: should remain empty for humans.
  if (website) {
    return { ok: true, message: "Message envoyé avec succès. Je reviens vers vous rapidement." };
  }

  // Bots often submit forms instantly.
  if (!Number.isFinite(formStartedAt) || now - formStartedAt < MIN_FORM_FILL_MS || now - formStartedAt > 2 * 60 * 60 * 1000) {
    return { ok: false, message: "Validation anti-spam refusée. Merci de réessayer." };
  }

  if (!name || name.length < 2) {
    return { ok: false, message: "Indiquez un nom valide." };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false, message: "Nom trop long." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, message: "Indiquez une adresse e-mail valide." };
  }
  if (!subject || subject.length < 3) {
    return { ok: false, message: "Indiquez un objet valide (au moins 3 caractères)." };
  }
  if (subject.length > MAX_SUBJECT_LENGTH) {
    return { ok: false, message: "Objet trop long." };
  }
  if (!message || message.length < 10) {
    return { ok: false, message: "Votre message doit contenir au moins 10 caractères." };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, message: "Message trop long." };
  }

  const gmailUser = process.env.GMAIL_SMTP_USER;
  const gmailPass = process.env.GMAIL_SMTP_APP_PASSWORD;
  const recipient = process.env.CONTACT_RECEIVER_EMAIL ?? "iheb.baklouti@polytechnicien.tn";

  if (!gmailUser || !gmailPass) {
    return {
      ok: false,
      message:
        "Configuration e-mail manquante. Ajoutez GMAIL_SMTP_USER et GMAIL_SMTP_APP_PASSWORD dans les variables d'environnement.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const fullSubject = `[Portfolio] ${subject}`;
    const text = [
      "Nouveau message depuis le formulaire portfolio",
      "",
      `Nom: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      "---",
      "Source: https://iheb-baklouti.vercel.app/",
    ].join("\n");

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
    const currentYear = new Date().getFullYear();

    const html = `
      <!doctype html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${safeSubject}</title>
        </head>
        <body style="margin:0;padding:0;background:#f4f4f9;font-family:Arial,Helvetica,sans-serif;color:#171717;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f9;padding:24px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ececf3;">
                  <tr>
                    <td style="padding:24px 28px;background:linear-gradient(135deg,#4f46e5,#7c3aed 60%,#d946ef);color:#ffffff;">
                      <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.9;">Nouveau lead portfolio</p>
                      <h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;font-weight:700;">${safeSubject}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px 28px;">
                      <p style="margin:0 0 14px;font-size:15px;color:#4b5563;">Vous avez reçu un nouveau message depuis le formulaire de contact.</p>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 10px;">
                        <tr>
                          <td style="width:110px;font-size:13px;font-weight:700;color:#6b7280;">Nom</td>
                          <td style="font-size:14px;color:#111827;">${safeName}</td>
                        </tr>
                        <tr>
                          <td style="width:110px;font-size:13px;font-weight:700;color:#6b7280;">Email</td>
                          <td style="font-size:14px;">
                            <a href="mailto:${safeEmail}" style="color:#4338ca;text-decoration:none;">${safeEmail}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="width:110px;font-size:13px;font-weight:700;color:#6b7280;">Objet</td>
                          <td style="font-size:14px;color:#111827;">${safeSubject}</td>
                        </tr>
                      </table>

                      <div style="margin-top:18px;padding:16px 18px;border:1px solid #e5e7eb;border-radius:12px;background:#fafafa;">
                        <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;">Message</p>
                        <p style="margin:0;font-size:15px;line-height:1.7;color:#111827;">${safeMessage}</p>
                      </div>

                      <div style="margin-top:18px;">
                        <a href="mailto:${safeEmail}" style="display:inline-block;padding:10px 16px;border-radius:10px;background:#4f46e5;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Répondre au contact</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 28px 22px;border-top:1px solid #f0f0f3;color:#6b7280;font-size:12px;">
                      Source: <a href="https://iheb-baklouti.vercel.app/" style="color:#4f46e5;text-decoration:none;">iheb-baklouti.vercel.app</a><br/>
                      © ${currentYear} Iheb Baklouti
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Portfolio Iheb" <${gmailUser}>`,
      to: recipient,
      replyTo: email,
      subject: fullSubject,
      text,
      html,
    });

    return { ok: true, message: "Message envoyé avec succès. Je reviens vers vous rapidement." };
  } catch {
    return {
      ok: false,
      message: "Échec d'envoi e-mail. Vérifiez les identifiants Gmail (App Password) et réessayez.",
    };
  }
}
