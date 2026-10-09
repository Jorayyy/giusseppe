"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import SectionHeader from "@/components/section-header";
import { Field, SelectField, TextAreaField } from "@/components/field";

export default function PrivateDining() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("10 people");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || status === "sending") {
      if (!name.trim()) setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const when = date
        ? new Date(date + "T12:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })
        : "Flexible";
      const content = `🎉 PRIVATE DINING / CATERING INQUIRY\n\n👤 ${name.trim()}\n📱 ${phone.trim() || "—"}\n📆 ${when}\n👥 ${guests}${notes.trim() ? `\n\n${notes.trim()}` : ""}`;
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
        setStatus("sent");
        setNotes("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="private-dining" className="bg-background">
      <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <figure className="lg:col-span-5" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/photos/interior-1.jpg"
              alt="The dining room ready for a private event"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow="Private dining & catering"
            title="Celebrate with us"
            lede="Birthdays, christmases, company lunches, whole-room bookings — tell us the occasion and we'll take care of the rest."
          />

          <form onSubmit={handleSubmit} className="mt-10 grid gap-8 sm:grid-cols-2" data-reveal>
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
            <Field
              label="Phone"
              type="tel"
              placeholder="Best number to reach you"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Field label="Event date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <SelectField label="Guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
              {["8 people", "10 people", "15 people", "20 people", "30 people", "40+ people"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </SelectField>
            <div className="sm:col-span-2">
              <TextAreaField
                label="What are we planning?"
                rows={3}
                placeholder="Occasion, set menu ideas, budget — anything helps"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2 flex flex-col items-start gap-4">
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Enquiry sent" : "Send enquiry"}
              </button>

              {status === "sent" && (
                <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                  <Check className="h-4 w-4" />
                  Thanks — we&apos;ll get back to you within a day.
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
      </div>
    </section>
  );
}
