"use client";

import Link from "next/link";
import {
  ChevronDown,
  LayoutDashboard,
  CheckCircle2,
  Droplet,
  DollarSign,
  ListChecks,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const publicNavItems = [
  { label: "Ingredients", href: "/ingredients" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

const toolItems = [
  {
    label: "CNF Readiness Checker",
    href: "/tools/cnf-readiness-checker",
    icon: CheckCircle2,
    detail: "Free hotlist + label readiness check",
  },
  {
    label: "Fragrance Allergen Calculator",
    href: "/tools/fragrance-allergen-calculator",
    icon: Sparkles,
    detail: "Calculate Linalool, Limonene, Citral disclosure",
    isNew: true,
  },
  {
    label: "Soap Calculator",
    href: "/tools/soap-calculator",
    icon: Droplet,
    detail: "Lye + SAP, 75 oils, fatty acid breakdown",
  },
  {
    label: "Soap recipe library",
    href: "/tools/soap-calculator/recipes",
    icon: Droplet,
    detail: "15 trustworthy recipes — open in calculator",
  },
  {
    label: "Cost Calculator",
    href: "/tools/cosmetic-cost-calculator",
    icon: DollarSign,
    detail: "COGS, retail and wholesale pricing",
  },
  {
    label: "INCI List Formatter",
    href: "/tools/inci-list-formatter",
    icon: ListChecks,
    detail: "Clean ingredient lists with INCI ordering",
  },
  {
    label: "Label Checklist",
    href: "/tools/cosmetic-label-checklist",
    icon: Tag,
    detail: "Bilingual EN/FR cosmetic label checklist",
  },
];

export function MainNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {/* Free tools dropdown — featured first because it's the highest-conversion entry point */}
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground data-[popup-open]:bg-accent/10 data-[popup-open]:text-foreground">
          Free tools
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[popup-open]:rotate-180" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={8} className="w-80 p-2">
          {toolItems.map((tool) => (
            <DropdownMenuItem
              key={tool.href}
              render={
                <Link
                  href={tool.href}
                  className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-2 hover:bg-accent/15"
                />
              }
            >
              <tool.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{tool.label}</span>
                  {"isNew" in tool && tool.isNew && (
                    <span className="rounded-full bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                      New
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{tool.detail}</div>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            render={
              <Link
                href="/tools"
                className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-brand hover:bg-accent/15"
              />
            }
          >
            View all tools
            <ArrowRight className="h-3.5 w-3.5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {publicNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className="ml-2 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          Dashboard
        </Link>
      ) : (
        <Link
          href="/auth/login"
          className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}
