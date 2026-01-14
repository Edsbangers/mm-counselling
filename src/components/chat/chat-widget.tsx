"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/site-config";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const CRISIS_DISCLAIMER = `This is an informational assistant only. If you are in crisis or experiencing thoughts of self-harm, please contact:
- Samaritans: 116 123 (free, 24/7)
- Crisis Text Line: Text SHOUT to 85258
- NHS 111 (Option 2 for mental health)
- In emergency, call 999`;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "I apologise, I was unable to generate a response. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologise, something went wrong. Please try again or contact us directly.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-sage hover:bg-sage-dark text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-sage text-white p-4">
            <h3 className="font-semibold text-lg">MM Counselling Assistant</h3>
            <p className="text-sm opacity-90">
              Ask about services, fees, or booking
            </p>
          </div>

          {/* Crisis Disclaimer */}
          <div className="bg-amber-50 border-b border-amber-200 p-3 flex gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              <strong>Not a crisis service.</strong> If you need urgent support,
              please call Samaritans on 116 123 or text SHOUT to 85258.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px] min-h-[200px]">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <p className="mb-4">Hello! I can help you with:</p>
                <ul className="space-y-2 text-left max-w-[280px] mx-auto">
                  <li>- Information about our services</li>
                  <li>- Session fees and availability</li>
                  <li>- How to book an appointment</li>
                  <li>- What to expect from counselling</li>
                </ul>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-sage text-white rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
