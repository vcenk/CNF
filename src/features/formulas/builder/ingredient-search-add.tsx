"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface IngredientSearchAddProps {
  onSelect: (ingredientId: string) => void;
  onClose: () => void;
  existingIds: string[];
}

interface SearchResult {
  id: string;
  inci_name: string;
  common_name: string | null;
  hotlist_status: string;
}

export function IngredientSearchAdd({
  onSelect,
  onClose,
  existingIds,
}: IngredientSearchAddProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const supabase = createClient();

      const { data } = await supabase
        .from("ingredients")
        .select("id, inci_name, common_name, hotlist_status")
        .or(`inci_name.ilike.%${query}%,common_name.ilike.%${query}%`)
        .limit(20);

      setResults(
        (data ?? []).filter((d) => !existingIds.includes(d.id))
      );
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, existingIds]);

  return (
    <div className="rounded-lg border border-brand/30 bg-card p-4 shadow-md">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Search ingredients by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {loading && (
        <p className="mt-3 text-sm text-muted-foreground">Searching...</p>
      )}

      {results.length > 0 && (
        <ul className="mt-3 max-h-60 space-y-1 overflow-y-auto">
          {results.map((r) => (
            <li key={r.id}>
              <button
                onClick={() => onSelect(r.id)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
              >
                <div>
                  <span className="font-medium">
                    {r.common_name || r.inci_name}
                  </span>
                  {r.common_name && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {r.inci_name}
                    </span>
                  )}
                </div>
                {r.hotlist_status !== "not_listed" && (
                  <span className="text-xs text-warning">
                    {r.hotlist_status}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {query.length >= 2 && !loading && results.length === 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          No ingredients found for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}
