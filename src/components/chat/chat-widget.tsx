"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { trackChatOpen } from "@/lib/analytics";

// The chat conversation UI pulls in the Vercel AI SDK (@ai-sdk/react + ai),
// which is the single largest client dependency. Load that chunk only when the
// visitor actually opens the chat — it keeps it off the initial homepage bundle
// and out of the unused-JavaScript / TBT budget for every other visit.
const ChatInner = dynamic(
  () => import("./chat-inner").then((m) => m.ChatInner),
  { ssr: false }
);

function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("mm-chat-session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("mm-chat-session", id);
  }
  return id;
}

export function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [sessionId, setSessionId] = useState("");

  // Auto-show prompt bubble after 2 seconds — but not on the contact page,
  // where the form is the primary action and the prompt would compete with it.
  useEffect(() => {
    if (isOpen || promptDismissed) return;
    if (pathname === "/contact") return;
    const timer = setTimeout(() => setShowPrompt(true), 2000);
    return () => clearTimeout(timer);
  }, [isOpen, promptDismissed, pathname]);

  // Open from a user gesture: resolve the session id lazily here so the heavy
  // chat chunk and localStorage access stay off the critical path until needed.
  const openChat = () => {
    if (!sessionId) setSessionId(getSessionId());
    setShowPrompt(false);
    setIsOpen(true);
    trackChatOpen();
  };

  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Chat Window — only mount (and download the AI SDK chunk) once opened */}
      {isOpen && sessionId && <ChatInner sessionId={sessionId} />}

      {/* Auto-open prompt bubble */}
      {showPrompt && !isOpen && (
        <div className="fixed right-4 sm:right-6 z-50 bottom-[4.5rem] md:bottom-[4.5rem] max-md:bottom-[9.5rem]">
          <div className="bg-white border border-[#e5e5e5] shadow-lg px-4 py-3 max-w-[240px] relative">
            <button
              type="button"
              onClick={() => {
                setShowPrompt(false);
                setPromptDismissed(true);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center text-[#808080] hover:text-[#1b1b1b]"
              aria-label="Dismiss"
            >
              <X className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={openChat}
              data-cta="chat-open"
              data-cta-location="prompt_bubble"
              className="text-left"
            >
              <p className="text-sm text-[#1b1b1b] leading-relaxed">
                Hi! Have a question? I&apos;m here to help.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button — sits above mobile call bar */}
      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            openChat();
          }
        }}
        data-cta="chat-toggle"
        data-cta-location="floating_button"
        className="fixed right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-[#808080] text-white shadow-lg hover:bg-[#6a6a6a] transition-colors flex items-center justify-center bottom-4 md:bottom-4 max-md:bottom-[5.5rem]"
        aria-label={isOpen ? "Close chat" : "Open chat with Marion"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </>
  );
}
