"use client";

import { useEffect } from "react";

/**
 * Auto-trigger the browser print dialog after the page mounts.
 * Also adds a screen-only "Print" button in case auto-trigger is blocked.
 */
export function PrintTrigger() {
  useEffect(() => {
    // Brief delay so the page has fully painted and fonts have loaded
    const t = setTimeout(() => {
      try {
        window.print();
      } catch {
        // Some browsers may block; user can use the manual button
      }
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mb-6 flex justify-end print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
      >
        Print again
      </button>
    </div>
  );
}
