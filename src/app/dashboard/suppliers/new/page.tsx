import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { AddSupplierForm } from "./add-supplier-form";

export const metadata: Metadata = {
  title: "Add supplier",
  robots: { index: false, follow: false },
};

export default async function NewSupplierPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link
        href="/suppliers"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      <div className="mt-4 mb-6">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">
          Add a supplier
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Admin-only. Submit goes straight to the public directory at{" "}
          <Link href="/suppliers" className="text-brand underline">
            /suppliers
          </Link>
          . Slug is auto-generated from the name.
        </p>
      </div>

      <AddSupplierForm />

      <div className="mt-10 rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Quick reference</p>
        <ul className="mt-2 list-disc space-y-1 pl-4">
          <li>
            For online-only suppliers without a physical city, leave city + province blank.
            They'll appear under "Online or unspecified" on the directory.
          </li>
          <li>
            Specialties are comma-separated tags. Common ones: <em>essential oils, carrier oils, butters, fragrance oils, soap supplies, packaging, surfactants, raw skincare, mineral makeup</em>.
          </li>
          <li>
            Public submissions arrive at /dashboard/suppliers/submissions for review (coming soon).
          </li>
        </ul>
      </div>
    </div>
  );
}
