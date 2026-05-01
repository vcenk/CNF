import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { addContactToAudience } from "@/lib/resend";

interface NewsletterRequest {
  email?: string;
  source?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as NewsletterRequest;
    const email = (body.email ?? "").trim().toLowerCase();
    const source = (body.source ?? "footer").trim().slice(0, 120) || "footer";

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!isValidEmail(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 1. Persist to Supabase first — this is our source of truth.
    //    Vendor-portable: if we ever leave Resend, the list lives here.
    const supabase = await createClient();
    const { error } = await supabase.from("email_subscribers").upsert(
      {
        email,
        source: `newsletter:${source}`,
        subscribed_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    if (error) {
      console.error("Newsletter Supabase upsert error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        {
          error:
            "Could not save your email right now. Please try again in a moment.",
        },
        { status: 500 }
      );
    }

    // 2. Side-effect: push to Resend audience.
    //    Failure here is non-fatal — the user is already saved in Supabase
    //    and we can re-sync to Resend manually later if needed.
    const resendResult = await addContactToAudience(email);
    if (!resendResult.ok && !resendResult.skipped) {
      console.error("Newsletter Resend push failed:", {
        email,
        status: resendResult.status,
        message: resendResult.message,
      });
      // Still return success to the user — we have their email.
    } else if (!resendResult.ok && resendResult.skipped) {
      console.warn(
        `Newsletter Resend push skipped (${resendResult.reason}) — Supabase save succeeded.`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter route error:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ error: "Request failed." }, { status: 500 });
  }
}
