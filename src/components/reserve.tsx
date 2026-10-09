"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SectionHeader from "@/components/section-header";
import { Field, SelectField } from "@/components/field";

const TIME_SLOTS = [
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

const PARTY_SIZES = ["2 people", "3 people", "4 people", "5 people", "6 people", "8 people", "10+ people"];

export default function Reserve() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("6:00 PM");
  const [guests, setGuests] = useState("2 people");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || status === "sending") {
      if (!name.trim()) setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      const content = `📅 BOOKING REQUEST\n\n📆 ${formattedDate} · ${time}\n👥 ${guests}\n👤 ${name.trim()}${phone.trim() ? `\n📱 ${phone.trim()}` : ""}`;
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
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="reserve" className="bg-white">
      <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <SectionHeader
          align="center"
          eyebrow="Reservations"
          title="Book a table"
          lede="Send a request and we'll confirm by phone — Friday and Saturday nights fill up fast."
        />

        <form onSubmit={handleSubmit} className="mt-12 grid gap-8 sm:grid-cols-2" data-reveal>
          <Field
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <SelectField label="Time" value={time} onChange={(e) => setTime(e.target.value)}>
            {TIME_SLOTS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </SelectField>
          <SelectField label="Party size" value={guests} onChange={(e) => setGuests(e.target.value)}>
            {PARTY_SIZES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </SelectField>
          <Field
            label="Phone"
            type="tel"
            placeholder="We'll confirm here"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="sm:col-span-2">
            <Field
              label="Name *"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              required
            />
          </div>

          <div className="sm:col-span-2 flex flex-col items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="w-full rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light disabled:opacity-60 sm:w-auto"
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Request sent"
                  : "Request this table"}
            </button>

            {status === "sent" && (
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                <Check className="h-4 w-4" />
                Request received — we&apos;ll call to confirm.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-red-600">
                {name.trim() ? "Couldn't send — please try again." : "Please enter your name."}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
