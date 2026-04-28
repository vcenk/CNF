import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";
import { FeedbackForm } from "./feedback-form";

const pathname = "/feedback";
const title = "Share Feedback — FormulaNorth";
const description =
  "Tell us what you wish FormulaNorth could do. We read every submission and prioritise features based on what indie cosmetic makers actually need.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pathname },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${pathname}`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary", title, description },
};

interface FeedbackPageProps {
  searchParams: Promise<{ source?: string }>;
}

export default async function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const params = await searchParams;
  const source = (params.source ?? "feedback_page").slice(0, 120);

  // Pre-fill email for authenticated users (lower friction).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const defaultEmail = user?.email ?? "";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Feedback</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Help shape FormulaNorth
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          What do you wish this app could do?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          FormulaNorth is in active development for Canadian indie cosmetic
          makers. Tell us what you need most — what&apos;s missing, what&apos;s
          painful, what would actually save you time. We prioritise based on
          what comes up most.
        </p>
      </header>

      <FeedbackForm defaultEmail={defaultEmail} source={source} />

      <p className="mt-10 text-xs text-muted-foreground">
        Prefer email? Reach us at{" "}
        <a
          href="mailto:support@formulanorth.com"
          className="text-brand underline hover:text-brand-dark"
        >
          support@formulanorth.com
        </a>
        .
      </p>
    </div>
  );
}
