import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/marketing/content-page-shell";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact FormulaNorth for product questions, support requests, and partnership inquiries.",
};

export default function ContactPage() {
  return (
    <ContentPageShell
      eyebrow="Contact"
      title="Talk with the FormulaNorth team"
      description="Use this page for support questions, data corrections, partnership inquiries, or feedback from Canadian cosmetic makers using the platform."
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Email</h2>
        <p className="leading-7 text-muted-foreground">
          General support and product questions:
        </p>
        <p>
          <a
            href="mailto:support@formulanorth.com"
            className="text-brand underline hover:text-brand-dark"
          >
            support@formulanorth.com
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          What to include
        </h2>
        <p className="leading-7 text-muted-foreground">
          If you are reporting a problem, include the page you were using, what
          you expected to happen, and any supplier or ingredient details that
          may help us review the issue faster.
        </p>
        <p className="leading-7 text-muted-foreground">
          For ingredient or hotlist corrections, please link the source you used
          so we can compare it with our current entry and update the record if
          needed.
        </p>
      </section>

      <DisclaimerCallout title="Important note" />

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Looking for guidance first?
        </h2>
        <p className="leading-7 text-muted-foreground">
          You may find the answer faster in our{" "}
          <Link
            href="/guides"
            className="text-brand underline hover:text-brand-dark"
          >
            guides
          </Link>{" "}
          or on the{" "}
          <Link
            href="/disclaimer"
            className="text-brand underline hover:text-brand-dark"
          >
            disclaimer
          </Link>{" "}
          and{" "}
          <Link
            href="/data-sources"
            className="text-brand underline hover:text-brand-dark"
          >
            data sources
          </Link>{" "}
          pages.
        </p>
      </section>
    </ContentPageShell>
  );
}
