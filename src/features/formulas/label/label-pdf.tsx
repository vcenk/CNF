"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface LabelPdfProps {
  productNameEn: string;
  productNameFr: string;
  companyName: string;
  companyAddress: string;
  netWeight: string | null;
  netVolume: string | null;
  inciList: string[];
  mayContain: string[];
  warningsEn: string[];
  warningsFr: string[];
  allergens: string[];
  claimsEn: string[];
  claimsFr: string[];
}

export function LabelPdfDownload(props: LabelPdfProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      // Dynamic import to avoid SSR issues with react-pdf
      const { pdf } = await import("@react-pdf/renderer");
      const { LabelDocument } = await import("./label-document");

      const blob = await pdf(<LabelDocument {...props} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${props.productNameEn || "label"}-label.pdf`.replace(
        /[^a-zA-Z0-9-_.]/g,
        "-"
      );
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  }

  const isReady = props.productNameEn && props.companyName && props.inciList.length > 0;

  return (
    <button
      onClick={handleDownload}
      disabled={loading || !isReady}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {loading ? "Generating PDF..." : "Export label PDF"}
    </button>
  );
}
