"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

interface LeadDetail {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  conversation: {
    id: string;
    messages: ChatMessage[];
  } | null;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-yellow-50 text-yellow-700",
  booked: "bg-green-50 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [notesChanged, setNotesChanged] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  // Draft email state
  const [showEmail, setShowEmail] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [generatingDraft, setGeneratingDraft] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setLead(data);
      setNotes(data.notes || "");
    } catch (e) {
      console.error("Failed to fetch lead:", e);
    }
    setLoading(false);
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      setNotesChanged(false);
    } catch (e) {
      console.error("Failed to save notes:", e);
    }
    setSavingNotes(false);
  };

  const updateStatus = async (status: string) => {
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setLead((prev) => (prev ? { ...prev, status } : null));
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const generateDraft = async () => {
    setGeneratingDraft(true);
    setEmailError("");
    setShowEmail(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}/draft-reply`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate draft");
      }
      const data = await res.json();
      setEmailSubject(data.subject);
      setEmailBody(data.body);
    } catch (e) {
      setEmailError(e instanceof Error ? e.message : "Failed to generate draft");
    }
    setGeneratingDraft(false);
  };

  const sendEmail = async () => {
    setSendingEmail(true);
    setEmailError("");
    try {
      const res = await fetch(`/api/admin/leads/${id}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: emailSubject, body: emailBody }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send email");
      }
      setEmailSent(true);
      setLead((prev) => (prev ? { ...prev, status: "contacted" } : null));
    } catch (e) {
      setEmailError(e instanceof Error ? e.message : "Failed to send email");
    }
    setSendingEmail(false);
  };

  if (loading) {
    return <p className="text-sm text-[#595959]">Loading...</p>;
  }

  if (!lead) {
    return <p className="text-sm text-[#595959]">Lead not found.</p>;
  }

  return (
    <div>
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1 text-sm text-[#595959] hover:text-[#1b1b1b] mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Leads
      </Link>

      {/* Lead Info */}
      <div className="bg-white border border-[#e5e5e5] p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-semibold text-[#1b1b1b]">
                {lead.name}
              </h1>
              <span
                className={`text-xs px-2 py-0.5 ${statusColors[lead.status] || "bg-gray-100 text-gray-500"}`}
              >
                {lead.status}
              </span>
            </div>

            <div className="space-y-1">
              {lead.email && (
                <p className="flex items-center gap-2 text-sm text-[#595959]">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${lead.email}`} className="hover:text-[#1b1b1b] underline underline-offset-4">
                    {lead.email}
                  </a>
                </p>
              )}
              {lead.phone && (
                <p className="flex items-center gap-2 text-sm text-[#595959]">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${lead.phone}`} className="hover:text-[#1b1b1b] underline underline-offset-4">
                    {lead.phone}
                  </a>
                </p>
              )}
            </div>

            <p className="text-xs text-[#808080] mt-2">
              Received{" "}
              {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-[#595959]">Status:</label>
            <select
              value={lead.status}
              onChange={(e) => updateStatus(e.target.value)}
              className="text-sm border border-[#e5e5e5] px-3 py-1.5 focus:outline-none focus:border-[#808080]"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="booked">Booked</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Conversation + Notes */}
        <div className="space-y-6">
          {/* Conversation History */}
          {lead.conversation && lead.conversation.messages.length > 0 && (
            <div className="bg-white border border-[#e5e5e5] p-6">
              <h2 className="text-sm font-semibold text-[#1b1b1b] mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat Conversation
              </h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {lead.conversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#f9f9f9] text-[#1b1b1b]"
                          : "bg-white border border-[#e5e5e5] text-[#1b1b1b]"
                      }`}
                    >
                      <p className="text-[10px] text-[#808080] mb-1">
                        {msg.role === "user" ? lead.name : "Marion (AI)"}
                      </p>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white border border-[#e5e5e5] p-6">
            <h2 className="text-sm font-semibold text-[#1b1b1b] mb-3">
              Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setNotesChanged(true);
              }}
              placeholder="Add private notes about this lead..."
              rows={4}
              className="w-full px-3 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-none"
            />
            {notesChanged && (
              <button
                type="button"
                onClick={saveNotes}
                disabled={savingNotes}
                className="mt-2 px-4 py-1.5 bg-[#1b1b1b] text-white text-xs hover:bg-[#333] transition-colors disabled:opacity-50"
              >
                {savingNotes ? "Saving..." : "Save Notes"}
              </button>
            )}
          </div>
        </div>

        {/* Right column: Email Reply */}
        <div>
          <div className="bg-white border border-[#e5e5e5] p-6">
            <h2 className="text-sm font-semibold text-[#1b1b1b] mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Reply to Lead
            </h2>

            {!lead.email ? (
              <p className="text-xs text-[#595959]">
                No email address available for this lead. You can reach them
                {lead.phone ? ` by phone at ${lead.phone}` : " once they provide contact details"}.
              </p>
            ) : emailSent ? (
              <div className="bg-green-50 border border-green-200 p-4">
                <p className="text-sm text-green-700 font-medium">Email sent successfully</p>
                <p className="text-xs text-green-600 mt-1">
                  Your reply has been sent to {lead.email}. The lead status has been updated to &ldquo;Contacted&rdquo;.
                </p>
              </div>
            ) : (
              <>
                {!showEmail && (
                  <button
                    type="button"
                    onClick={generateDraft}
                    disabled={generatingDraft}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1b1b1b] text-white text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    {generatingDraft ? "Generating..." : "Generate Draft Reply"}
                  </button>
                )}

                {showEmail && (
                  <div className="space-y-4">
                    {generatingDraft ? (
                      <div className="flex items-center gap-2 py-8 justify-center text-sm text-[#595959]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating personalised draft...
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs text-[#595959] mb-1">
                            To
                          </label>
                          <input
                            type="text"
                            value={lead.email}
                            disabled
                            className="w-full px-3 py-2 border border-[#e5e5e5] text-sm bg-[#f9f9f9] text-[#595959]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-[#595959] mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            className="w-full px-3 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-[#595959] mb-1">
                            Message
                          </label>
                          <textarea
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                            rows={12}
                            className="w-full px-3 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-none leading-relaxed"
                          />
                        </div>

                        {emailError && (
                          <div className="bg-red-50 border border-red-200 p-3">
                            <p className="text-xs text-red-600">{emailError}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={sendEmail}
                            disabled={sendingEmail || !emailSubject || !emailBody}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1b1b1b] text-white text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
                          >
                            <Send className="h-4 w-4" />
                            {sendingEmail ? "Sending..." : "Send Email"}
                          </button>
                          <button
                            type="button"
                            onClick={generateDraft}
                            disabled={generatingDraft}
                            className="flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] text-sm text-[#595959] hover:border-[#808080] transition-colors disabled:opacity-50"
                          >
                            <Sparkles className="h-4 w-4" />
                            Regenerate
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
