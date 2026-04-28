"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Sparkles } from "lucide-react";

export interface FeedbackFormProps {
  defaultEmail?: string;
  source?: string;
}

interface RoleOption {
  value: string;
  label: string;
}

const ROLES: RoleOption[] = [
  { value: "", label: "Pick one (optional)" },
  { value: "just_starting", label: "Just exploring / researching" },
  { value: "hobby", label: "Hobby maker, no sales yet" },
  { value: "side_business", label: "Selling on the side" },
  { value: "full_time", label: "Full-time indie cosmetic business" },
  { value: "consulting", label: "Consultant / formulator for others" },
  { value: "retailer", label: "Retailer or distributor" },
  { value: "other", label: "Other" },
];

interface ExpectationOption {
  value: string;
  label: string;
}

const EXPECTATIONS: ExpectationOption[] = [
  { value: "pdf_label_export", label: "PDF / print-ready label export" },
  { value: "french_translation_help", label: "Bilingual EN/FR translation help" },
  { value: "multiple_brands", label: "Multiple brands / product lines" },
  { value: "batch_records", label: "Batch records / production logs" },
  { value: "team_collaboration", label: "Team collaboration" },
  { value: "stripe_billing", label: "Subscription billing (open paid plans)" },
  { value: "etsy_shopify_integration", label: "Etsy / Shopify integration" },
  { value: "mobile_app", label: "Mobile app" },
  { value: "wholesale_orders", label: "Wholesale order management" },
  { value: "insurance_referrals", label: "Insurance broker referrals" },
];

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function FeedbackForm({ defaultEmail = "", source = "feedback_page" }: FeedbackFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [expectations, setExpectations] = useState<Set<string>>(new Set());
  const [state, setState] = useState<State>({ kind: "idle" });

  function toggleExpectation(value: string) {
    setExpectations((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ kind: "loading" });

    try {
      const r = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || undefined,
          role: role || undefined,
          message,
          expectations: Array.from(expectations),
          source,
        }),
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
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40">
          <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-emerald-900 dark:text-emerald-200">
          Thanks — feedback received
        </h2>
        <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-200/80">
          {email
            ? `We may follow up at ${email} if we have questions while building this.`
            : "If you want a reply, send another note with your email."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset className="space-y-5 rounded-xl border border-border bg-card p-6">
        <legend className="px-2 text-sm font-semibold">About you</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="feedback-email">Email (optional)</Label>
            <Input
              id="feedback-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              suppressHydrationWarning
            />
            <p className="text-xs text-muted-foreground">
              Only used so we can reply or ask follow-up questions.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback-role">Where are you in your maker journey?</Label>
            <select
              id="feedback-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              suppressHydrationWarning
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {ROLES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border border-border bg-card p-6">
        <legend className="px-2 text-sm font-semibold">
          What would make FormulaNorth more useful for you?
        </legend>
        <p className="text-sm text-muted-foreground">
          Pick anything that applies. We&apos;ll prioritise based on what
          comes up most.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {EXPECTATIONS.map((opt) => {
            const checked = expectations.has(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${
                  checked
                    ? "border-brand bg-brand-soft/30"
                    : "border-border bg-background/40 hover:border-brand/60"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleExpectation(opt.value)}
                  className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--brand)]"
                  suppressHydrationWarning
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-3 rounded-xl border border-border bg-card p-6">
        <legend className="px-2 text-sm font-semibold">Tell us more</legend>
        <Label htmlFor="feedback-message">
          What do you wish FormulaNorth could do? <span className="text-rose-600">*</span>
        </Label>
        <Textarea
          id="feedback-message"
          required
          rows={6}
          placeholder="The more specific the better — what you're working on, what's painful, what's missing, what would unlock something for you."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={4000}
          suppressHydrationWarning
        />
        <p className="text-right text-xs text-muted-foreground">
          {message.length}/4000
        </p>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state.kind === "loading"} suppressHydrationWarning>
          <Sparkles className="h-4 w-4" />
          {state.kind === "loading" ? "Sending…" : "Send feedback"}
        </Button>
        <p className="text-xs text-muted-foreground">
          We read every submission. No automated reply.
        </p>
      </div>

      {state.kind === "error" && (
        <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3 text-sm text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300">
          <p className="font-medium">Could not send feedback</p>
          <p className="mt-1">{state.message}</p>
        </div>
      )}
    </form>
  );
}
