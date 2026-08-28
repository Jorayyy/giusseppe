import { Clock } from "lucide-react";
import { HOURS } from "@/lib/data";

export default function HoursCard({ open, today }: { open: boolean; today: string }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <h2 className="font-serif text-xl font-semibold">Hours</h2>
      <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${open ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
        <Clock className="h-3 w-3" /> {open ? "Open now" : "Closed"} · Opens 11 AM
      </p>
      <div className="mt-4 divide-y divide-stone-100 text-sm">
        {Object.entries(HOURS).map(([day, h]) => (
          <div key={day} className={`flex justify-between py-2 ${day === today ? "font-semibold text-amber-700" : "text-stone-600"}`}>
            <span>{day}</span>
            <span className="tabular-nums">{h.open}–{h.close} · {h.open2}–{h.close2}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs italic text-stone-500">"Italian Restaurant Open Monday, Tuesday, Wednesday, Thursday, Sunday 11:00AM-4:00PM to 5:00PM-9:30PM Friday and Saturday 11:00 AM-4:00PM to 5:30PM-10:30PM"</p>
    </section>
  );
}
