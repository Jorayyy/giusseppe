"use client";

import { useState, useEffect } from "react";
import { Save, RotateCcw, Clock } from "lucide-react";

const DEFAULT_HOURS: Record<string, { open: string; close: string; open2?: string; close2?: string }> = {
  Monday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Tuesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Wednesday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Thursday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
  Friday: { open: "11:00 AM", close: "4:00 PM", open2: "5:30 PM", close2: "10:30 PM" },
  Saturday: { open: "11:00 AM", close: "4:00 PM", open2: "5:30 PM", close2: "10:30 PM" },
  Sunday: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
};

const HOURS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TIME_PRESETS = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
];

export default function HoursEditorPage() {
  const [hours, setHours] = useState<typeof DEFAULT_HOURS>(DEFAULT_HOURS);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("db down");
        const json = await res.json();
        const raw = json.data?.hours;
        if (!raw) throw new Error("empty");
        if (!cancelled) setHours(JSON.parse(raw));
        return;
      } catch {}
      try {
        const h = localStorage.getItem("giuseppe_hours");
        if (h && !cancelled) setHours(JSON.parse(h));
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const save = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: [{ key: "hours", value: JSON.stringify(hours) }] }),
      });
      if (!res.ok) throw new Error("db down");
      localStorage.removeItem("giuseppe_hours");
      showToast("Hours saved");
    } catch {
      localStorage.setItem("giuseppe_hours", JSON.stringify(hours));
      showToast("Saved locally — database unreachable");
    }
  };

  const resetToDefault = () => {
    if (!confirm("Reset all hours to default?")) return;
    setHours(DEFAULT_HOURS);
  };

  const updateField = (day: string, field: string, value: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const isDayOff = (day: string) => {
    const h = hours[day];
    return !h.open && !h.close && !h.open2 && !h.close2;
  };

  const toggleDayOff = (day: string) => {
    if (isDayOff(day)) {
      setHours((prev) => ({
        ...prev,
        [day]: { open: "11:00 AM", close: "4:00 PM", open2: "5:00 PM", close2: "9:30 PM" },
      }));
    } else {
      setHours((prev) => ({
        ...prev,
        [day]: { open: "", close: "", open2: "", close2: "" },
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Business Hours</h1>
          <p className="mt-1 text-stone-500">Set your restaurant&apos;s operating hours for each day.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefault}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition"
          >
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-stone-900">Two service windows</p>
            <p className="text-sm text-stone-500">Set a lunch window (11AM–4PM) and dinner window (5PM–close). Leave the second window empty if you&apos;re closed between services.</p>
          </div>
        </div>
      </div>

      {/* Hours grid */}
      <div className="space-y-3">
        {HOURS_ORDER.map((day) => {
          const h = hours[day] ?? { open: "", close: "", open2: "", close2: "" };
          const off = isDayOff(day);

          return (
            <div
              key={day}
              className={`rounded-2xl border bg-white p-5 transition ${
                off ? "border-stone-100 opacity-60" : "border-stone-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-lg font-semibold text-stone-900">{day}</h3>
                  {off && (
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
                      Closed
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleDayOff(day)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    off
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {off ? "Open this day" : "Mark closed"}
                </button>
              </div>

              {!off && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Lunch window */}
                  <div className="rounded-xl bg-stone-50 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">Lunch Service</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-1">
                        <span className="text-xs text-stone-500">Opens</span>
                        <select
                          value={h.open}
                          onChange={(e) => updateField(day, "open", e.target.value)}
                          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                        >
                          <option value="">--</option>
                          {TIME_PRESETS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs text-stone-500">Closes</span>
                        <select
                          value={h.close}
                          onChange={(e) => updateField(day, "close", e.target.value)}
                          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                        >
                          <option value="">--</option>
                          {TIME_PRESETS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>

                  {/* Dinner window */}
                  <div className="rounded-xl bg-stone-50 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">Dinner Service</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-1">
                        <span className="text-xs text-stone-500">Opens</span>
                        <select
                          value={h.open2}
                          onChange={(e) => updateField(day, "open2", e.target.value)}
                          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                        >
                          <option value="">--</option>
                          {TIME_PRESETS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs text-stone-500">Closes</span>
                        <select
                          value={h.close2}
                          onChange={(e) => updateField(day, "close2", e.target.value)}
                          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                        >
                          <option value="">--</option>
                          {TIME_PRESETS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <h3 className="mb-3 font-serif text-lg font-semibold text-stone-900">Weekly Summary</h3>
        <div className="space-y-1">
          {HOURS_ORDER.map((day) => {
            const h = hours[day];
            const off = isDayOff(day);
            return (
              <div key={day} className="flex items-center justify-between py-1.5 text-sm">
                <span className="font-medium text-stone-700 w-24">{day.slice(0, 3)}</span>
                {off ? (
                  <span className="text-stone-400">Closed</span>
                ) : (
                  <span className="text-stone-600">
                    {h.open}–{h.close}
                    {h.open2 && h.close2 && ` · ${h.open2}–${h.close2}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Save bottom */}
      <div className="flex justify-end pb-8">
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition"
        >
          <Save className="h-4 w-4" /> Save Hours
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-xl">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}