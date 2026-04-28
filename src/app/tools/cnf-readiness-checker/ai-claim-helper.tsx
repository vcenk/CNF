"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Check } from "lucide-react";

interface AiClaimHelperProps {
  claims: string;
  productName?: string;
  productCategory?: string;
  usageType?: string;
}

interface RewriteResult {
  alternatives: string[];
  whyRisky: string;
  caveat: string;
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok"; result: RewriteResult }
  | { kind: "error"; message: string };

export function AiClaimHelper({
  claims,
  productName,
  productCategory,
  usageType,
}: AiClaimHelperProps) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!claims.trim()) return null;

  const run = async () => {
    setState({ kind: "loading" });
    try {
      const r = await fetch("/api/ai/rewrite-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claims, productName, productCategory, usageType }),
      });

      if (!r.ok) {
        const data = (await r.json().catch(() => ({}))) as { error?: string };
        setState({ kind: "error", message: data.error || `Request failed (${r.status})` });
        return;
      }

      const data = (await r.json()) as RewriteResult;
      setState({ kind: "ok", result: data });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error",
      });
    }
  };

  const copy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // Clipboard may be unavailable in some contexts.
    }
  };

  return (
    <div className="rounded-xl border border-brand/30 bg-brand-soft/20 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 text-brand" />
          <div>
            <p className="text-sm font-semibold">AI helper — rewrite for cosmetic-side wording</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Get 3 alternative phrasings that stay within Canadian cosmetic
              regulation. Suggestions only — review before use.
            </p>
          </div>
        </div>
        {state.kind !== "ok" && (
          <Button type="button" onClick={run} disabled={state.kind === "loading"}>
            {state.kind === "loading" ? "Rewriting…" : "Suggest safer wording"}
          </Button>
        )}
      </div>

      {state.kind === "error" && (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/60 p-3 text-sm text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300">
          <p className="font-medium">Could not generate suggestions</p>
          <p className="mt-1">{state.message}</p>
          <button
            type="button"
            onClick={run}
            className="mt-2 text-xs font-medium underline"
          >
            Try again
          </button>
        </div>
      )}

      {state.kind === "ok" && (
        <div className="mt-5 space-y-4">
          {state.result.whyRisky && (
            <p className="text-sm leading-6 text-muted-foreground">
              <span className="font-medium text-foreground">Why the original was risky: </span>
              {state.result.whyRisky}
            </p>
          )}

          <div className="space-y-2">
            {state.result.alternatives.map((alt, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background p-3"
              >
                <p className="flex-1 text-sm leading-6">{alt}</p>
                <button
                  type="button"
                  onClick={() => copy(alt, i)}
                  className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium hover:bg-muted"
                >
                  {copiedIndex === i ? (
                    <>
                      <Check className="h-3 w-3" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3">
            <p className="text-xs leading-5 text-muted-foreground">
              {state.result.caveat}
            </p>
            <button
              type="button"
              onClick={run}
              className="text-xs font-medium text-brand underline hover:text-brand-dark"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
