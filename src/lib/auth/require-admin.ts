import { redirect } from "next/navigation";
import { requireAuth } from "./require-auth";

/**
 * Allowlist of email addresses that can access admin-only surfaces
 * (e.g. /dashboard/suppliers/new, supplier-submission moderation).
 *
 * Kept as a hardcoded constant rather than an env var so it's
 * version-controlled — the source of truth for "who is the admin"
 * lives next to the code that checks it. Add additional admins by
 * appending to this list and committing.
 */
const ADMIN_EMAILS = new Set<string>([
  "cenkkarakuz@gmail.com",
]);

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.has(email.toLowerCase());
}

/**
 * Redirects to /dashboard if the logged-in user is not an admin.
 * Use as the first call in a server component for admin-only pages.
 */
export async function requireAdmin() {
  const user = await requireAuth();
  if (!isAdminEmail(user.email)) {
    redirect("/dashboard");
  }
  return user;
}
