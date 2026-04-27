import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { regulatoryShortDisclaimer } from "@/lib/legal";

const footerLinks = {
  Product: [
    { label: "Ingredients", href: "/ingredients" },
    { label: "Suppliers", href: "/suppliers" },
    { label: "Formulas", href: "/formulas" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Data Sources", href: "/data-sources" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Guides", href: "/guides" },
    { label: "Free Tools", href: "/tools" },
    { label: "CNF Readiness Checker", href: "/tools/cnf-readiness-checker" },
    { label: "Shop", href: "/shop" },
  ],
  "Canadian Cosmetic Compliance": [
    { label: "Cosmetic Notification Form Canada", href: "/cosmetic-notification-form-canada" },
    { label: "Cosmetic Label Requirements", href: "/cosmetic-label-requirements-canada" },
    { label: "Cosmetic Ingredient Hotlist", href: "/health-canada-cosmetic-hotlist" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="lg:col-span-1">
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

        <div className="mt-10 border-t border-border/40 pt-6">
          <p className="mx-auto max-w-4xl text-center text-xs leading-6 text-muted-foreground">
            {regulatoryShortDisclaimer}
          </p>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
