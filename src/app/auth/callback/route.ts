import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Validate the `next` query parameter to prevent open-redirect.
 *
 * Accepts only same-origin paths starting with a single "/". Rejects:
 *   - Empty / whitespace
 *   - "//evil.com"        (protocol-relative URL — browser treats as off-site)
 *   - "/\\evil.com"       (backslash trick)
 *   - "https://evil.com"  (absolute URL with scheme)
 *   - Anything not starting with "/"
 *
 * Returns the safe path or the default "/formulas".
 */
function safeNextPath(raw: string | null): string {
  const fallback = "/formulas";
  if (!raw) return fallback;
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.length > 200) return fallback;
  if (!trimmed.startsWith("/")) return fallback;
  if (trimmed.startsWith("//")) return fallback;
  if (trimmed.startsWith("/\\")) return fallback;
  if (/^\/+\w+:/.test(trimmed)) return fallback;
  return trimmed;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth`);
}
