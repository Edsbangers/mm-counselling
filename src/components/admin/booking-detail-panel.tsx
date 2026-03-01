"use client";

import { useState } from "react";
import { X, Loader2, Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import type { BookingRecord } from "@/lib/bookings";

interface BookingDetailPanelProps {
  booking: BookingRecord | null;
  onClose: () => void;
  onUpdated: () => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
  rescheduled: "bg-blue-50 text-blue-700",
};

export function BookingDetailPanel({
  booking,
  onClose,
  onUpdated,
}: BookingDetailPanelProps) {
  const [loading, setLoading] = useState(false);
  const [rescheduleMode, setRescheduleMode] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  if (!booking) return null;

  const handleStatusChange = async (status: string) => {
    setLoading(true);
    if (status === "cancelled") {
      await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
    } else {
      await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    }
    setLoading(false);
    onUpdated();
  };

  const handleReschedule = async () => {
    if (!newDate || !newTime) return;
    setLoading(true);
    await fetch(`/api/admin/bookings/${booking.id}/reschedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newDate, newTime }),
    });
    setLoading(false);
    setRescheduleMode(false);
    onUpdated();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this booking permanently?")) return;
    setLoading(true);
    await fetch(`/api/admin/bookings/${booking.id}`, {
      method: "DELETE",
    });
    setLoading(false);
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-[#e5e5e5] shadow-lg z-40 overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
        <h2 className="text-lg font-semibold text-[#1b1b1b]">
          Booking Details
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-[#595959] hover:text-[#1b1b1b]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Status */}
        <div className="flex items-center gap-3">
          <span
            className={`text-xs px-2.5 py-1 font-medium ${statusColors[booking.status] || "bg-gray-50 text-gray-700"}`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
          <span className="text-xs text-[#808080]">
            {booking.sessionType === "couples" ? "Couples" : "Individual"} — £
            {booking.fee}
          </span>
        </div>

        {/* Client info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-[#808080]" />
            <span className="text-sm text-[#1b1b1b]">
              {booking.clientName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-[#808080]" />
            <a
              href={`mailto:${booking.clientEmail}`}
              className="text-sm text-[#1b1b1b] underline underline-offset-4"
            >
              {booking.clientEmail}
            </a>
          </div>
          {booking.clientPhone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#808080]" />
              <a
                href={`tel:${booking.clientPhone}`}
                className="text-sm text-[#1b1b1b] underline underline-offset-4"
              >
                {booking.clientPhone}
              </a>
            </div>
          )}
        </div>

        {/* Date & time */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-[#808080]" />
            <span className="text-sm text-[#1b1b1b]">
              {format(new Date(booking.date + "T00:00:00"), "EEEE, dd MMMM yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-[#808080]" />
            <span className="text-sm text-[#1b1b1b]">
              {booking.startTime} — {booking.endTime}
            </span>
          </div>
        </div>

        {/* Previous date (if rescheduled) */}
        {booking.previousDate && (
          <div className="bg-blue-50 p-3">
            <p className="text-xs text-blue-700">
              Rescheduled from{" "}
              {format(
                new Date(booking.previousDate + "T00:00:00"),
                "dd MMMM yyyy"
              )}{" "}
              at {booking.previousTime}
            </p>
          </div>
        )}

        {/* Notes */}
        {booking.notes && (
          <div>
            <p className="text-xs text-[#808080] mb-1">Notes</p>
            <p className="text-sm text-[#595959]">{booking.notes}</p>
          </div>
        )}

        {/* Reschedule form */}
        {rescheduleMode && (
          <div className="bg-[#f9f9f9] p-4 space-y-3">
            <p className="text-sm font-medium text-[#1b1b1b]">
              Reschedule to:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="px-3 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
              />
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="px-3 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReschedule}
                disabled={loading || !newDate || !newTime}
                className="bg-[#1b1b1b] text-white px-4 py-1.5 text-sm hover:bg-[#333] disabled:opacity-50 inline-flex items-center gap-2"
              >
                {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setRescheduleMode(false)}
                className="border border-[#e5e5e5] text-[#595959] px-4 py-1.5 text-sm hover:bg-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {booking.status !== "cancelled" && (
          <div className="flex flex-wrap gap-2 pt-2">
            {booking.status === "pending" && (
              <button
                type="button"
                onClick={() => handleStatusChange("confirmed")}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-1.5 text-sm hover:bg-green-700 disabled:opacity-50"
              >
                Confirm
              </button>
            )}
            {!rescheduleMode && (
              <button
                type="button"
                onClick={() => {
                  setNewDate(booking.date);
                  setNewTime(booking.startTime);
                  setRescheduleMode(true);
                }}
                className="border border-[#e5e5e5] text-[#1b1b1b] px-4 py-1.5 text-sm hover:bg-[#f9f9f9]"
              >
                Reschedule
              </button>
            )}
            <button
              type="button"
              onClick={() => handleStatusChange("cancelled")}
              disabled={loading}
              className="border border-red-200 text-red-600 px-4 py-1.5 text-sm hover:bg-red-50 disabled:opacity-50"
            >
              Cancel Booking
            </button>
          </div>
        )}

        {/* Delete */}
        <div className="pt-4 border-t border-[#e5e5e5]">
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
          >
            Delete permanently
          </button>
          <p className="text-xs text-[#808080] mt-1">
            Created{" "}
            {format(new Date(booking.createdAt), "dd MMM yyyy, HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
}
