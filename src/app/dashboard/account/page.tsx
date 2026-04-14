import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/features/dashboard/profile-form";

export const metadata: Metadata = {
  title: "Account Settings",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await requireAuth();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-bold">Account Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your profile and company information. This data is used in your
        labels and CNF filings.
      </p>

      <div className="mt-8 max-w-lg">
        <ProfileForm
          profile={{
            displayName: profile?.display_name ?? "",
            companyName: profile?.company_name ?? "",
            companyAddress: profile?.company_address ?? "",
            email: user.email ?? "",
            tier: profile?.subscription_tier ?? "free",
          }}
        />
      </div>
    </div>
  );
}
