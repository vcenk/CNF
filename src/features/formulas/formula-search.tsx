"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FlaskConical } from "lucide-react";

interface FormulaCard {
  id: string;
  name: string;
  product_category: string | null;
  usage_type: string | null;
  target_batch_size_g: number;
  updated_at: string;
  formula_versions?: Array<{ version_number: number; is_current: boolean }>;
}

interface FormulaSearchProps {
  formulas: FormulaCard[];
}

const categories = [
  { value: "", label: "All categories" },
  { value: "skin_care", label: "Skin Care" },
  { value: "hair_care", label: "Hair Care" },
  { value: "body_care", label: "Body Care" },
  { value: "fragrance", label: "Fragrance" },
  { value: "makeup", label: "Makeup" },
  { value: "oral_care", label: "Oral Care" },
];

export function FormulaSearch({ formulas }: FormulaSearchProps) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filtered = useMemo(() => {
    return formulas.filter((f) => {
      const matchesQuery =
        query.trim() === "" ||
        f.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        !categoryFilter || f.product_category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [formulas, query, categoryFilter]);

  if (formulas.length === 0) {
    return null;
  }

  return (
    <>
      {/* Search + filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search formulas by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-border bg-card px-3 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <FlaskConical className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-3 text-muted-foreground">
            No formulas match your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((formula) => {
            const currentVersion = formula.formula_versions?.find((v) => v.is_current);
            return (
              <Link key={formula.id} href={`/formulas/${formula.id}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{formula.name}</CardTitle>
                      {formula.product_category && (
                        <Badge variant="outline" className="text-xs capitalize">
                          {formula.product_category.replace("_", " ")}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="space-y-1">
                      {formula.usage_type && (
                        <span className="block text-xs">
                          {formula.usage_type === "rinse-off"
                            ? "Rinse-off"
                            : "Leave-on"}
                        </span>
                      )}
                      <span className="block text-xs">
                        v{currentVersion?.version_number ?? 1} &middot;{" "}
                        {formula.target_batch_size_g}g batch
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Updated{" "}
                        {new Date(formula.updated_at).toLocaleDateString("en-CA")}
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
