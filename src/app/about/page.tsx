import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/marketing/content-page-shell";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how FormulaNorth helps Canadian indie cosmetic makers organize formulas, labels, costing, and CNF preparation work.",
};

export default function AboutPage() {
  return (
    <ContentPageShell
      eyebrow="About"
      title="Built for Canadian indie cosmetic makers"
      description="FormulaNorth is a formulation workspace for makers who need one place to organize ingredient research, batch math, label content, costing, and CNF preparation details without juggling disconnected spreadsheets and notes."
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          What FormulaNorth is for
        </h2>
        <p className="leading-7 text-muted-foreground">
          We focus on the day-to-day work behind handmade skincare, soap,
          bath-and-body, and small-batch cosmetic products in Canada. That
          includes ingredient lookups, formula building, batch scaling, pricing,
          bilingual label drafting, and CNF preparation support.
        </p>
        <p className="leading-7 text-muted-foreground">
          The goal is not to replace your judgment. The goal is to make the
          underlying product data easier to organize, review, and update before
          you sell or submit anything.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          How we position compliance support
        </h2>
        <p className="leading-7 text-muted-foreground">
          FormulaNorth provides readiness guidance and structured preparation
          tools. It does not promise guaranteed compliance, guaranteed
          acceptance, or official Health Canada approval.
        </p>
        <p className="leading-7 text-muted-foreground">
          Makers are still responsible for verifying ingredients, claims,
          labeling, and notification details against official guidance and any
          professional advice they rely on.
        </p>
      </section>

      <DisclaimerCallout />

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Next steps</h2>
        <p className="leading-7 text-muted-foreground">
          Start with the{" "}
          <Link
            href="/ingredients"
            className="text-brand underline hover:text-brand-dark"
          >
            ingredient database
          </Link>{" "}
          or review our{" "}
          <Link
            href="/data-sources"
            className="text-brand underline hover:text-brand-dark"
          >
            data sources
          </Link>{" "}
          page for more detail on how public ingredient information is framed in
          the app.
        </p>
      </section>
    </ContentPageShell>
  );
}
