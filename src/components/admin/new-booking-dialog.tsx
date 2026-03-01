"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface NewBookingDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  initialDate?: string;
}

export function NewBookingDialog({
  open,
  onClose,
  onCreated,
  initialDate,
}: NewBookingDialogProps) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: initialDate || new Date().toISOString().split("T")[0],
    startTime: "09:00",
    sessionType: "individual" as "individual" | "couples",
    notes: "",
  });

  if (!open) return null;

  const fee = form.sessionType === "couples" ? 60 : 50;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const [hours, minutes] = form.startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + 50;
    const endTime = `${Math.floor(totalMinutes / 60).toString().padStart(2, "0")}:${(totalMinutes % 60).toString().padStart(2, "0")}`;

    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        endTime,
        fee,
      }),
    });

    if (res.ok) {
      setForm({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        date: initialDate || new Date().toISOString().split("T")[0],
        startTime: "09:00",
        sessionType: "individual",
        notes: "",
      });
      onCreated();
      onClose();
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
          <h2 className="text-lg font-semibold text-[#1b1b1b]">
            New Booking
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#595959] hover:text-[#1b1b1b]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-[#595959] mb-1.5">
              Client Name *
            </label>
            <input
              type="text"
              required
              value={form.clientName}
              onChange={(e) =>
                setForm({ ...form, clientName: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#595959] mb-1.5">
              Email *
            </label>
            <input
              type="email"
              required
              value={form.clientEmail}
              onChange={(e) =>
                setForm({ ...form, clientEmail: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#595959] mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={form.clientPhone}
              onChange={(e) =>
                setForm({ ...form, clientPhone: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#595959] mb-1.5">
                Date *
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#595959] mb-1.5">
                Time *
              </label>
              <input
                type="time"
                required
                value={form.startTime}
                onChange={(e) =>
                  setForm({ ...form, startTime: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#595959] mb-1.5">
              Session Type
            </label>
            <select
              value={form.sessionType}
              onChange={(e) =>
                setForm({
                  ...form,
                  sessionType: e.target.value as "individual" | "couples",
                })
              }
              className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] bg-white"
            >
              <option value="individual">Individual (£50)</option>
              <option value="couples">Couples (£60)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-[#595959] mb-1.5">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#e5e5e5] text-[#595959] px-4 py-2 text-sm hover:bg-[#f9f9f9] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#1b1b1b] text-white px-6 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50 inline-flex items-center gap-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
