import type { Metadata } from "next";
import { ContentPageShell } from "@/components/marketing/content-page-shell";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { regulatoryShortDisclaimer } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "FormulaNorth regulatory and informational disclaimer for cosmetic makers in Canada.",
};

export default function DisclaimerPage() {
  return (
    <ContentPageShell
      eyebrow="Disclaimer"
      title="Regulatory disclaimer"
      description="FormulaNorth is designed to help makers organize working information. It is not positioned as a regulator, certifier, or guaranteed compliance service."
    >
      <DisclaimerCallout title="Core disclaimer" />

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          What we do mean by compliance support
        </h2>
        <p className="leading-7 text-muted-foreground">
          We use terms like readiness, preparation, guidance, and structured
          support intentionally. Those features help you gather and review
          information more consistently, but they do not replace manual
          verification.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          What we do not claim
        </h2>
        <p className="leading-7 text-muted-foreground">
          FormulaNorth does not claim guaranteed compliance, guaranteed Health
          Canada acceptance, official certification, or an official Health
          Canada upload workflow unless that compatibility is explicitly
          validated and stated.
        </p>
        <p className="leading-7 text-muted-foreground">
          {regulatoryShortDisclaimer}
        </p>
      </section>
    </ContentPageShell>
  );
}
