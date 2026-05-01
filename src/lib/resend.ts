/**
 * Lightweight Resend REST client.
 *
 * We do NOT depend on the official `resend` npm package — it's a thin
 * wrapper over fetch and pulls in extra runtime overhead. Adding a
 * single contact to an audience is one POST, so we call it directly.
 *
 * Required env (set in Vercel + .env.local):
 *   RESEND_API_KEY        — Resend API key (server-only, never expose)
 *   RESEND_AUDIENCE_ID    — UUID of the Audience to add contacts to
 *
 * Both are optional in code — if either is missing, addContactToAudience
 * returns { ok: false, skipped: true } so the calling endpoint can still
 * persist to Supabase and respond with success to the user. This means
 * we can ship the form before the env vars land in production.
 */

const RESEND_API_BASE = "https://api.resend.com";

export type AddContactResult =
  | { ok: true; resendId: string | null }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped: false; status: number; message: string };

interface ResendContactResponse {
  object?: string;
  id?: string;
  // Resend may also return { name: string, message: string } on errors.
  name?: string;
  message?: string;
}

export async function addContactToAudience(
  email: string,
  options?: { firstName?: string; lastName?: string; unsubscribed?: boolean }
): Promise<AddContactResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey) {
    return { ok: false, skipped: true, reason: "RESEND_API_KEY not set" };
  }
  if (!audienceId) {
    return { ok: false, skipped: true, reason: "RESEND_AUDIENCE_ID not set" };
  }

  try {
    const response = await fetch(
      `${RESEND_API_BASE}/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: options?.firstName,
          last_name: options?.lastName,
          unsubscribed: options?.unsubscribed ?? false,
        }),
      }
    );

    const data = (await response
      .json()
      .catch(() => ({}))) as ResendContactResponse;

    if (!response.ok) {
      // Resend returns 422 if the contact already exists — treat that as
      // success because the goal (contact in audience) is achieved.
      if (response.status === 422) {
        return { ok: true, resendId: null };
      }
      return {
        ok: false,
        skipped: false,
        status: response.status,
        message: data.message ?? `Resend ${response.status}`,
      };
    }

    return { ok: true, resendId: data.id ?? null };
  } catch (err) {
    return {
      ok: false,
      skipped: false,
      status: 0,
      message: err instanceof Error ? err.message : "Network error",
    };
  }
}
