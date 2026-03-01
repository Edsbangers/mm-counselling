import { getKv } from "./kv";

export interface BookingRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  date: string;
  startTime: string;
  endTime: string;
  sessionType: "individual" | "couples";
  status: "pending" | "confirmed" | "cancelled" | "rescheduled";
  fee: number;
  notes?: string;
  googleCalendarEventId?: string;
  previousDate?: string;
  previousTime?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateBookingInput = Omit<
  BookingRecord,
  "id" | "status" | "createdAt" | "updatedAt" | "googleCalendarEventId" | "previousDate" | "previousTime"
>;

function generateId(): string {
  return `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function createBooking(
  input: CreateBookingInput
): Promise<BookingRecord | null> {
  const kv = await getKv();
  if (!kv) return null;

  const now = new Date().toISOString();
  const booking: BookingRecord = {
    ...input,
    id: generateId(),
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  await kv.set(`booking:${booking.id}`, JSON.stringify(booking));

  // Update date index
  const dateKey = `bookings:date:${booking.date}`;
  const existingDateIds = await kv.get<string[]>(dateKey);
  const dateIds = existingDateIds ?? [];
  dateIds.push(booking.id);
  await kv.set(dateKey, JSON.stringify(dateIds));

  // Update client index
  if (booking.clientEmail) {
    const clientKey = `bookings:client:${booking.clientEmail.toLowerCase()}`;
    const existingClientIds = await kv.get<string[]>(clientKey);
    const clientIds = existingClientIds ?? [];
    clientIds.push(booking.id);
    await kv.set(clientKey, JSON.stringify(clientIds));
  }

  return booking;
}

export async function getBooking(
  id: string
): Promise<BookingRecord | null> {
  const kv = await getKv();
  if (!kv) return null;

  const data = await kv.get<BookingRecord>(`booking:${id}`);
  return data ?? null;
}

export async function getBookingsByDate(
  date: string
): Promise<BookingRecord[]> {
  const kv = await getKv();
  if (!kv) return [];

  const dateKey = `bookings:date:${date}`;
  const ids = await kv.get<string[]>(dateKey);
  if (!ids || ids.length === 0) return [];

  const bookings = await Promise.all(
    ids.map((id) => kv.get<BookingRecord>(`booking:${id}`))
  );

  return bookings.filter((b): b is BookingRecord => b !== null);
}

export async function getBookingsByDateRange(
  startDate: string,
  endDate: string
): Promise<BookingRecord[]> {
  const kv = await getKv();
  if (!kv) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  for (
    let d = new Date(start);
    d <= end;
    d.setDate(d.getDate() + 1)
  ) {
    dates.push(d.toISOString().split("T")[0]);
  }

  const allBookings = await Promise.all(
    dates.map((date) => getBookingsByDate(date))
  );

  return allBookings.flat();
}

export async function updateBooking(
  id: string,
  updates: Partial<
    Pick<
      BookingRecord,
      | "clientName"
      | "clientEmail"
      | "clientPhone"
      | "date"
      | "startTime"
      | "endTime"
      | "sessionType"
      | "status"
      | "fee"
      | "notes"
      | "googleCalendarEventId"
    >
  >
): Promise<BookingRecord | null> {
  const kv = await getKv();
  if (!kv) return null;

  const existing = await getBooking(id);
  if (!existing) return null;

  const oldDate = existing.date;
  const updated: BookingRecord = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await kv.set(`booking:${id}`, JSON.stringify(updated));

  // If date changed, update date indexes
  if (updates.date && updates.date !== oldDate) {
    // Remove from old date index
    const oldDateKey = `bookings:date:${oldDate}`;
    const oldIds = await kv.get<string[]>(oldDateKey);
    if (oldIds) {
      const filtered = oldIds.filter((bid) => bid !== id);
      if (filtered.length > 0) {
        await kv.set(oldDateKey, JSON.stringify(filtered));
      } else {
        await kv.del(oldDateKey);
      }
    }

    // Add to new date index
    const newDateKey = `bookings:date:${updates.date}`;
    const newIds = await kv.get<string[]>(newDateKey);
    const dateIds = newIds ?? [];
    dateIds.push(id);
    await kv.set(newDateKey, JSON.stringify(dateIds));
  }

  return updated;
}

export async function rescheduleBooking(
  id: string,
  newDate: string,
  newTime: string
): Promise<BookingRecord | null> {
  const existing = await getBooking(id);
  if (!existing) return null;

  return updateBooking(id, {
    date: newDate,
    startTime: newTime,
    endTime: calculateEndTime(newTime, existing.sessionType),
    status: "rescheduled",
  });
}

export async function cancelBooking(
  id: string
): Promise<BookingRecord | null> {
  return updateBooking(id, { status: "cancelled" });
}

export async function deleteBooking(id: string): Promise<boolean> {
  const kv = await getKv();
  if (!kv) return false;

  const existing = await getBooking(id);
  if (!existing) return false;

  // Remove from date index
  const dateKey = `bookings:date:${existing.date}`;
  const dateIds = await kv.get<string[]>(dateKey);
  if (dateIds) {
    const filtered = dateIds.filter((bid) => bid !== id);
    if (filtered.length > 0) {
      await kv.set(dateKey, JSON.stringify(filtered));
    } else {
      await kv.del(dateKey);
    }
  }

  // Remove from client index
  if (existing.clientEmail) {
    const clientKey = `bookings:client:${existing.clientEmail.toLowerCase()}`;
    const clientIds = await kv.get<string[]>(clientKey);
    if (clientIds) {
      const filtered = clientIds.filter((bid) => bid !== id);
      if (filtered.length > 0) {
        await kv.set(clientKey, JSON.stringify(filtered));
      } else {
        await kv.del(clientKey);
      }
    }
  }

  await kv.del(`booking:${id}`);
  return true;
}

function calculateEndTime(
  startTime: string,
  sessionType: "individual" | "couples"
): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const duration = 50; // 50-minute sessions
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}
