import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/require-auth";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardMobileNav } from "@/components/layout/dashboard-mobile-nav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col md:flex-row">
      <DashboardSidebar />
      <div className="flex-1 overflow-x-hidden">
        <DashboardMobileNav />
        {children}
      </div>
    </div>
  );
}
