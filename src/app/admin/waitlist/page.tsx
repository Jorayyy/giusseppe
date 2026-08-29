"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Clock,
  Phone,
  Trash2,
  UserCheck,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  Bell,
} from "lucide-react";

interface WaitlistEntry {
  id: string;
  name: string;
  phone: string;
  partySize: number;
  preferredTime: string;
  joinedAt: number;
}

const STORAGE_KEY = "giuseppe_waitlist";
const SERVED_KEY = "giuseppe_waitlist_served";
const AUTO_REMOVE_MS = 2 * 60 * 60 * 1000;

function timeAgo(ts: number) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m ago`;
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [servedToday, setServedToday] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      let list: WaitlistEntry[] = raw ? JSON.parse(raw) : [];

      const now = Date.now();
      const expired = list.filter((e) => now - e.joinedAt > AUTO_REMOVE_MS);
      if (expired.length > 0) {
        list = list.filter((e) => now - e.joinedAt <= AUTO_REMOVE_MS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }

      setEntries(list);
    } catch {
      setEntries([]);
    }
    try {
      const s = localStorage.getItem(SERVED_KEY);
      const served: number[] = s ? JSON.parse(s) : [];
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayServed = served.filter((ts) => ts >= todayStart.getTime()).length;
      setServedToday(todayServed);
    } catch {
      setServedToday(0);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  const persist = (list: WaitlistEntry[]) => {
    setEntries(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const seat = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    persist(entries.filter((e) => e.id !== id));
    try {
      const s = localStorage.getItem(SERVED_KEY);
      const served: number[] = s ? JSON.parse(s) : [];
      served.push(Date.now());
      localStorage.setItem(SERVED_KEY, JSON.stringify(served.slice(-100)));
      setServedToday((p) => p + 1);
    } catch {}
  };

  const notify = (entry: WaitlistEntry) => {
    alert(`${entry.name} has been notified!`);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const list = [...entries];
    [list[idx - 1], list[idx]] = [list[idx], list[idx - 1]];
    persist(list);
  };

  const moveDown = (idx: number) => {
    if (idx >= entries.length - 1) return;
    const list = [...entries];
    [list[idx], list[idx + 1]] = [list[idx + 1], list[idx]];
    persist(list);
  };

  const remove = (id: string) => {
    persist(entries.filter((e) => e.id !== id));
  };

  const avgWait = entries.length > 0
    ? Math.round(entries.reduce((sum, e) => sum + (Date.now() - e.joinedAt) / 60000, 0) / entries.length)
    : 0;

  const totalGuests = entries.reduce((sum, e) => sum + e.partySize, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Waitlist</h1>
          <p className="mt-1 text-stone-500">Manage the current queue and notify guests.</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 transition"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
              <Users className="h-5 w-5 text-primary" />
            </div>
            {entries.length > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white animate-pulse">
                {entries.length}
              </span>
            )}
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{entries.length}</p>
          <p className="text-sm text-stone-500">In Queue</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{totalGuests}</p>
          <p className="text-sm text-stone-500">Total Guests</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <UserCheck className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{servedToday}</p>
          <p className="text-sm text-stone-500">Served Today</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-stone-900">{avgWait}m</p>
          <p className="text-sm text-stone-500">Avg Wait</p>
        </div>
      </div>

      {/* Queue List */}
      <div className="rounded-2xl border border-stone-200 bg-white">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <h2 className="font-serif text-lg font-semibold text-stone-900">Current Queue</h2>
          {entries.length > 0 && (
            <p className="text-xs text-stone-400">Auto-removes after 2 hours</p>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
              <Users className="h-7 w-7 text-stone-400" />
            </div>
            <p className="mt-4 font-medium text-stone-900">No one in the queue</p>
            <p className="mt-1 text-sm text-stone-500">The waitlist is empty. Guests will appear here when they join.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {entries.map((entry, idx) => {
              const waitMins = Math.floor((Date.now() - entry.joinedAt) / 60000);
              return (
                <div key={entry.id} className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition">
                  {/* Position */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-sm font-bold text-primary-light">
                    #{idx + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-stone-900 truncate">{entry.name}</p>
                      {idx === 0 && (
                        <span className="flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-primary-light">
                          <AlertCircle className="h-3 w-3" /> Next
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-stone-500">
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {entry.phone}</span>
                      <span>{entry.partySize} {entry.partySize === 1 ? "guest" : "guests"}</span>
                      <span>Pref: {entry.preferredTime}</span>
                    </div>
                  </div>

                  {/* Wait Time */}
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-stone-700">{timeAgo(entry.joinedAt)}</p>
                    <p className="text-xs text-stone-400">Joined {formatTime(entry.joinedAt)}</p>
                    <div className="mt-1 h-1.5 w-20 rounded-full bg-stone-200 overflow-hidden ml-auto">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.min((waitMins / 120) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      title="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === entries.length - 1}
                      className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      title="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => notify(entry)}
                      className="rounded-lg p-2 text-primary hover:bg-surface transition"
                      title="Notify guest"
                    >
                      <Bell className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => seat(entry.id)}
                      className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 transition"
                      title="Seat guest"
                    >
                      <UserCheck className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(entry.id)}
                      className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
