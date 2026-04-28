import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const blogMdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      {...props}
      className="mt-12 font-display text-3xl font-bold tracking-tight text-foreground first:mt-0"
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-10 font-display text-2xl font-bold tracking-tight text-foreground"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-8 font-display text-xl font-semibold tracking-tight text-foreground"
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      {...props}
      className="mt-6 font-display text-lg font-semibold text-foreground"
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      {...props}
      className="mt-5 text-base leading-7 text-muted-foreground"
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className="mt-5 list-disc space-y-2 pl-6 text-base leading-7 marker:text-brand"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className="mt-5 list-decimal space-y-2 pl-6 text-base leading-7 marker:text-brand"
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="text-muted-foreground">
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong {...props} className="font-semibold text-foreground">
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em {...props} className="italic">
      {children}
    </em>
  ),
  a: ({ children, href, ...props }) => {
    const isInternal = href && href.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }) => (
    <code
      {...props}
      className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="mt-5 overflow-x-auto rounded-xl border border-border bg-muted p-4 text-sm leading-6"
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="mt-5 border-l-4 border-brand/40 bg-brand-soft/20 px-4 py-3 text-base italic leading-7 text-muted-foreground"
    >
      {children}
    </blockquote>
  ),
  hr: (props) => (
    <hr {...props} className="my-10 border-t border-border/60" />
  ),
  table: ({ children, ...props }) => (
    <div className="mt-5 overflow-x-auto rounded-xl border border-border">
      <table {...props} className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      {...props}
      className="border-b border-border bg-muted px-4 py-2 text-left font-semibold text-foreground"
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td {...props} className="border-b border-border/60 px-4 py-2 text-muted-foreground">
      {children}
    </td>
  ),
};
