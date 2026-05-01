"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addSupplierAction, type AddSupplierState } from "./actions";
import { PROVINCES_CA } from "@/lib/supabase/queries/suppliers";

const initialState: AddSupplierState = { status: "idle" };

export function AddSupplierForm() {
  const [state, formAction, isPending] = useActionState(
    addSupplierAction,
    initialState
  );

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
          placeholder="e.g. New Directions Aromatics Inc."
          suppressHydrationWarning
        />
        {errors.name && (
          <p className="text-xs text-rose-600">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={v?.website}
          aria-invalid={!!errors.website}
          placeholder="https://www.newdirectionsaromatics.ca/"
          suppressHydrationWarning
        />
        {errors.website && (
          <p className="text-xs text-rose-600">{errors.website}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Without a scheme, https:// will be added automatically.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            defaultValue={v?.city}
            placeholder="Mississauga"
            suppressHydrationWarning
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <select
            id="province"
            name="province"
            defaultValue={v?.province}
            suppressHydrationWarning
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-invalid={!!errors.province}
          >
            <option value="">— Pick a province —</option>
            {PROVINCES_CA.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name} ({p.code})
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="text-xs text-rose-600">{errors.province}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialties">Specialties</Label>
        <Input
          id="specialties"
          name="specialties"
          defaultValue={v?.specialties}
          placeholder="essential oils, carrier oils, butters, soap supplies"
          suppressHydrationWarning
        />
        <p className="text-xs text-muted-foreground">
          Comma-separated. Use lowercase tags. Up to 12.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes / description</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={v?.notes}
          placeholder="Anything makers should know — minimum order, retail vs wholesale, ships across Canada vs local pickup, etc."
          suppressHydrationWarning
        />
      </div>

      {state.status === "error" && state.message && (
        <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3 text-sm text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300">
          {state.message}
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending} suppressHydrationWarning>
          {isPending ? "Saving…" : "Add supplier"}
        </Button>
        <Link
          href="/suppliers"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
