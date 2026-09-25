import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/blog/fragrance-allergen-rules-2026") {
    const source = request.nextUrl.searchParams.get("source");

    if (source === "label-guide" || source === "cnf-guide") {
      const canonicalUrl = request.nextUrl.clone();
      canonicalUrl.searchParams.delete("source");

      return NextResponse.redirect(canonicalUrl, 308);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
