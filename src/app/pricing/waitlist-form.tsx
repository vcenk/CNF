"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";

interface WaitlistFormProps {
  tier: "maker" | "studio" | "business";
  tierLabel: string;
  defaultEmail?: string;
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function WaitlistForm({ tier, tierLabel, defaultEmail = "" }: WaitlistFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ kind: "loading" });

    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tier }),
      });

      if (!r.ok) {
        const data = (await r.json().catch(() => ({}))) as { error?: string };
        setState({
          kind: "error",
          message: data.error || `Could not save (${r.status}). Please try again.`,
        });
        return;
      }

      setState({ kind: "ok" });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error",
      });
    }
  }

  if (state.kind === "ok") {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-sm dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <div>
          <p className="font-medium text-emerald-900 dark:text-emerald-200">
            You&apos;re on the {tierLabel} waitlist
          </p>
          <p className="mt-0.5 text-xs text-emerald-900/80 dark:text-emerald-200/80">
            We&apos;ll email you when this plan opens up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor={`waitlist-${tier}`} className="sr-only">
        Email
      </label>
      <div className="relative">
        <Mail className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={`waitlist-${tier}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state.kind === "loading"}
          suppressHydrationWarning
          className="w-full rounded-lg border border-border bg-background py-2 pl-8 pr-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={state.kind === "loading"}
        suppressHydrationWarning
        className="block w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {state.kind === "loading" ? "Saving…" : `Join ${tierLabel} waitlist`}
      </button>
      {state.kind === "error" && (
        <p className="text-xs text-rose-700 dark:text-rose-300">{state.message}</p>
      )}
    </form>
  );
}
