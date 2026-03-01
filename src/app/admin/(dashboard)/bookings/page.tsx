"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import type { View } from "react-big-calendar";
import { CalendarView } from "@/components/admin/calendar-view";
import { BookingDetailPanel } from "@/components/admin/booking-detail-panel";
import { NewBookingDialog } from "@/components/admin/new-booking-dialog";
import type { BookingRecord } from "@/lib/bookings";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("week");
  const [date, setDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(
    null
  );
  const [showNewDialog, setShowNewDialog] = useState(false);

  const fetchBookings = useCallback(async () => {
    const rangeStart = subMonths(startOfMonth(date), 1);
    const rangeEnd = addMonths(endOfMonth(date), 1);
    const start = format(rangeStart, "yyyy-MM-dd");
    const end = format(rangeEnd, "yyyy-MM-dd");

    try {
      const res = await fetch(`/api/admin/bookings?start=${start}&end=${end}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (e) {
      console.error("Failed to fetch bookings:", e);
    }
    setLoading(false);
  }, [date]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleReschedule = async (
    id: string,
    newDate: string,
    newTime: string
  ) => {
    if (!confirm(`Reschedule this booking to ${newDate} at ${newTime}?`))
      return;

    await fetch(`/api/admin/bookings/${id}/reschedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newDate, newTime }),
    });

    fetchBookings();
  };

  const handleSelectEvent = (booking: BookingRecord) => {
    setSelectedBooking(booking);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#1b1b1b]">Bookings</h1>
        <button
          type="button"
          onClick={() => setShowNewDialog(true)}
          className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Booking
        </button>
      </div>

      {/* Status legend */}
      <div className="flex items-center gap-4 mb-4 text-xs text-[#595959]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-yellow-100 border-l-2 border-yellow-500" />
          Pending
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-green-100 border-l-2 border-green-500" />
          Confirmed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-blue-100 border-l-2 border-blue-500" />
          Rescheduled
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-red-100 border-l-2 border-red-500" />
          Cancelled
        </span>
      </div>

      {loading ? (
        <p className="text-sm text-[#595959]">Loading bookings...</p>
      ) : (
        <CalendarView
          bookings={bookings}
          view={view}
          date={date}
          onViewChange={setView}
          onDateChange={setDate}
          onSelectEvent={handleSelectEvent}
          onReschedule={handleReschedule}
        />
      )}

      <BookingDetailPanel
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onUpdated={() => {
          setSelectedBooking(null);
          fetchBookings();
        }}
      />

      <NewBookingDialog
        open={showNewDialog}
        onClose={() => setShowNewDialog(false)}
        onCreated={fetchBookings}
        initialDate={format(date, "yyyy-MM-dd")}
      />
    </div>
  );
}
