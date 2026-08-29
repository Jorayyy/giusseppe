"use client";

import { useState } from "react";
import { PartyPopper, Send } from "lucide-react";

export default function EventForm({ onToast }: { onToast: (msg: string) => void }) {
  const [eventForm, setEventForm] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "10",
    type: "Birthday",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.name || !eventForm.phone) {
      onToast("Please enter name and phone");
      return;
    }
    fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: "customer",
        name: eventForm.name,
        phone: eventForm.phone,
        content: `🎉 PRIVATE DINING INQUIRY\n\n📆 ${eventForm.date || "Flexible"}\n👥 ${eventForm.guests} guests\n🎂 ${eventForm.type}\n💬 ${eventForm.message || "-"}\n\n👤 ${eventForm.name}\n📱 ${eventForm.phone}`,
      }),
    }).catch(() => {});
    onToast("Inquiry sent — we'll call to confirm");
  };

  return (
    <section id="events" className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-primary-light">
          <PartyPopper className="h-4 w-4" />
        </div>
        <h3 className="font-serif text-lg font-semibold">Private Dining & Catering</h3>
      </div>
      <p className="mt-1 text-sm text-stone-600">Birthdays, corporate, wine nights — our terrace seats 30</p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-stone-700">Name</label>
            <input
              value={eventForm.name}
              onChange={e => setEventForm({ ...eventForm, name: e.target.value })}
              placeholder="Juan Dela Cruz"
              required
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-700">Phone</label>
            <input
              value={eventForm.phone}
              onChange={e => setEventForm({ ...eventForm, phone: e.target.value })}
              placeholder="09xx xxx xxxx"
              required
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-stone-700">Date</label>
            <input
              type="date"
              value={eventForm.date}
              onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-700">Guests</label>
            <input
              type="number"
              min={1}
              value={eventForm.guests}
              onChange={e => setEventForm({ ...eventForm, guests: e.target.value })}
              placeholder="20"
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-700">Event Type</label>
          <select
            value={eventForm.type}
            onChange={e => setEventForm({ ...eventForm, type: e.target.value })}
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option>Birthday</option>
            <option>Corporate</option>
            <option>Wine Night</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-700">Message</label>
          <textarea
            value={eventForm.message}
            onChange={e => setEventForm({ ...eventForm, message: e.target.value })}
            placeholder="Tell us about your event — birthday, grazing table, wine pairing..."
            rows={3}
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <button type="submit" className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-light">
          <Send className="h-4 w-4" /> Send inquiry
        </button>
        <p className="text-center text-[11px] text-stone-400">We reply within 2 hrs</p>
      </form>
    </section>
  );
}
