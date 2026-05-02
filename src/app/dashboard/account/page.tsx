import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/features/dashboard/profile-form";
import { BillingStatusCard } from "@/features/billing/billing-status-card";
import { normalizeTier } from "@/lib/plan-limits";

export const metadata: Metadata = {
  title: "Account Settings",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await requireAuth();
  const supabase = await createClient();

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const tier = normalizeTier(profile?.subscription_tier);

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-bold">Account Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your profile, company information, and subscription.
      </p>

      <div className="mt-8 grid max-w-3xl gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Profile
          </h2>
          <ProfileForm
            profile={{
              displayName: profile?.display_name ?? "",
              companyName: profile?.company_name ?? "",
              companyAddress: profile?.company_address ?? "",
              email: user.email ?? "",
              tier,
            }}
          />
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Billing
          </h2>
          <BillingStatusCard
            tier={tier}
            status={subscription?.status ?? null}
            interval={subscription?.interval ?? null}
            currentPeriodEnd={subscription?.current_period_end ?? null}
            cancelAtPeriodEnd={!!subscription?.cancel_at_period_end}
            trialEnd={subscription?.trial_end ?? null}
          />
        </div>
      </div>
    </div>
  );
}
