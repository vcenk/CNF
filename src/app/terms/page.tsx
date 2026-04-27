import type { Metadata } from "next";
import { ContentPageShell } from "@/components/marketing/content-page-shell";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "FormulaNorth terms overview for use of the platform and public resources.",
};

export default function TermsPage() {
  return (
    <ContentPageShell
      eyebrow="Terms"
      title="Terms of use overview"
      description="These terms summarize the current expectations for using FormulaNorth, its public resources, and its account-based features."
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Using the app</h2>
        <p className="leading-7 text-muted-foreground">
          You are responsible for how you use any formula, label, costing, or
          CNF preparation output created with FormulaNorth. Use the platform as
          a working tool, not as a substitute for your own review process.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Accuracy and verification
        </h2>
        <p className="leading-7 text-muted-foreground">
          Ingredient data, supplier references, and software-generated outputs
          may change over time or require interpretation. You agree to verify
          important information before relying on it for production, sale, or
          regulatory submission.
        </p>
      </section>

      <DisclaimerCallout />

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Product changes
        </h2>
        <p className="leading-7 text-muted-foreground">
          FormulaNorth may update features, plan limits, or guidance content as
          the platform evolves. Continued use of the product after updates means
          you accept the revised experience.
        </p>
      </section>
    </ContentPageShell>
  );
}
