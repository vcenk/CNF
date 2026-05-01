import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { getOptionalUser } from "@/lib/auth/require-auth";

export async function SiteHeader() {
  const user = await getOptionalUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center no-underline"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/FormulaNorth_Logo.png"
            alt={siteConfig.name}
            width={1448}
            height={1086}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <MainNav isLoggedIn={!!user} />
        <MobileNav isLoggedIn={!!user} />
      </div>
    </header>
  );
}
