"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface IngredientFiltersProps {
  functions: { slug: string; name: string }[];
}

export function IngredientFilters({ functions }: IngredientFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentFunction = searchParams.get("fn") ?? "";
  const currentHotlist = searchParams.get("hotlist") ?? "all";

  function updateFilter(key: string, val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set(key, val);
    } else {
      params.delete(key);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/ingredients?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={currentFunction}
        onChange={(e) => updateFilter("fn", e.target.value)}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm"
      >
        <option value="">All functions</option>
        {functions.map((fn) => (
          <option key={fn.slug} value={fn.slug}>
            {fn.name}
          </option>
        ))}
      </select>

      <select
        value={currentHotlist}
        onChange={(e) => updateFilter("hotlist", e.target.value)}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm"
      >
        <option value="all">All hotlist status</option>
        <option value="not_listed">Safe (not listed)</option>
        <option value="restricted">Restricted</option>
        <option value="prohibited">Prohibited</option>
      </select>
    </div>
  );
}
