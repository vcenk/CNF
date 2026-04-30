"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FlaskConical,
  DollarSign,
  Tag,
  FileOutput,
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Formulas", href: "/formulas", icon: FlaskConical },
  { label: "Prices", href: "/dashboard/prices", icon: DollarSign },
  { label: "Labels", href: "/dashboard/labels", icon: Tag },
  { label: "Filings", href: "/dashboard/filings", icon: FileOutput },
  { label: "Purchases", href: "/dashboard/purchases", icon: ShoppingBag },
  { label: "Account", href: "/dashboard/account", icon: User },
];

export function DashboardMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="sticky top-16 z-40 border-b border-border/40 bg-card/80 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-brand bg-brand text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-brand hover:text-brand"
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </div>
  );
}
