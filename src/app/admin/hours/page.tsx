"use client";

import { useState, useEffect } from "react";
import { Save, RotateCcw, Clock } from "lucide-react";
import { PageHeader, Toast, fieldClass, btnPrimary, btnSecondary, Badge } from "@/components/admin/ui";

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
      <PageHeader
        kicker="Admin / Hours"
        title="Business Hours"
        description="Set your restaurant's operating hours for each day."
        actions={
          <>
            <button onClick={resetToDefault} className={btnSecondary}>
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button onClick={save} className={btnPrimary}>
              <Save className="h-4 w-4" /> Save
            </button>
          </>
        }
      />

      <div className="flex items-start gap-3 border border-line bg-white p-5">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">Two service windows</p>
          <p className="mt-1 text-sm text-muted">
            Set a lunch window and a dinner window. Leave the second window empty if you&apos;re
            closed between services.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {HOURS_ORDER.map((day) => {
          const h = hours[day] ?? { open: "", close: "", open2: "", close2: "" };
          const off = isDayOff(day);

          return (
            <div key={day} className={`border bg-white ${off ? "border-line/60" : "border-line"}`}>
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl text-foreground">{day}</h3>
                  {off && <Badge tone="muted">Closed</Badge>}
                </div>
                <button
                  onClick={() => toggleDayOff(day)}
                  className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                    off
                      ? "border-primary/40 text-primary hover:bg-surface"
                      : "border-line text-muted hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {off ? "Open this day" : "Mark closed"}
                </button>
              </div>

              {!off && (
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-3 text-stone-400">Lunch service</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-1">
                        <span className="text-xs text-muted">Opens</span>
                        <select
                          value={h.open}
                          onChange={(e) => updateField(day, "open", e.target.value)}
                          className={fieldClass}
                        >
                          <option value="">--</option>
                          {TIME_PRESETS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs text-muted">Closes</span>
                        <select
                          value={h.close}
                          onChange={(e) => updateField(day, "close", e.target.value)}
                          className={fieldClass}
                        >
                          <option value="">--</option>
                          {TIME_PRESETS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="eyebrow mb-3 text-stone-400">Dinner service</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-1">
                        <span className="text-xs text-muted">Opens</span>
                        <select
                          value={h.open2}
                          onChange={(e) => updateField(day, "open2", e.target.value)}
                          className={fieldClass}
                        >
                          <option value="">--</option>
                          {TIME_PRESETS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs text-muted">Closes</span>
                        <select
                          value={h.close2}
                          onChange={(e) => updateField(day, "close2", e.target.value)}
                          className={fieldClass}
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

      <div className="border border-line bg-white p-6">
        <h3 className="font-serif text-xl text-foreground">Weekly Summary</h3>
        <div className="mt-4 divide-y divide-line">
          {HOURS_ORDER.map((day) => {
            const h = hours[day];
            const off = isDayOff(day);
            return (
              <div key={day} className="flex items-center justify-between py-2.5 text-sm">
                <span className="eyebrow w-24 text-stone-400">{day.slice(0, 3)}</span>
                {off ? (
                  <span className="text-stone-400">Closed</span>
                ) : (
                  <span className="font-mono text-[13px] text-foreground">
                    {h.open}–{h.close}
                    {h.open2 && h.close2 && ` · ${h.open2}–${h.close2}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pb-8">
        <button onClick={save} className={btnPrimary}>
          <Save className="h-4 w-4" /> Save Hours
        </button>
      </div>

      <Toast message={toast} />
    </div>
  );
}
