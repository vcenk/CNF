import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const footerLinks = {
  Product: [
    { label: "Ingredients", href: "/ingredients" },
    { label: "Suppliers", href: "/suppliers" },
    { label: "Formulas", href: "/formulas" },
    { label: "Pricing", href: "/pricing" },
  ],
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Free Resources", href: "/resources" },
  ],
  Learn: [
    { label: "Blog", href: "/blog" },
    { label: "Guides", href: "/guides" },
    { label: "Hotlist", href: "/ingredients/hotlist" },
    { label: "INCI Database", href: "/ingredients" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <span className="font-display text-lg font-bold text-brand">
              {siteConfig.name}
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">
                {category}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
