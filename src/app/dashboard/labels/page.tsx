import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "My Labels",
  robots: { index: false, follow: false },
};

export default async function LabelsPage() {
  const user = await requireAuth();
  const supabase = await createClient();

  const { data: labels } = await supabase
    .from("label_templates")
    .select("*, formulas!inner(id, name, user_id)")
    .eq("formulas.user_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-bold">My Labels</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Bilingual label templates you have created for your formulas.
      </p>

      {(labels ?? []).length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-border py-12 text-center">
          <Tag className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-3 text-muted-foreground">
            No label templates yet. Create one in the Label tab of any formula.
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
          {(labels ?? []).map((label) => {
            const formula = label.formulas as { id: string; name: string } | null;
            return (
              <Link
                key={label.id}
                href={`/formulas/${formula?.id ?? ""}`}
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium">
                        {label.product_display_name_en || "Untitled"}
                        {label.product_display_name_fr &&
                          ` / ${label.product_display_name_fr}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Formula: {formula?.name ?? "Unknown"} &middot;{" "}
                        {label.company_display_name || "No company set"}
                      </p>
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
