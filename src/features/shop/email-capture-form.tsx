"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Mail, Download, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface EmailCaptureFormProps {
  productSlug: string;
  productTitle: string;
}

export function EmailCaptureForm({ productSlug, productTitle }: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        await supabase.from("email_subscribers").upsert(
          { email, source: productSlug },
          { onConflict: "email" }
        );
        setSubmitted(true);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-success/30 bg-success-soft/30 p-6 text-center">
        <Check className="mx-auto h-8 w-8 text-success" />
        <p className="mt-3 font-semibold text-success">You&apos;re in!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Check your email for the download link to &ldquo;{productTitle}&rdquo;.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          (Download delivery coming soon — we&apos;ll email you when it&apos;s ready.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Enter your email to download <strong>{productTitle}</strong> for free.
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {isPending ? "..." : "Download"}
        </button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">
        We&apos;ll only email you about this resource. No spam.
      </p>
    </form>
  );
}
