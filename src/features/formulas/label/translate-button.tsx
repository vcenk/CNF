"use client";

import { useState } from "react";
import { Sparkles, Check } from "lucide-react";

interface TranslateButtonProps {
  sourceText: string;
  kind: "product_name" | "claims" | "warnings" | "general";
  productCategory?: string | null;
  onTranslated: (translated: string) => void;
  hasExistingValue?: boolean;
  size?: "sm" | "md";
  label?: string;
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function TranslateButton({
  sourceText,
  kind,
  productCategory,
  onTranslated,
  hasExistingValue = false,
  size = "sm",
  label = "Translate from EN",
}: TranslateButtonProps) {
  const [state, setState] = useState<State>({ kind: "idle" });

  const disabled = !sourceText.trim() || state.kind === "loading";

  async function run() {
    if (
      hasExistingValue &&
      !window.confirm(
        "This will replace the existing French text with an AI translation. Continue?"
      )
    ) {
      return;
    }

    setState({ kind: "loading" });
    try {
      const r = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sourceText,
          from: "en",
          to: "fr",
          kind,
          productCategory: productCategory || undefined,
        }),
      });

      if (!r.ok) {
        const data = (await r.json().catch(() => ({}))) as { error?: string };
        setState({
          kind: "error",
          message: data.error || `Translation failed (${r.status})`,
        });
        return;
      }

      const data = (await r.json()) as { translated?: string };
      if (!data.translated) {
        setState({ kind: "error", message: "Empty translation returned" });
        return;
      }

      onTranslated(data.translated);
      setState({ kind: "ok" });
      setTimeout(() => setState({ kind: "idle" }), 1800);
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error",
      });
    }
  }

  const sizing =
    size === "sm"
      ? "h-7 gap-1 rounded-md px-2 text-xs"
      : "h-8 gap-1.5 rounded-md px-2.5 text-sm";

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={run}
        disabled={disabled}
        title={disabled && !sourceText.trim() ? "Add the English text first" : ""}
        suppressHydrationWarning
        className={`inline-flex items-center font-medium border border-brand/30 bg-brand-soft/40 text-brand transition-colors hover:bg-brand-soft disabled:opacity-50 disabled:cursor-not-allowed ${sizing}`}
      >
        {state.kind === "ok" ? (
          <>
            <Check className="h-3 w-3" /> Translated
          </>
        ) : (
          <>
            <Sparkles className="h-3 w-3" />
            {state.kind === "loading" ? "Translating…" : label}
          </>
        )}
      </button>
      {state.kind === "error" && (
        <p className="text-xs text-rose-600 dark:text-rose-400">{state.message}</p>
      )}
    </div>
  );
}
