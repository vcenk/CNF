"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AiAssistButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => Promise<void>;
}

export function AiAssistButton({ label, disabled, onClick }: AiAssistButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await onClick();
    } catch (err) {
      console.error("AI assist failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className="flex items-center gap-1 rounded-md bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand transition-colors hover:bg-brand/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Sparkles className="h-3 w-3" />
      )}
      {label}
    </button>
  );
}
