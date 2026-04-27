import type { Metadata } from "next";
import { ContentPageShell } from "@/components/marketing/content-page-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "FormulaNorth privacy overview for Canadian cosmetic makers using the platform.",
};

export default function PrivacyPage() {
  return (
    <ContentPageShell
      eyebrow="Privacy"
      title="Privacy overview"
      description="This page explains the basic privacy expectations for FormulaNorth while the product is in active development."
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Information we may collect
        </h2>
        <p className="leading-7 text-muted-foreground">
          When you create an account or use saved features, FormulaNorth may
          store information such as your email address, profile details, saved
          formulas, label drafts, pricing inputs, and CNF preparation notes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          How information is used
        </h2>
        <p className="leading-7 text-muted-foreground">
          We use saved information to provide the product features you request,
          improve reliability, troubleshoot support issues, and maintain core
          account functions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Sensitive business data
        </h2>
        <p className="leading-7 text-muted-foreground">
          Formula and supplier data can be commercially sensitive. Avoid storing
          anything you are not comfortable placing in a third-party software
          platform until you have reviewed whether the product fits your risk
          tolerance and internal process requirements.
        </p>
      </section>
    </ContentPageShell>
  );
}
