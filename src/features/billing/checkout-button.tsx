"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CheckoutButtonProps {
  interval: "month" | "year";
  className?: string;
  children: React.ReactNode;
  isLoggedIn: boolean;
  // If the user is on free tier and already has an active sub, we'll
  // route them to /dashboard/account instead of starting a new checkout.
  alreadySubscribed?: boolean;
}

export function CheckoutButton({
  interval,
  className,
  children,
  isLoggedIn,
  alreadySubscribed = false,
}: CheckoutButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (pending) return;

    if (!isLoggedIn) {
      // Send to signup with a return path that brings them right back here
      router.push(`/auth/signup?next=${encodeURIComponent(`/pricing`)}`);
      return;
    }

    if (alreadySubscribed) {
      router.push("/dashboard/account");
      return;
    }

    setPending(true);
    try {
      const r = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });
      const data = (await r.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
        code?: string;
      };
      if (!r.ok || !data.url) {
        if (data.code === "already_subscribed") {
          toast.info("You're already subscribed", {
            description: "Opening account page to manage your plan.",
          });
          router.push("/dashboard/account");
          return;
        }
        toast.error("Could not start checkout", {
          description: data.error || `(${r.status})`,
        });
        setPending(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      toast.error("Network error", {
        description: err instanceof Error ? err.message : "Try again",
      });
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={className}
    >
      {pending ? "Opening checkout…" : children}
    </button>
  );
}
