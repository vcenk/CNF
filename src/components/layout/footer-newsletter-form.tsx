"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "loading") return;
    setState({ kind: "loading" });

    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });

      if (!r.ok) {
        const data = (await r.json().catch(() => ({}))) as { error?: string };
        setState({
          kind: "error",
          message: data.error || `Could not subscribe (${r.status}).`,
        });
        return;
      }

      setState({ kind: "ok" });
      setEmail("");
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error",
      });
    }
  }

  if (state.kind === "ok") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-emerald-200/60 bg-emerald-50/60 p-4 text-sm dark:border-emerald-900/30 dark:bg-emerald-950/20">
        <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <p className="text-emerald-900 dark:text-emerald-200">
          Thanks — we&apos;ll send the next compliance update to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Mail className="h-4 w-4 text-brand" />
        Stay informed
      </div>
      <p className="text-xs text-muted-foreground">
        Quarterly Canadian cosmetic compliance updates. No spam, unsubscribe
        anytime.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state.kind === "loading"}
          className="text-sm"
          suppressHydrationWarning
        />
        <Button
          type="submit"
          size="sm"
          disabled={state.kind === "loading"}
          suppressHydrationWarning
        >
          {state.kind === "loading" ? "…" : "Subscribe"}
        </Button>
      </div>
      {state.kind === "error" && (
        <p className="text-xs text-rose-600 dark:text-rose-400">
          {state.message}
        </p>
      )}
    </form>
  );
}
