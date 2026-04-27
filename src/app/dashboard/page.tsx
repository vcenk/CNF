import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import {
  FlaskConical,
  Tag,
  FileOutput,
  Plus,
  ArrowRight,
  Search,
  ShoppingBag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await requireAuth();
  const supabase = await createClient();

  // Fetch stats in parallel
  const [
    { data: profile },
    { count: formulaCount },
    { count: labelCount },
    { count: submissionCount },
    { data: recentFormulas },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("formulas")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_archived", false),
    supabase
      .from("label_templates")
      .select("*, formulas!inner(user_id)", { count: "exact", head: true })
      .eq("formulas.user_id", user.id),
    supabase
      .from("cnf_submissions")
      .select("*, formulas!inner(user_id)", { count: "exact", head: true })
      .eq("formulas.user_id", user.id),
    supabase
      .from("formulas")
      .select("id, name, product_category, updated_at")
      .eq("user_id", user.id)
      .eq("is_archived", false)
      .order("updated_at", { ascending: false })
      .limit(5),
  ]);

  const displayName = profile?.display_name || user.email?.split("@")[0] || "Maker";
  const tier = profile?.subscription_tier ?? "free";

  const stats = [
    {
      label: "Formulas",
      value: formulaCount ?? 0,
      icon: FlaskConical,
      href: "/formulas",
    },
    {
      label: "Labels",
      value: labelCount ?? 0,
      icon: Tag,
      href: "/dashboard/labels",
    },
    {
      label: "CNF Filings",
      value: submissionCount ?? 0,
      icon: FileOutput,
      href: "/dashboard/filings",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">
          Welcome back, {displayName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Plan:{" "}
          <span className="font-medium capitalize text-brand">{tier}</span>
          {tier === "free" && (
            <>
              {" "}
              &middot;{" "}
              <Link href="/pricing" className="text-brand underline hover:text-brand-dark">
                Upgrade
              </Link>
            </>
          )}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-lg bg-brand/10 p-2.5">
                  <stat.icon className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Quick actions
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/formulas"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand"
          >
            <Plus className="h-5 w-5 text-brand" />
            <span className="text-sm font-medium">New formula</span>
          </Link>
          <Link
            href="/ingredients"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand"
          >
            <Search className="h-5 w-5 text-brand" />
            <span className="text-sm font-medium">Search ingredients</span>
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand"
          >
            <ShoppingBag className="h-5 w-5 text-brand" />
            <span className="text-sm font-medium">Browse shop</span>
          </Link>
          <Link
            href="/dashboard/account"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand"
          >
            <Tag className="h-5 w-5 text-brand" />
            <span className="text-sm font-medium">Account settings</span>
          </Link>
        </div>
      </div>

      {/* Recent formulas */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Recent formulas
          </h2>
          <Link
            href="/formulas"
            className="flex items-center gap-1 text-sm text-brand hover:text-brand-dark"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {(recentFormulas ?? []).length === 0 ? (
          <Card className="mt-3">
            <CardContent className="py-10 text-center">
              <FlaskConical className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm text-muted-foreground">
                No formulas yet. Create your first one to get started.
              </p>
              <Link
                href="/formulas"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
              >
                <Plus className="h-4 w-4" />
                Create formula
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-3 space-y-2">
            {(recentFormulas ?? []).map((formula) => (
              <Link
                key={formula.id}
                href={`/formulas/${formula.id}`}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand"
              >
                <div>
                  <p className="text-sm font-medium">{formula.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formula.product_category
                      ? (formula.product_category as string).replace("_", " ")
                      : "No category"}{" "}
                    &middot; Updated{" "}
                    {new Date(formula.updated_at).toLocaleDateString("en-CA")}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
