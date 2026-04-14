import { Badge } from "@/components/ui/badge";

type HotlistStatus = "not_listed" | "restricted" | "prohibited";

const config: Record<HotlistStatus, { label: string; className: string }> = {
  not_listed: {
    label: "Safe",
    className: "bg-success-soft text-success border-success/20",
  },
  restricted: {
    label: "Restricted",
    className: "bg-warning-soft text-warning border-warning/20",
  },
  prohibited: {
    label: "Prohibited",
    className: "bg-danger-soft text-danger border-danger/20",
  },
};

export function HotlistBadge({ status }: { status: HotlistStatus }) {
  const { label, className } = config[status] ?? config.not_listed;
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}
