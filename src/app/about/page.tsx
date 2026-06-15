import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/marketing/content-page-shell";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";

export const metadata: Metadata = {
  title: "About FormulaNorth — Built for Canadian Cosmetic Makers",
  description:
    "FormulaNorth is a formulation workspace for Canadian indie cosmetic makers — ingredient research, batch math, bilingual labels, costing, and CNF preparation in one place.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About FormulaNorth — Built for Canadian Cosmetic Makers",
    description:
      "Formulation workspace for Canadian indie makers covering ingredient research, batch math, bilingual labels, costing, and CNF preparation.",
    url: "https://formulanorth.ca/about",
    siteName: "FormulaNorth",
    type: "website",
  },
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
          FormulaNorth is built for independent cosmetic makers in Canada —
          people who make soap, lotion, body butter, scrubs, bath bombs, and
          other handmade skincare products and sell them at markets, online, or
          through retail. The platform focuses on the practical, unglamorous
          work that happens between formulating a product and putting it on a
          shelf: ingredient research, batch scaling, cost calculation, label
          drafting, and CNF preparation.
        </p>
        <p className="leading-7 text-muted-foreground">
          Most small makers manage this work across a mix of spreadsheets,
          handwritten notes, browser tabs, and memory. FormulaNorth replaces
          that with a single organized workspace — one that understands Canadian
          regulatory context and surfaces the right information at the right
          step.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          The Canadian regulatory context
        </h2>
        <p className="leading-7 text-muted-foreground">
          In Canada, cosmetic products are regulated under the{" "}
          <strong>Food and Drugs Act</strong> and the{" "}
          <strong>Cosmetics Regulations</strong>, administered by Health Canada.
          Any cosmetic sold in Canada must use correct{" "}
          <strong>INCI (International Nomenclature of Cosmetic Ingredients)</strong>{" "}
          names on the label, list ingredients in descending order of
          predominance, and comply with Health Canada's{" "}
          <strong>Cosmetic Ingredient Hotlist</strong> — a list of ingredients
          that are prohibited or restricted in Canadian cosmetic products.
        </p>
        <p className="leading-7 text-muted-foreground">
          Makers who manufacture or import cosmetics for sale in Canada are also
          required to file a{" "}
          <strong>Cosmetic Notification Form (CNF)</strong> with Health Canada
          within 10 days of first sale. The CNF requires detailed ingredient
          information, concentration data, product function claims, and company
          details. Preparing this information accurately — especially for makers
          with multiple products — takes significant time and organization.
        </p>
        <p className="leading-7 text-muted-foreground">
          Additionally, as of April 2026, Canadian cosmetics must individually
          disclose specific <strong>fragrance allergens</strong> above defined
          thresholds — a significant change affecting any product containing
          essential oils or fragrance blends.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          What each part of FormulaNorth does
        </h2>

        <h3 className="font-display text-lg font-semibold">
          Ingredient database
        </h3>
        <p className="leading-7 text-muted-foreground">
          The ingredient database covers 250+ cosmetic ingredients with INCI
          names, CAS numbers, common names, function categories, and Health
          Canada Hotlist references. Each entry indicates whether an ingredient
          is prohibited, restricted (with concentration caps), or flagged for
          fragrance allergen disclosure. Canadian supplier availability and
          reference pricing are included where available.
        </p>

        <h3 className="font-display text-lg font-semibold">
          Supplier directory
        </h3>
        <p className="leading-7 text-muted-foreground">
          The supplier directory lists Canadian cosmetic ingredient suppliers
          organized by province. Each entry includes direct links to ingredient
          catalogs and available INCI-mapped products. The directory helps
          makers find domestic sources, compare options, and reduce reliance on
          cross-border shipping for compliance-sensitive ingredients.
        </p>

        <h3 className="font-display text-lg font-semibold">
          Formula management
        </h3>
        <p className="leading-7 text-muted-foreground">
          The formula builder lets makers create and version product formulas
          with INCI lookups, phase grouping, and batch scaling. Each formula
          connects to the ingredient database so hotlist flags, allergen
          disclosures, and INCI name suggestions surface automatically. Version
          history means you can track changes over time and compare batch
          iterations without losing earlier data.
        </p>

        <h3 className="font-display text-lg font-semibold">Costing</h3>
        <p className="leading-7 text-muted-foreground">
          The costing tools calculate cost per batch and cost per unit from
          ingredient quantities and supplier prices. Labor, packaging, and
          overhead can be factored in. Suggested wholesale and retail price
          targets are calculated based on standard markup conventions, giving
          makers a clearer view of whether a formula is commercially viable
          before investing in packaging or stock.
        </p>

        <h3 className="font-display text-lg font-semibold">
          Bilingual label drafting
        </h3>
        <p className="leading-7 text-muted-foreground">
          Canadian cosmetic labels must be bilingual in English and French.
          FormulaNorth's label generator drafts label content in both languages
          from the formula data — including the INCI ingredient list in correct
          descending order, net quantity, business identity requirements, and
          applicable warning statements. Fragrance allergen disclosure is
          surfaced where thresholds are exceeded.
        </p>

        <h3 className="font-display text-lg font-semibold">
          CNF preparation
        </h3>
        <p className="leading-7 text-muted-foreground">
          The CNF preparation tools structure the information Health Canada
          requires for a Cosmetic Notification Form submission — product
          function, ingredients with concentrations, company details, and
          labeling content — into an organized, reviewable format. The CNF
          Preparation Package PDF export gives makers a print-ready document
          they can use alongside or before the Health Canada portal submission.
        </p>

        <h3 className="font-display text-lg font-semibold">Free tools</h3>
        <p className="leading-7 text-muted-foreground">
          Several standalone tools are available free without an account: the{" "}
          <Link
            href="/tools/soap-calculator"
            className="text-brand underline hover:text-brand-dark"
          >
            Soap Calculator
          </Link>{" "}
          for lye and SAP calculations with live quality scores, the{" "}
          <Link
            href="/tools/fragrance-allergen-calculator"
            className="text-brand underline hover:text-brand-dark"
          >
            Fragrance Allergen Calculator
          </Link>{" "}
          for checking disclosure thresholds, the{" "}
          <Link
            href="/tools/cnf-readiness-checker"
            className="text-brand underline hover:text-brand-dark"
          >
            CNF Readiness Checker
          </Link>
          , the{" "}
          <Link
            href="/tools/cosmetic-cost-calculator"
            className="text-brand underline hover:text-brand-dark"
          >
            Cosmetic Cost Calculator
          </Link>
          , and the{" "}
          <Link
            href="/tools/cosmetic-label-checklist"
            className="text-brand underline hover:text-brand-dark"
          >
            Label Checklist
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Who FormulaNorth is for
        </h2>
        <p className="leading-7 text-muted-foreground">
          FormulaNorth is designed for{" "}
          <strong>indie makers at any stage</strong> — from someone making their
          first batch of cold-process soap for a farmers market to an
          established maker with 20+ SKUs preparing CNF filings for a retail
          expansion. The free plan covers research and tool use with no time
          limit. The Maker plan is for active makers who need to save and manage
          real product formulas and generate compliance documentation.
        </p>
        <p className="leading-7 text-muted-foreground">
          FormulaNorth is <strong>not</strong> a substitute for professional
          regulatory advice, laboratory testing, or a qualified cosmetic
          chemist. It is a workspace tool — one that organizes information and
          surfaces relevant data to make the preparation work faster and less
          error-prone.
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
          Makers are still responsible for verifying ingredients, calculations,
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
          </Link>
          , try the{" "}
          <Link
            href="/tools"
            className="text-brand underline hover:text-brand-dark"
          >
            free tools
          </Link>
          , or read the{" "}
          <Link
            href="/guides"
            className="text-brand underline hover:text-brand-dark"
          >
            guides
          </Link>{" "}
          for practical walkthroughs of Canadian cosmetic compliance topics.
          Review our{" "}
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
