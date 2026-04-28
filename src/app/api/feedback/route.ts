import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ROLES = [
  "just_starting",
  "hobby",
  "side_business",
  "full_time",
  "consulting",
  "retailer",
  "other",
] as const;

const KNOWN_EXPECTATIONS = [
  "pdf_label_export",
  "french_translation_help",
  "multiple_brands",
  "batch_records",
  "team_collaboration",
  "stripe_billing",
  "etsy_shopify_integration",
  "mobile_app",
  "wholesale_orders",
  "insurance_referrals",
] as const;

interface FeedbackRequest {
  email?: string;
  role?: string;
  message?: string;
  expectations?: string[];
  source?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FeedbackRequest;

    const message = (body.message ?? "").trim();
    if (!message) {
      return NextResponse.json(
        { error: "Please write a short message." },
        { status: 400 }
      );
    }
    if (message.length > 4000) {
      return NextResponse.json(
        { error: "Message is too long. Keep it under 4000 characters." },
        { status: 400 }
      );
    }

    const email = (body.email ?? "").trim().toLowerCase();
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email is too long." },
        { status: 400 }
      );
    }

    const role = body.role && ROLES.includes(body.role as (typeof ROLES)[number])
      ? body.role
      : null;

    const expectations = Array.isArray(body.expectations)
      ? body.expectations.filter((e) =>
          KNOWN_EXPECTATIONS.includes(e as (typeof KNOWN_EXPECTATIONS)[number])
        )
      : [];

    const source = (body.source ?? "feedback_page").trim().slice(0, 120) || "feedback_page";

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("user_feedback").insert({
      email: email || null,
      role,
      message,
      expectations: expectations.length > 0 ? expectations : null,
      source,
      user_id: user?.id ?? null,
    });

    if (error) {
      console.error("Feedback insert error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        {
          error:
            "Could not save your feedback right now. Please try again, or email support@formulanorth.com.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback route error:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ error: "Request failed." }, { status: 500 });
  }
}
