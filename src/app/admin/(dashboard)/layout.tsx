import { redirect } from "next/navigation";
import { validateSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await validateSession();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 pt-16 lg:p-8 lg:pt-8 overflow-auto">{children}</main>
    </div>
  );
}
