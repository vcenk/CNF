import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SuggestSupplierForm } from "./suggest-form";

export const metadata: Metadata = {
  title: "Suggest a Canadian cosmetic supplier",
  description:
    "Tell us about a Canadian cosmetic ingredient supplier we should add to the FormulaNorth directory. We review submissions and add real suppliers makers actually order from.",
  alternates: { canonical: "/suppliers/suggest" },
  openGraph: {
    title: "Suggest a Canadian cosmetic supplier",
    description:
      "Help us grow the directory. Submit a supplier you've ordered from.",
    url: `${siteConfig.url}/suppliers/suggest`,
    siteName: siteConfig.name,
  },
};

export default function SuggestSupplierPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link
        href="/suppliers"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      <div className="mt-4 mb-8 flex items-start gap-4">
        <div className="rounded-xl bg-brand/10 p-3">
          <Plus className="h-5 w-5 text-brand" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">
            Suggest a Canadian supplier
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            FormulaNorth&apos;s directory is grown from real maker recommendations.
            If you order from a Canadian cosmetic ingredient supplier we don&apos;t
            have listed, tell us about them. We&apos;ll review and add real suppliers
            makers actually use.
          </p>
        </div>
      </div>

      <SuggestSupplierForm />

      <div className="mt-12 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">What we look for</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-4">
          <li>Canadian-based supplier (warehouse / fulfillment in Canada)</li>
          <li>Sells cosmetic ingredients, soap supplies, packaging, or related</li>
          <li>Has a working website with a product catalog or contact info</li>
          <li>Open to indie makers (not invitation-only B2B)</li>
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">What we don&apos;t add</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-4">
          <li>US-only suppliers (even if they ship to Canada)</li>
          <li>Personal Etsy shops without ingredient catalogs</li>
          <li>Brands selling finished cosmetics, not ingredients</li>
          <li>Suppliers we can&apos;t verify exist via their website</li>
        </ul>
      </div>
    </div>
  );
}
