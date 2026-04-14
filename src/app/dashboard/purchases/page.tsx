import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/require-auth";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "My Purchases",
  robots: { index: false, follow: false },
};

export default async function PurchasesPage() {
  await requireAuth();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-bold">My Purchases</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Digital products you have purchased from the shop.
      </p>

      <div className="mt-8 rounded-lg border border-dashed border-border py-12 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground/30" />
        <p className="mt-3 text-muted-foreground">
          No purchases yet. Purchase tracking will be available once Stripe is
          connected.
        </p>
      </div>
    </div>
  );
}
