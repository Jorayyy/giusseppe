"use client";

import { useState } from "react";
import { Calendar, Users, User, Phone } from "lucide-react";

export default function BookingWidget({ onToast }: { onToast: (msg: string) => void }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [guests, setGuests] = useState("2 people");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleBook() {
    if (!name.trim()) {
      onToast("Please enter your name");
      return;
    }
    setSending(true);
    try {
      const dateObj = new Date(date + "T12:00:00");
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      const content = `📅 BOOKING REQUEST\n\n📆 ${formattedDate}\n👥 ${guests}\n👤 ${name.trim()}${phone.trim() ? `\n📱 ${phone.trim()}` : ""}`;

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "customer",
          name: name.trim(),
          phone: phone.trim() || null,
          content,
        }),
      });

      if (res.ok) {
        setSent(true);
        onToast("Booking request sent! We'll call to confirm.");
        setTimeout(() => setSent(false), 3000);
      } else {
        onToast("Failed to send. Please try again.");
      }
    } catch {
      onToast("Failed to send. Please try again.");
    }
    setSending(false);
  }

  return (
    <div className="rounded-2xl bg-primary p-5 text-white">
      <h3 className="font-serif text-base font-semibold">Book a table</h3>
      <p className="mt-0.5 text-xs text-white/70">Reserve your spot — especially for Friday & Saturday nights.</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/10 p-2.5">
          <div className="flex items-center gap-1 text-[10px] text-white/70"><Calendar className="h-3 w-3" /> Date</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-xs font-medium outline-none [color-scheme:dark]"
          />
        </div>
        <div className="rounded-lg bg-white/10 p-2.5">
          <div className="flex items-center gap-1 text-[10px] text-white/70"><Users className="h-3 w-3" /> Guests</div>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-xs font-medium outline-none"
          >
            <option className="text-primary">2 people</option>
            <option className="text-primary">3 people</option>
            <option className="text-primary">4 people</option>
            <option className="text-primary">5+ people</option>
            <option className="text-primary">6 people</option>
            <option className="text-primary">8 people</option>
          </select>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="relative rounded-lg bg-white/10 p-2.5">
          <div className="flex items-center gap-1 text-[10px] text-white/70"><User className="h-3 w-3" /> Name</div>
          <input
            type="text"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-xs font-medium outline-none placeholder:text-white/40"
          />
        </div>
        <div className="relative rounded-lg bg-white/10 p-2.5">
          <div className="flex items-center gap-1 text-[10px] text-white/70"><Phone className="h-3 w-3" /> Phone</div>
          <input
            type="tel"
            placeholder="Optional"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-0.5 w-full bg-transparent text-xs font-medium outline-none placeholder:text-white/40"
          />
        </div>
      </div>
      <button
        onClick={handleBook}
        disabled={sending || sent}
        className="mt-2.5 w-full rounded-lg bg-white py-2 text-xs font-semibold text-primary transition hover:bg-stone-100 disabled:opacity-50"
      >
        {sent ? "✓ Sent!" : sending ? "Sending..." : "Request table"}
      </button>
    </div>
  );
}
