import { regulatoryDisclaimer } from "@/lib/legal";

interface DisclaimerCalloutProps {
  title?: string;
  compact?: boolean;
}

export function DisclaimerCallout({
  title = "Regulatory disclaimer",
  compact = false,
}: DisclaimerCalloutProps) {
  return (
    <div
      className={`rounded-xl border border-brand/20 bg-brand-soft/20 ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {regulatoryDisclaimer}
      </p>
    </div>
  );
}
