"use client";

import { useState, useEffect } from "react";
import { Mail, AlertCircle, CheckCircle2, Search } from "lucide-react";

interface EmailLogEntry {
  id: string;
  to: string;
  subject: string;
  type: string;
  status: string;
  error: string | null;
  leadId: string | null;
  bookingId: string | null;
  resendId: string | null;
  createdAt: string;
  lead: { id: string; name: string; email: string | null } | null;
}

const typeLabels: Record<string, string> = {
  booking_confirmation: "Booking Confirmation",
  booking_reschedule: "Booking Reschedule",
  booking_cancellation: "Booking Cancellation",
  booking_notification: "Booking Notification",
  enquiry_notification: "Enquiry Notification",
  admin_reply: "Admin Reply",
};

const typeColors: Record<string, string> = {
  booking_confirmation: "bg-green-50 text-green-700",
  booking_reschedule: "bg-blue-50 text-blue-700",
  booking_cancellation: "bg-red-50 text-red-700",
  booking_notification: "bg-purple-50 text-purple-700",
  enquiry_notification: "bg-yellow-50 text-yellow-700",
  admin_reply: "bg-indigo-50 text-indigo-700",
};

export default function EmailsPage() {
  const [emails, setEmails] = useState<EmailLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmails();
  }, [typeFilter, statusFilter]);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/emails?type=${typeFilter}&status=${statusFilter}`
      );
      const data = await res.json();
      setEmails(data);
    } catch (e) {
      console.error("Failed to fetch emails:", e);
    }
    setLoading(false);
  };

  const filteredEmails = search
    ? emails.filter(
        (e) =>
          e.to.toLowerCase().includes(search.toLowerCase()) ||
          e.subject.toLowerCase().includes(search.toLowerCase()) ||
          e.lead?.name.toLowerCase().includes(search.toLowerCase())
      )
    : emails;

  const sentCount = emails.filter((e) => e.status === "sent").length;
  const failedCount = emails.filter((e) => e.status === "failed").length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#1b1b1b]">Emails</h1>
          <p className="text-sm text-[#595959] mt-1">
            Log of all outbound emails sent by the system
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            {sentCount} sent
          </span>
          {failedCount > 0 && (
            <span className="flex items-center gap-1 text-red-600">
              <AlertCircle className="h-4 w-4" />
              {failedCount} failed
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-xs text-[#595959]">Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs border border-[#e5e5e5] px-2 py-1.5 focus:outline-none focus:border-[#808080]"
          >
            <option value="all">All Types</option>
            <option value="booking_confirmation">Booking Confirmation</option>
            <option value="booking_reschedule">Booking Reschedule</option>
            <option value="booking_cancellation">Booking Cancellation</option>
            <option value="booking_notification">Booking Notification</option>
            <option value="enquiry_notification">Enquiry Notification</option>
            <option value="admin_reply">Admin Reply</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-[#595959]">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-[#e5e5e5] px-2 py-1.5 focus:outline-none focus:border-[#808080]"
          >
            <option value="all">All</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#808080]" />
        <input
          type="text"
          placeholder="Search by recipient, subject, or lead name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
        />
      </div>

      {loading ? (
        <p className="text-sm text-[#595959]">Loading emails...</p>
      ) : filteredEmails.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="h-8 w-8 text-[#e5e5e5] mx-auto mb-3" />
          <p className="text-sm text-[#595959]">
            {search
              ? "No emails match your search."
              : "No emails logged yet. They will appear here as emails are sent."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className="bg-white border border-[#e5e5e5] p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 ${typeColors[email.type] || "bg-gray-100 text-gray-500"}`}
                    >
                      {typeLabels[email.type] || email.type}
                    </span>
                    {email.status === "failed" && (
                      <span className="text-xs px-2 py-0.5 bg-red-50 text-red-600">
                        Failed
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-[#1b1b1b] truncate">
                    {email.subject}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="text-xs text-[#595959]">
                      To: {email.to}
                    </span>
                    {email.lead && (
                      <a
                        href={`/admin/leads/${email.lead.id}`}
                        className="text-xs text-[#595959] underline underline-offset-2 hover:text-[#1b1b1b]"
                      >
                        Lead: {email.lead.name}
                      </a>
                    )}
                  </div>
                  {email.error && (
                    <p className="text-xs text-red-500 mt-1 truncate">
                      Error: {email.error}
                    </p>
                  )}
                </div>
                <p className="text-xs text-[#808080] whitespace-nowrap">
                  {new Date(email.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
