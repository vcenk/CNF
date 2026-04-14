import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="font-display text-xl font-bold tracking-tight text-brand">
            {siteConfig.name}
          </span>
        </Link>

        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}
