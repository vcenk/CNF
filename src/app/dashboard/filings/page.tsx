import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileOutput, ArrowRight } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "border-muted text-muted-foreground",
  validated: "border-brand/30 text-brand",
  exported: "border-brand/30 text-brand",
  submitted: "border-warning/30 text-warning",
  accepted: "border-success/30 text-success",
  rejected: "border-destructive/30 text-destructive",
};

export const metadata: Metadata = {
  title: "CNF Filings",
  robots: { index: false, follow: false },
};

export default async function FilingsPage() {
  const user = await requireAuth();
  const supabase = await createClient();

  const { data: submissions } = await supabase
    .from("cnf_submissions")
    .select("*, formulas!inner(id, name, user_id), formula_versions(version_number)")
    .eq("formulas.user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-bold">CNF Filings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Track your Health Canada Cosmetic Notification Form submissions.
      </p>

      {(submissions ?? []).length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-border py-12 text-center">
          <FileOutput className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-3 text-muted-foreground">
            No CNF filings yet. Complete the Export checklist in any formula to
            generate your first submission.
          </p>
          <Link
            href="/formulas"
            className="mt-3 inline-block text-sm text-brand underline"
          >
            Go to formulas
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {(submissions ?? []).map((sub) => {
            const formula = sub.formulas as { id: string; name: string } | null;
            const version = sub.formula_versions as { version_number: number } | null;
            return (
              <Link key={sub.id} href={`/formulas/${formula?.id ?? ""}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={`capitalize ${statusColors[sub.status] ?? ""}`}
                      >
                        {sub.status}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">
                          {formula?.name ?? "Unknown formula"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          v{version?.version_number ?? "?"} &middot;{" "}
                          {new Date(sub.created_at).toLocaleDateString("en-CA")}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
