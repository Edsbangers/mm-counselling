"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send } from "lucide-react";

function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("mm-chat-session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("mm-chat-session", id);
  }
  return id;
}

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts) return "";
  return message.parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text)
    .join("");
}

const welcomeMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant" as const,
    parts: [
      {
        type: "text" as const,
        text: "Hello! I'm Marion's virtual assistant. How can I help you today? Whether you have questions about counselling services, fees, or booking, I'm happy to help.",
      },
    ],
  },
];

function ChatInner({ sessionId }: { sessionId: string }) {
  const [leadCaptured, setLeadCaptured] = useState(
    () => typeof window !== "undefined" && !!localStorage.getItem("mm-lead-captured")
  );
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { sessionId } }),
    [sessionId]
  );

  const { messages, sendMessage, status, error } = useChat({
    id: "mm-chat",
    transport,
    messages: welcomeMessages,
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Show lead capture after 3 user messages if not already captured
  useEffect(() => {
    const userMessageCount = messages.filter((m) => m.role === "user").length;
    if (userMessageCount >= 3 && !leadCaptured && !showLeadForm) {
      setShowLeadForm(true);
    }
  }, [messages, leadCaptured, showLeadForm]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadForm]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName && !leadEmail && !leadPhone) return;

    await fetch("/api/chat/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, name: leadName, email: leadEmail, phone: leadPhone }),
    });

    setLeadCaptured(true);
    setShowLeadForm(false);
    localStorage.setItem("mm-lead-captured", "true");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[70vh] bg-white border border-[#e5e5e5] shadow-lg flex flex-col">
      {/* Header */}
      <div className="bg-[#808080] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <p className="font-medium text-sm">Marion</p>
          <p className="text-xs text-white/70">MM Counselling Assistant</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-[#f9f9f9] text-[#1b1b1b]"
                  : "bg-white border border-[#e5e5e5] text-[#1b1b1b]"
              }`}
            >
              {getMessageText(message)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#e5e5e5] px-3 py-2 text-sm text-[#808080]">
              <span className="animate-pulse">Marion is typing...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-start">
            <div className="bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
              Sorry, something went wrong. Please try again.
            </div>
          </div>
        )}

        {/* Lead Capture Form */}
        {showLeadForm && !leadCaptured && (
          <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-3">
            <p className="text-xs text-[#595959] mb-2">
              Would you like Marion to get back to you? Leave your details below.
            </p>
            <form onSubmit={handleLeadSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Your name"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full px-3 py-1.5 border border-[#e5e5e5] text-xs focus:outline-none focus:border-[#808080]"
              />
              <input
                type="email"
                placeholder="Your email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="w-full px-3 py-1.5 border border-[#e5e5e5] text-xs focus:outline-none focus:border-[#808080]"
              />
              <input
                type="tel"
                placeholder="Your phone number"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                className="w-full px-3 py-1.5 border border-[#e5e5e5] text-xs focus:outline-none focus:border-[#808080]"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-[#1b1b1b] text-white px-3 py-1.5 text-xs hover:bg-[#333] transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLeadForm(false);
                    setLeadCaptured(true);
                  }}
                  className="text-xs text-[#808080] hover:text-[#595959]"
                >
                  No thanks
                </button>
              </div>
            </form>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleFormSubmit}
        className="border-t border-[#e5e5e5] p-3 flex gap-2 flex-shrink-0"
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="p-2 bg-[#1b1b1b] text-white hover:bg-[#333] transition-colors disabled:opacity-30"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

export function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Chat Window — only mount when open AND sessionId is ready */}
      {isOpen && sessionId && <ChatInner sessionId={sessionId} />}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-[#808080] text-white shadow-lg hover:bg-[#6a6a6a] transition-colors flex items-center justify-center"
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
