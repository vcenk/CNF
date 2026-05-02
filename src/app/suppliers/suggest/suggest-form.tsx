"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { suggestSupplierAction, type SuggestSupplierState } from "./actions";
import { PROVINCES_CA } from "@/lib/provinces";

const initialState: SuggestSupplierState = { status: "idle" };

export function SuggestSupplierForm() {
  const [state, formAction, isPending] = useActionState(
    suggestSupplierAction,
    initialState
  );

  if (state.status === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40">
          <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-emerald-900 dark:text-emerald-200">
          Thanks — submission received
        </h2>
        <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-200/80">
          We&apos;ll review and add the supplier to the directory if it&apos;s a fit. No
          automated reply — you&apos;ll see it appear at{" "}
          <Link href="/suppliers" className="underline">/suppliers</Link>{" "}
          once it&apos;s live.
        </p>
        <div className="mt-6">
          <Link
            href="/suppliers"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
          >
            Back to directory
          </Link>
        </div>
      </div>
    );
  }

  const v = state.values;
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Supplier name <span className="text-rose-600">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          required
          autoFocus
          defaultValue={v?.name}
          aria-invalid={!!errors.name}
          placeholder="e.g. The Soap Dish"
          suppressHydrationWarning
        />
        {errors.name && <p className="text-xs text-rose-600">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">
          Website <span className="text-rose-600">*</span>
        </Label>
        <Input
          id="website"
          name="website"
          type="url"
          required
          defaultValue={v?.website}
          aria-invalid={!!errors.website}
          placeholder="https://www.example.ca"
          suppressHydrationWarning
        />
        {errors.website && (
          <p className="text-xs text-rose-600">{errors.website}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Required so we can verify the supplier exists. https:// added if missing.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City (optional)</Label>
          <Input
            id="city"
            name="city"
            defaultValue={v?.city}
            placeholder="Toronto"
            suppressHydrationWarning
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="province">Province (optional)</Label>
          <select
            id="province"
            name="province"
            defaultValue={v?.province}
            suppressHydrationWarning
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-invalid={!!errors.province}
          >
            <option value="">— Online or unknown —</option>
            {PROVINCES_CA.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="text-xs text-rose-600">{errors.province}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialties">What do they specialize in?</Label>
        <Input
          id="specialties"
          name="specialties"
          defaultValue={v?.specialties}
          placeholder="essential oils, butters, fragrance oils, packaging…"
          suppressHydrationWarning
        />
        <p className="text-xs text-muted-foreground">
          Comma-separated. Helps other makers find the right supplier.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Anything else worth knowing? (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={v?.notes}
          maxLength={2000}
          aria-invalid={!!errors.notes}
          placeholder="Minimum order, retail vs wholesale, ships across Canada vs local pickup, your experience as a customer, etc."
          suppressHydrationWarning
        />
        {errors.notes && <p className="text-xs text-rose-600">{errors.notes}</p>}
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start gap-3">
          <input
            id="is_customer"
            name="is_customer"
            type="checkbox"
            defaultChecked={v?.is_customer}
            className="mt-1 h-4 w-4 cursor-pointer accent-[var(--brand)]"
            suppressHydrationWarning
          />
          <Label htmlFor="is_customer" className="cursor-pointer text-sm font-normal">
            I&apos;ve ordered from them and can vouch for the supplier
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="submitter_email">Your email (optional)</Label>
        <Input
          id="submitter_email"
          name="submitter_email"
          type="email"
          defaultValue={v?.submitter_email}
          aria-invalid={!!errors.submitter_email}
          placeholder="you@example.com"
          autoComplete="email"
          suppressHydrationWarning
        />
        {errors.submitter_email && (
          <p className="text-xs text-rose-600">{errors.submitter_email}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Only so we can follow up if we have a question. Not added to any list.
        </p>
      </div>

      {state.status === "error" && state.message && (
        <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3 text-sm text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300">
          {state.message}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending} suppressHydrationWarning>
          <Send className="h-4 w-4" />
          {isPending ? "Submitting…" : "Submit supplier"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Reviewed within a few days. No automated reply.
        </p>
      </div>
    </form>
  );
}
