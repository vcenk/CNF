import Link from "next/link";

const navItems = [
  { label: "Ingredients", href: "/ingredients" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Formulas", href: "/formulas" },
  { label: "Pricing", href: "/pricing" },
];

export function MainNav() {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="/auth/login"
        className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
      >
        Sign in
      </Link>
    </nav>
  );
}
