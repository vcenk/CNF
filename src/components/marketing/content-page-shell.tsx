import type { ReactNode } from "react";

interface ContentPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function ContentPageShell({
  eyebrow,
  title,
  description,
  children,
}: ContentPageShellProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>

      <div className="space-y-10">{children}</div>
    </div>
  );
}
