import type { Metadata } from "next";
import Link from "next/link";
import { getOrderByToken } from "@/lib/supabase/queries/shop";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Download",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function DownloadPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 py-16">
        <XCircle className="h-12 w-12 text-destructive" />
        <h1 className="mt-4 font-display text-xl font-bold">Invalid link</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          This download link is missing a token. Please check your email for
          the correct link.
        </p>
      </div>
    );
  }

  const order = await getOrderByToken(token);

  if (!order || order.status !== "completed") {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 py-16">
        <XCircle className="h-12 w-12 text-destructive" />
        <h1 className="mt-4 font-display text-xl font-bold">
          Download not available
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          This download link is invalid or the payment has not been confirmed
          yet. Please wait a moment and try again, or check your email.
        </p>
        <Link
          href="/shop"
          className="mt-4 text-sm text-brand underline hover:text-brand-dark"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const product = order.shop_products as {
    title: string;
    file_path: string | null;
  } | null;

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 py-16">
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-success" />
          <h1 className="mt-4 font-display text-xl font-bold">
            Thank you for your purchase!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your download for &ldquo;{product?.title ?? "your product"}&rdquo;
            is ready.
          </p>

          {product?.file_path ? (
            <a
              href={product.file_path}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-dark"
            >
              <Download className="h-4 w-4" />
              Download now
            </a>
          ) : (
            <p className="mt-6 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              The download file will be available soon. We&apos;ll send it to{" "}
              <strong>{order.email}</strong>.
            </p>
          )}

          <Link
            href="/shop"
            className="mt-6 block text-sm text-brand underline hover:text-brand-dark"
          >
            Back to shop
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
