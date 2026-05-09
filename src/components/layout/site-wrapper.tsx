"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCallBar } from "@/components/shared/mobile-call-bar";

// Defer chat widget until after main content loads — reduces initial JS payload + TBT
const ChatWidget = dynamic(
  () => import("@/components/chat/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
);

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
      <MobileCallBar />
    </>
  );
}
