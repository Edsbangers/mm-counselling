"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlus, Mail, Phone, MessageSquare, Search } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
  conversation: {
    id: string;
    _count: { messages: number };
  } | null;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-yellow-50 text-yellow-700",
  booked: "bg-green-50 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  booked: "Booked",
  closed: "Closed",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?status=${filter}`);
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      console.error("Failed to fetch leads:", e);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const filteredLeads = search
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.email?.toLowerCase().includes(search.toLowerCase()) ||
          l.phone?.includes(search)
      )
    : leads;

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    booked: leads.filter((l) => l.status === "booked").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#1b1b1b]">Leads</h1>
          <p className="text-sm text-[#595959] mt-1">
            Manage enquiries from the website chat
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "new", "contacted", "booked", "closed"] as const).map(
          (s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                filter === s
                  ? "bg-[#1b1b1b] text-white border-[#1b1b1b]"
                  : "bg-white text-[#595959] border-[#e5e5e5] hover:border-[#808080]"
              }`}
            >
              {s === "all" ? "All" : statusLabels[s]} ({counts[s]})
            </button>
          )
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#808080]" />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
        />
      </div>

      {loading ? (
        <p className="text-sm text-[#595959]">Loading leads...</p>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-12">
          <UserPlus className="h-8 w-8 text-[#e5e5e5] mx-auto mb-3" />
          <p className="text-sm text-[#595959]">
            {search ? "No leads match your search." : "No leads yet. They'll appear here when visitors leave their details in the chat."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredLeads.map((lead) => (
            <Link
              key={lead.id}
              href={`/admin/leads/${lead.id}`}
              className="block bg-white border border-[#e5e5e5] p-4 hover:border-[#808080] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-[#1b1b1b]">
                      {lead.name}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 ${statusColors[lead.status] || "bg-gray-100 text-gray-500"}`}
                    >
                      {statusLabels[lead.status] || lead.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    {lead.email && (
                      <span className="flex items-center gap-1 text-xs text-[#595959]">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </span>
                    )}
                    {lead.phone && (
                      <span className="flex items-center gap-1 text-xs text-[#595959]">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </span>
                    )}
                    {lead.conversation && (
                      <span className="flex items-center gap-1 text-xs text-[#808080]">
                        <MessageSquare className="h-3 w-3" />
                        {lead.conversation._count.messages} messages
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateStatus(lead.id, e.target.value);
                    }}
                    onClick={(e) => e.preventDefault()}
                    className="text-xs border border-[#e5e5e5] px-2 py-1 focus:outline-none focus:border-[#808080]"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="booked">Booked</option>
                    <option value="closed">Closed</option>
                  </select>
                  <p className="text-xs text-[#808080] whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
