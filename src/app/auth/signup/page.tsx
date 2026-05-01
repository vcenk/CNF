import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col items-center justify-center px-4 py-16">
      <Card className="w-full">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto inline-block" aria-label={`${siteConfig.name} home`}>
            <Image
              src="/FormulaNorth_Logo.png"
              alt={siteConfig.name}
              width={1200}
              height={363}
              priority
              className="mx-auto h-16 w-auto"
            />
          </Link>
          <CardTitle className="sr-only">{siteConfig.name}</CardTitle>
          <CardDescription className="mt-3">Create your free account to start building formulas</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="signup" />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand underline hover:text-brand-dark">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
