"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatInciList } from "@/lib/inci-formatter";

const SAMPLE = `Aqua, glycerin (5%), shea butter (4%), cetearyl alcohol (3%), tocopherol (0.5%), phenoxyethanol (0.8%), parfum (0.7%), limonene (0.05%)`;

export function FormatterForm() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => (submitted ? formatInciList(input) : null), [submitted, input]);

  return (
    <div className="space-y-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-5 rounded-xl border border-border bg-card p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="ingredient-input">
            Paste your ingredient list (INCI names preferred, percentages optional)
          </Label>
          <Textarea
            id="ingredient-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`One per line, or comma-separated.\nExample:\n${SAMPLE}`}
            rows={8}
            required
          />
          <p className="text-xs text-muted-foreground">
            Examples: <span className="font-mono">Aqua, Glycerin, Tocopherol</span> or <span className="font-mono">Glycerin (5%), Tocopherol (0.5%)</span>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">Format list</Button>
          <button
            type="button"
            onClick={() => {
              setInput(SAMPLE);
              setSubmitted(false);
              setCopied(false);
            }}
            className="text-sm text-muted-foreground underline hover:text-foreground"
          >
            Load sample
          </button>
          <button
            type="button"
            onClick={() => {
              setInput("");
              setSubmitted(false);
              setCopied(false);
            }}
            className="text-sm text-muted-foreground underline hover:text-foreground"
          >
            Clear
          </button>
        </div>
      </form>

      {result && (
        <section className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Formatted list
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              {result.cleaned.length} ingredient{result.cleaned.length === 1 ? "" : "s"} parsed
            </h2>
          </div>

          {result.formattedList ? (
            <>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-mono leading-6 text-foreground">
                  {result.formattedList}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(result.formattedList);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    } catch {
                      // Clipboard may be unavailable in some contexts.
                    }
                  }}
                >
                  {copied ? "Copied" : "Copy formatted list"}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No ingredients to display.</p>
          )}

          {result.warnings.length > 0 && (
            <div className="rounded-xl border border-amber-200/60 bg-amber-50/60 p-4 text-sm dark:border-amber-900/40 dark:bg-amber-950/20">
              <p className="font-semibold">Things to review</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                {result.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {result.notes.length > 0 && (
            <div className="rounded-xl border border-sky-200/60 bg-sky-50/60 p-4 text-sm dark:border-sky-900/40 dark:bg-sky-950/20">
              <p className="font-semibold">Reminders</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                {result.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border border-brand/20 bg-brand-soft/30 p-5">
            <h3 className="font-display text-lg font-semibold">
              Save this list inside a FormulaNorth formula
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Build the same ingredient list inside the formula builder to get
              live INCI lookups, hotlist checks, batch scaling, costing, and
              CNF preparation in one place.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/auth/signup" className={buttonVariants({ size: "lg" })}>
                Create a free account
              </Link>
              <Link href="/ingredients" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Browse ingredients
              </Link>
            </div>
          </div>

          <p className="text-xs leading-6 text-muted-foreground">
            This formatter is preparation support, not regulatory advice or a
            guarantee of label compliance. Always verify INCI names with your
            supplier and review your final label against current Health Canada
            cosmetic labelling guidance.
          </p>
        </section>
      )}
    </div>
  );
}
