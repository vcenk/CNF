"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  CheckCircle2,
  Droplet,
  DollarSign,
  ListChecks,
  Tag,
  ArrowRight,
  LogOut,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/client";

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
  },
  { label: "Soap Calculator", href: "/tools/soap-calculator", icon: Droplet },
  {
    label: "Soap recipes",
    href: "/tools/soap-calculator/recipes",
    icon: Droplet,
  },
  {
    label: "Cost Calculator",
    href: "/tools/cosmetic-cost-calculator",
    icon: DollarSign,
  },
  {
    label: "INCI Formatter",
    href: "/tools/inci-list-formatter",
    icon: ListChecks,
  },
  {
    label: "Label Checklist",
    href: "/tools/cosmetic-label-checklist",
    icon: Tag,
  },
];

export function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setOpen(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent/10 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetTitle className="font-display text-lg font-bold text-brand">
          {siteConfig.name}
        </SheetTitle>
        <nav className="mt-6 flex flex-col gap-1">
          {/* Free tools section, prominent at the top */}
          <div className="mb-2">
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Free tools
            </p>
            {toolItems.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
              >
                <tool.icon className="h-4 w-4 shrink-0 text-brand" />
                {tool.label}
              </Link>
            ))}
            <Link
              href="/tools"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-brand hover:bg-accent/10"
            >
              View all tools
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mb-1 mt-2 h-px bg-border" />

          <div>
            <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Browse
            </p>
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent/10 block"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {isLoggedIn ? (
            <div className="mt-4 space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-center text-base font-medium text-primary-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/account"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent/10"
              >
                <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                Account settings
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-base font-medium text-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4 shrink-0 text-muted-foreground" />
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-lg bg-primary px-4 py-2.5 text-center text-base font-medium text-primary-foreground"
            >
              Sign in
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
