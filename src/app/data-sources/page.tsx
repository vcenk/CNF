import type { Metadata } from "next";
import { ContentPageShell } from "@/components/marketing/content-page-shell";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { dataSourcesLastReviewed } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Data Sources",
  description:
    "How FormulaNorth frames ingredient, hotlist, and supplier data for Canadian cosmetic makers.",
};

export default function DataSourcesPage() {
  return (
    <ContentPageShell
      eyebrow="Data Sources"
      title="How FormulaNorth handles ingredient and supplier data"
      description="This page explains the scope and limits of the public information shown in FormulaNorth so makers understand what is reference material and what still needs manual verification."
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          What data is included
        </h2>
        <p className="leading-7 text-muted-foreground">
          FormulaNorth currently combines ingredient identity fields such as
          INCI name, common name, CAS number when available, cosmetic function
          notes, hotlist status references, and supplier directory information
          that helps makers research materials used in Canadian cosmetic
          products.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Hotlist and restriction references
        </h2>
        <p className="leading-7 text-muted-foreground">
          Hotlist and restriction notes should be treated as maintained working
          references, not as a replacement for official Health Canada
          publications. Rules, interpretations, and ingredient conditions can
          change.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Supplier information
        </h2>
        <p className="leading-7 text-muted-foreground">
          Supplier listings and pricing snapshots are provided for research
          convenience. Availability, pricing, shipping, and catalog details may
          change without notice and should be confirmed directly with the
          supplier.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Review cadence
        </h2>
        <p className="leading-7 text-muted-foreground">
          Last reviewed: {dataSourcesLastReviewed}.
        </p>
        <p className="leading-7 text-muted-foreground">
          If you notice a discrepancy, contact us with the source you used so
          we can review it more quickly.
        </p>
      </section>

      <DisclaimerCallout title="Verification reminder" />
    </ContentPageShell>
  );
}
