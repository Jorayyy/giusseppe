"use client";

import { useState, useEffect } from "react";
import { Users, Clock, Phone, MessageCircle, X, ChevronDown, ChevronUp, UserMinus } from "lucide-react";

interface WaitlistEntry {
  id: string;
  name: string;
  phone: string;
  partySize: number;
  preferredTime: string;
  joinedAt: number;
}

const STORAGE_KEY = "giuseppe_waitlist";
const MY_ID_KEY = "giuseppe_waitlist_my_id";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function anonymizeName(name: string) {
  if (name.length <= 2) return name[0] + "*";
  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
}

function timeAgo(ts: number) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m ago`;
}

function estimatedWait(position: number) {
  const minsPerParty = 20;
  const wait = (position - 1) * minsPerParty;
  if (wait <= 0) return "Next up!";
  if (wait < 60) return `~${wait} min`;
  return `~${Math.floor(wait / 60)}h ${wait % 60}m`;
}

export default function Waitlist() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [preferredTime, setPreferredTime] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showQueue, setShowQueue] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
      const savedId = localStorage.getItem(MY_ID_KEY);
      if (savedId) setMyId(savedId);
    } catch {}
  }, []);

  const persist = (list: WaitlistEntry[]) => {
    setEntries(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const myEntry = entries.find((e) => e.id === myId);
  const myPosition = myEntry ? entries.indexOf(myEntry) + 1 : 0;

  const joinWaitlist = () => {
    if (!name.trim() || !phone.trim()) return;
    const entry: WaitlistEntry = {
      id: generateId(),
      name: name.trim(),
      phone: phone.trim(),
      partySize,
      preferredTime: preferredTime || "ASAP",
      joinedAt: Date.now(),
    };
    const updated = [...entries, entry];
    persist(updated);
    setMyId(entry.id);
    localStorage.setItem(MY_ID_KEY, entry.id);
    setName("");
    setPhone("");
    setPartySize(2);
    setPreferredTime("");
    setShowForm(false);
  };

  const leaveWaitlist = () => {
    if (!myId) return;
    const updated = entries.filter((e) => e.id !== myId);
    persist(updated);
    setMyId(null);
    localStorage.removeItem(MY_ID_KEY);
  };

  const waUrl = `https://wa.me/639319704073?text=${encodeURIComponent(
    `Hi Giuseppe's! I'd like to join the waitlist for ${myEntry?.partySize || 2} people. My name is ${myEntry?.name || "Guest"}.`
  )}`;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <Users className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">Join the Waitlist</h3>
            <p className="text-sm text-stone-500">{entries.length} {entries.length === 1 ? "party" : "parties"} waiting</p>
          </div>
        </div>
        {entries.length > 0 && (
          <button onClick={() => setShowQueue(!showQueue)} className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700">
            Queue {showQueue ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        )}
      </div>

      {/* Queue List */}
      {showQueue && entries.length > 0 && (
        <div className="mt-4 space-y-2">
          {entries.map((entry, idx) => {
            const isMe = entry.id === myId;
            const waitTime = timeAgo(entry.joinedAt);
            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                  isMe ? "bg-amber-50 ring-1 ring-amber-200" : "bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                    isMe ? "bg-amber-500 text-white" : "bg-stone-200 text-stone-600"
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">
                      {anonymizeName(entry.name)} {isMe && <span className="text-amber-600">(you)</span>}
                    </p>
                    <p className="text-xs text-stone-500">{entry.partySize} {entry.partySize === 1 ? "guest" : "guests"} · {entry.preferredTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400">{waitTime}</span>
                  <div className="h-1.5 w-16 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all"
                      style={{ width: `${Math.max(100 - idx * (100 / entries.length), 15)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* My Position */}
      {myEntry && (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-medium text-stone-900">
              You&apos;re <span className="text-amber-600 font-bold">#{myPosition}</span> in line
            </p>
          </div>
          <p className="mt-1 text-xs text-stone-500">Est. wait: {estimatedWait(myPosition)}</p>
          <div className="mt-3 flex gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Notify via WhatsApp
            </a>
            <button
              onClick={leaveWaitlist}
              className="flex items-center gap-1 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50"
            >
              <UserMinus className="h-3.5 w-3.5" /> Leave
            </button>
          </div>
        </div>
      )}

      {/* Join Form */}
      {!myEntry && (
        <div className="mt-4">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full rounded-full bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition"
            >
              Join the Waitlist
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Party size</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPartySize(Math.max(1, partySize - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-stone-900">{partySize}</span>
                    <button
                      onClick={() => setPartySize(Math.min(8, partySize + 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Preferred time</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-3 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-400"
                  >
                    <option value="">ASAP</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
                    <option>12:00 PM</option>
                    <option>12:30 PM</option>
                    <option>1:00 PM</option>
                    <option>5:00 PM</option>
                    <option>5:30 PM</option>
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={joinWaitlist}
                  disabled={!name.trim() || !phone.trim()}
                  className="flex-1 rounded-full bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Join Waitlist
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-full border border-stone-200 px-4 py-3 text-sm text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
              </div>
              <a
                href={`https://wa.me/639319704073?text=${encodeURIComponent("Hi Giuseppe's! I'd like to join the waitlist.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white hover:bg-[#20bd5a]"
              >
                <Phone className="h-4 w-4" /> Join via WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
