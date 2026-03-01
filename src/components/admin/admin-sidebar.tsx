"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Instagram,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Conversations", href: "/admin/conversations", icon: MessageSquare },
  { name: "Blog Posts", href: "/admin/posts", icon: FileText },
  { name: "Social Media", href: "/admin/social", icon: Instagram },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const navContent = (
    <>
      <div className="p-6 border-b border-[#e5e5e5] flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#1b1b1b]">MM Counselling</h2>
          <p className="text-xs text-[#595959]">Admin Dashboard</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="lg:hidden p-1 text-[#595959] hover:text-[#1b1b1b]"
          title="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors ${
                isActive
                  ? "bg-[#f9f9f9] text-[#1b1b1b] font-medium"
                  : "text-[#595959] hover:bg-[#f9f9f9] hover:text-[#1b1b1b]"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#e5e5e5] space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#595959] hover:bg-[#f9f9f9] hover:text-[#1b1b1b] rounded transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          View Site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#595959] hover:bg-[#f9f9f9] hover:text-[#1b1b1b] rounded transition-colors w-full text-left"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-[#1b1b1b]">MM Counselling</h2>
          <p className="text-[10px] text-[#595959]">Admin</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="p-2 text-[#595959] hover:text-[#1b1b1b]"
          title="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/30"
          onClick={() => setOpen(false)}
        >
          <aside
            className="w-64 bg-white min-h-screen flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#e5e5e5] min-h-screen flex-col">
        {navContent}
      </aside>
    </>
  );
}
