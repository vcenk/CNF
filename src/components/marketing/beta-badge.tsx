import { Sparkles } from "lucide-react";

interface BetaBadgeProps {
  /** Optional override label. Defaults to "Free during beta". */
  label?: string;
  size?: "sm" | "md";
}

export function BetaBadge({
  label = "Free during beta",
  size = "sm",
}: BetaBadgeProps) {
  const sizing =
    size === "sm"
      ? "gap-1 px-2 py-0.5 text-[11px]"
      : "gap-1.5 px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center rounded-full border border-brand/30 bg-brand-soft/40 font-semibold uppercase tracking-wider text-brand ${sizing}`}
    >
      <Sparkles className={size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3"} />
      {label}
    </span>
  );
}
