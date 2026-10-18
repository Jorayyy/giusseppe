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
import { PageHeader, Stat, Spinner, EmptyState, Badge, btnSecondary } from "@/components/admin/ui";

type WaitlistEntry = {
  id: string;
  name: string;
  phone: string;
  partySize: number;
  preferredTime: string | null;
  joinedAt: number;
  position?: number;
};

type ApiEntry = {
  id: string;
  name: string;
  phone: string;
  partySize: number;
  preferredTime: string | null;
  createdAt: string;
  position: number;
};

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

function readServedToday(): number {
  try {
    const s = localStorage.getItem(SERVED_KEY);
    const served: number[] = s ? JSON.parse(s) : [];
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return served.filter((ts) => ts >= todayStart.getTime()).length;
  } catch {
    return 0;
  }
}

function bumpServed() {
  try {
    const s = localStorage.getItem(SERVED_KEY);
    const served: number[] = s ? JSON.parse(s) : [];
    served.push(Date.now());
    localStorage.setItem(SERVED_KEY, JSON.stringify(served.slice(-100)));
  } catch {}
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [servedToday, setServedToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [apiMode, setApiMode] = useState(false);

  const load = useCallback(async () => {
    const now = Date.now();
    try {
      const res = await fetch("/api/waitlist");
      if (!res.ok) throw new Error("db down");
      const json = await res.json();
      if (!Array.isArray(json.data)) throw new Error("bad payload");
      const all: ApiEntry[] = json.data;
      const expired = all.filter((e) => now - Date.parse(e.createdAt) > AUTO_REMOVE_MS);
      for (const e of expired) {
        fetch("/api/waitlist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: e.id, status: "left" }),
        }).catch(() => {});
      }
      const active = all
        .filter((e) => now - Date.parse(e.createdAt) <= AUTO_REMOVE_MS)
        .map((e) => ({
          id: e.id,
          name: e.name,
          phone: e.phone,
          partySize: e.partySize,
          preferredTime: e.preferredTime,
          joinedAt: Date.parse(e.createdAt),
          position: e.position,
        }));
      setEntries(active);
      setApiMode(true);
      setServedToday(readServedToday());
      setLoading(false);
      return;
    } catch {}
    setApiMode(false);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      let list: WaitlistEntry[] = raw ? JSON.parse(raw) : [];
      const expiredLocal = list.filter((e) => now - e.joinedAt > AUTO_REMOVE_MS);
      if (expiredLocal.length > 0) {
        list = list.filter((e) => now - e.joinedAt <= AUTO_REMOVE_MS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
      setEntries(list);
    } catch {
      setEntries([]);
    }
    setServedToday(readServedToday());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  const persistLocal = (list: WaitlistEntry[]) => {
    setEntries(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const swapPositions = async (idx: number, otherIdx: number) => {
    const list = [...entries];
    const a = list[idx];
    const b = list[otherIdx];
    [list[idx], list[otherIdx]] = [b, a];
    if (apiMode) {
      setEntries(list);
      const payloads = [
        { id: a.id, position: b.position ?? otherIdx + 1 },
        { id: b.id, position: a.position ?? idx + 1 },
      ];
      const results = await Promise.all(
        payloads.map((p) =>
          fetch("/api/waitlist", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(p),
          }).then((r) => r.ok)
        )
      );
      if (results.every(Boolean)) load();
      return;
    }
    persistLocal(list);
  };

  const seat = async (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    bumpServed();
    setServedToday((p) => p + 1);
    if (apiMode) {
      setEntries(entries.filter((e) => e.id !== id));
      fetch("/api/waitlist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "seated" }),
      }).catch(() => {});
      return;
    }
    persistLocal(entries.filter((e) => e.id !== id));
  };

  const notify = (entry: WaitlistEntry) => {
    alert(`${entry.name} has been notified!`);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    swapPositions(idx, idx - 1);
  };

  const moveDown = (idx: number) => {
    if (idx >= entries.length - 1) return;
    swapPositions(idx, idx + 1);
  };

  const remove = async (id: string) => {
    if (apiMode) {
      setEntries(entries.filter((e) => e.id !== id));
      fetch(`/api/waitlist?id=${id}`, { method: "DELETE" }).catch(() => {});
      return;
    }
    persistLocal(entries.filter((e) => e.id !== id));
  };

  const avgWait = entries.length > 0
    ? Math.round(entries.reduce((sum, e) => sum + (Date.now() - e.joinedAt) / 60000, 0) / entries.length)
    : 0;

  const totalGuests = entries.reduce((sum, e) => sum + e.partySize, 0);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Admin / Waitlist"
        title="Waitlist"
        description="Manage the current queue and notify guests."
        actions={
          <button onClick={load} className={btnSecondary}>
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="In Queue" value={entries.length} icon={<Users className="h-4 w-4" />} />
        <Stat label="Total Guests" value={totalGuests} icon={<Users className="h-4 w-4" />} />
        <Stat label="Served Today" value={servedToday} icon={<UserCheck className="h-4 w-4" />} />
        <Stat label="Avg Wait" value={`${avgWait}m`} icon={<Clock className="h-4 w-4" />} />
      </div>

      <div className="rounded-3xl border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-serif text-xl text-foreground">Current Queue</h2>
          {entries.length > 0 && <p className="eyebrow text-stone-400">Auto-removes after 2 hours</p>}
        </div>

        {entries.length === 0 ? (
          <EmptyState
            icon={<Users className="h-8 w-8" />}
            title="No one in the queue"
            description="The waitlist is empty. Guests will appear here when they join."
          />
        ) : (
          <div className="divide-y divide-line">
            {entries.map((entry, idx) => {
              const waitMins = Math.floor((Date.now() - entry.joinedAt) / 60000);
              return (
                <div key={entry.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-primary/40 font-mono text-sm text-primary">
                    #{idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-foreground">{entry.name}</p>
                      {idx === 0 && (
                        <Badge tone="primary">
                          <AlertCircle className="h-3 w-3" /> Next
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted">
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {entry.phone}</span>
                      <span>{entry.partySize} {entry.partySize === 1 ? "guest" : "guests"}</span>
                      <span>Pref: {entry.preferredTime}</span>
                    </div>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium text-foreground">{timeAgo(entry.joinedAt)}</p>
                    <p className="eyebrow mt-1 text-stone-400">Joined {formatTime(entry.joinedAt)}</p>
                    <div className="ml-auto mt-1 h-1 w-20 bg-surface">
                      <div className="h-full bg-accent" style={{ width: `${Math.min((waitMins / 120) * 100, 100)}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="hidden items-center gap-1.5 sm:flex">
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        className="p-2 text-stone-400 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === entries.length - 1}
                        className="p-2 text-stone-400 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                    <button onClick={() => notify(entry)} className="p-2 text-primary transition-colors hover:bg-surface" title="Notify guest">
                      <Bell className="h-4 w-4" />
                    </button>
                    <button onClick={() => seat(entry.id)} className="p-2 text-primary transition-colors hover:bg-surface" title="Seat guest">
                      <UserCheck className="h-4 w-4" />
                    </button>
                    <button onClick={() => remove(entry.id)} className="p-2 text-stone-400 transition-colors hover:text-red-600" title="Remove">
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
