import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VALID_TIERS = ["maker", "studio", "business", "general"] as const;
type WaitlistTier = (typeof VALID_TIERS)[number];

interface WaitlistRequest {
  email?: string;
  tier?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistRequest;
    const email = (body.email ?? "").trim().toLowerCase();
    const tier = (body.tier ?? "general").trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!VALID_TIERS.includes(tier as WaitlistTier)) {
      return NextResponse.json(
        { error: "Invalid plan." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const source = `waitlist:${tier}`;

    const { error } = await supabase.from("email_subscribers").upsert(
      {
        email,
        source,
        subscribed_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    if (error) {
      console.error("Waitlist upsert error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        {
          error:
            "Could not save your email right now. Please try again, or send a note via the contact page.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, tier });
  } catch (err) {
    console.error("Waitlist route error:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ error: "Request failed." }, { status: 500 });
  }
}
