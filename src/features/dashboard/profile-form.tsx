"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";

interface ProfileFormProps {
  profile: {
    displayName: string;
    companyName: string;
    companyAddress: string;
    email: string;
    tier: string;
  };
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [companyName, setCompanyName] = useState(profile.companyName);
  const [companyAddress, setCompanyAddress] = useState(profile.companyAddress);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          company_name: companyName || null,
          company_address: companyAddress || null,
        })
        .eq("id", user.id);

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {/* Profile info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Email</Label>
            <Input value={profile.email} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed here.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Display name</Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Jane Smith"
            />
          </div>
        </CardContent>
      </Card>

      {/* Company info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Company Information</CardTitle>
          <p className="text-xs text-muted-foreground">
            Used in label templates and CNF filings. A Canadian address is
            required for CNF submissions.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Company name</Label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your Cosmetics Inc."
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Company address</Label>
            <Input
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              placeholder="123 Main St, Toronto, ON M5V 1A1, Canada"
            />
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Subscription</CardTitle>
            <Badge
              variant="outline"
              className="capitalize border-brand/30 text-brand"
            >
              {profile.tier}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {profile.tier === "free"
              ? "You are on the free plan. Upgrade to unlock more formulas, labels, and CNF exports."
              : `You are on the ${profile.tier} plan.`}
          </p>
          {profile.tier === "free" && (
            <a
              href="/pricing"
              className="mt-3 inline-block rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              View plans
            </a>
          )}
        </CardContent>
      </Card>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={isPending}
        className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {isPending ? "Saving..." : saved ? "Saved!" : "Save changes"}
      </button>
    </div>
  );
}
