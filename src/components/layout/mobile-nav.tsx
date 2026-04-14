"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { label: "Ingredients", href: "/ingredients" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Formulas", href: "/formulas" },
  { label: "Pricing", href: "/pricing" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent/10 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetTitle className="font-display text-lg font-bold text-brand">
          {siteConfig.name}
        </SheetTitle>
        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-lg bg-primary px-4 py-2.5 text-center text-base font-medium text-primary-foreground"
          >
            Sign in
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
