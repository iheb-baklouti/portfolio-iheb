"use server";

export type ContactState =
  | { ok: true; message: string; mailto: string }
  | { ok: false; message: string }
  | null;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length < 2) {
    return { ok: false, message: "Indiquez un nom valide." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, message: "Indiquez une adresse e-mail valide." };
  }
  if (!message || message.length < 10) {
    return { ok: false, message: "Votre message doit contenir au moins 10 caractères." };
  }

  const subject = encodeURIComponent(`[Portfolio] Message de ${name}`);
  const body = encodeURIComponent(`${message}\n\n---\n${email}`);
  return {
    ok: true,
    message:
      "Merci ! Ouvrez votre messagerie pour envoyer le message prérempli, ou contactez-moi directement.",
    mailto: `mailto:iheb.baklouti@polytechnicien.tn?subject=${subject}&body=${body}`,
  };
}
