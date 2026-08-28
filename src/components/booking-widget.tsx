"use client";

import { useState } from "react";
import { Calendar, Users, MessageCircle } from "lucide-react";

export default function BookingWidget({ onToast }: { onToast: (msg: string) => void }) {
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0, 10));
  const [bookingGuests, setBookingGuests] = useState("2 people");

  const waReserveUrl = `https://wa.me/639319704073?text=${encodeURIComponent(`Hi Giuseppe's! Table for ${bookingGuests} on ${bookingDate} ... Please confirm availability.`)}`;

  return (
    <div className="rounded-2xl bg-zinc-900 p-6 text-white">
      <h3 className="font-serif text-lg font-semibold">Book a table</h3>
      <p className="mt-1 text-sm text-white/70">Reserve your spot — especially for Friday & Saturday nights.</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/10 p-3">
          <div className="flex items-center gap-1.5 text-xs text-white/70"><Calendar className="h-3 w-3" /> Date</div>
          <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-medium outline-none" />
        </div>
        <div className="rounded-xl bg-white/10 p-3">
          <div className="flex items-center gap-1.5 text-xs text-white/70"><Users className="h-3 w-3" /> Guests</div>
          <select value={bookingGuests} onChange={e => setBookingGuests(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-medium outline-none">
            <option className="text-zinc-900">2 people</option>
            <option className="text-zinc-900">3 people</option>
            <option className="text-zinc-900">4 people</option>
            <option className="text-zinc-900">5+ people</option>
            <option className="text-zinc-900">6 people</option>
            <option className="text-zinc-900">8 people</option>
          </select>
        </div>
      </div>
      <button onClick={() => onToast("Table request sent — we'll call to confirm")} className="mt-3 w-full rounded-full bg-white py-2.5 text-sm font-semibold text-zinc-900 hover:bg-stone-100">Request table</button>
      <a
        href={waReserveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2.5 text-sm font-semibold text-white hover:bg-[#20bd5a]"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp to Reserve
      </a>
      <p className="mt-2 text-center text-[11px] text-white/50">Prefills: Table for {bookingGuests} on {bookingDate || "your date"}</p>
    </div>
  );
}
