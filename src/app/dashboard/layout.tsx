import { requireAuth } from "@/lib/auth/require-auth";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
