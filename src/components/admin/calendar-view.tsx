"use client";

import React, { useCallback, useMemo } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  type Event,
  type View,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enGB } from "date-fns/locale/en-GB";
import type { BookingRecord } from "@/lib/bookings";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const locales = { "en-GB": enGB };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export interface CalendarEvent extends Event {
  id: string;
  booking: BookingRecord;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DnDCalendar = withDragAndDrop(BigCalendar as any);

interface CalendarViewProps {
  bookings: BookingRecord[];
  view: View;
  date: Date;
  onViewChange: (view: View) => void;
  onDateChange: (date: Date) => void;
  onSelectEvent: (booking: BookingRecord) => void;
  onReschedule: (id: string, newDate: string, newTime: string) => void;
}

const statusColors: Record<string, { bg: string; border: string }> = {
  pending: { bg: "#fef9c3", border: "#eab308" },
  confirmed: { bg: "#dcfce7", border: "#22c55e" },
  cancelled: { bg: "#fee2e2", border: "#ef4444" },
  rescheduled: { bg: "#dbeafe", border: "#3b82f6" },
};

export function CalendarView({
  bookings,
  view,
  date,
  onViewChange,
  onDateChange,
  onSelectEvent,
  onReschedule,
}: CalendarViewProps) {
  const events: CalendarEvent[] = useMemo(
    () =>
      bookings
        .filter((b) => b.status !== "cancelled")
        .map((booking) => {
          const start = new Date(`${booking.date}T${booking.startTime}:00`);
          const end = new Date(`${booking.date}T${booking.endTime}:00`);
          return {
            id: booking.id,
            title: `${booking.clientName} (${booking.sessionType === "couples" ? "Couples" : "Individual"})`,
            start,
            end,
            booking,
          };
        }),
    [bookings]
  );

  const eventStyleGetter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const calEvent = event as CalendarEvent;
      const colors = statusColors[calEvent.booking.status] || statusColors.pending;
      return {
        style: {
          backgroundColor: colors.bg,
          borderLeft: `3px solid ${colors.border}`,
          color: "#1b1b1b",
          fontSize: "0.75rem",
          padding: "2px 6px",
          borderRadius: 0,
        },
      };
    },
    []
  );

  const handleEventDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (args: any) => {
      const event = args.event as CalendarEvent;
      const newStart = new Date(args.start);
      const newDateStr = format(newStart, "yyyy-MM-dd");
      const newTimeStr = format(newStart, "HH:mm");
      onReschedule(event.id, newDateStr, newTimeStr);
    },
    [onReschedule]
  );

  const handleSelectEvent = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      onSelectEvent((event as CalendarEvent).booking);
    },
    [onSelectEvent]
  );

  return (
    <div className="bg-white border border-[#e5e5e5] p-2 sm:p-4 overflow-x-auto" style={{ height: 500 }}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        view={view}
        date={date}
        onView={onViewChange as (view: View) => void}
        onNavigate={onDateChange}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        eventPropGetter={eventStyleGetter}
        resizable={false}
        selectable
        step={30}
        timeslots={2}
        min={new Date(2026, 0, 1, 8, 0)}
        max={new Date(2026, 0, 1, 20, 0)}
        formats={{
          dayHeaderFormat: (date: Date) => format(date, "EEEE, dd MMMM yyyy"),
          dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
            `${format(start, "dd MMM")} — ${format(end, "dd MMM yyyy")}`,
        }}
        style={{ height: "100%" }}
      />
    </div>
  );
}
