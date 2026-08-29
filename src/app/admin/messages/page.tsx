"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Search,
  CheckCheck,
  Trash2,
  Phone,
  User,
  Clock,
  Mail,
  MailOpen,
  Calendar,
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  name: string | null;
  phone: string | null;
  content: string;
  read: boolean;
  createdAt: string;
}

interface Conversation {
  phone: string;
  name: string;
  messages: Message[];
  unreadCount: number;
  hasBooking: boolean;
}

function isBooking(content: string) {
  return content.startsWith("📅 BOOKING REQUEST");
}

function parseBooking(content: string) {
  const lines = content.split("\n").filter((l) => l.trim());
  const date = lines.find((l) => l.startsWith("📆"))?.replace("📆 ", "") || "";
  const guests = lines.find((l) => l.startsWith("👥"))?.replace("👥 ", "") || "";
  const name = lines.find((l) => l.startsWith("👤"))?.replace("👤 ", "") || "";
  const phone = lines.find((l) => l.startsWith("📱"))?.replace("📱 ", "") || "";
  return { date, guests, name, phone };
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "bookings" | "phone">("all");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedPhone, setExpandedPhone] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter === "unread") params.set("unread", "true");
      if (filter === "phone" && phoneFilter) params.set("phone", phoneFilter);

      const res = await fetch(`/api/messages?${params}`);
      const json = await res.json();
      setMessages(json.data ?? []);
    } catch {}
    setLoading(false);
  }, [filter, phoneFilter]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const conversations = messages.reduce<Record<string, Conversation>>((acc, msg) => {
    const key = msg.phone || msg.name || "unknown";
    if (!acc[key]) {
      acc[key] = { phone: key, name: msg.name || key, messages: [], unreadCount: 0, hasBooking: false };
    }
    acc[key].messages.push(msg);
    if (!msg.read) acc[key].unreadCount++;
    if (isBooking(msg.content)) acc[key].hasBooking = true;
    return acc;
  }, {});

  const conversationList = Object.values(conversations).sort((a, b) => {
    const latestA = new Date(a.messages[0]?.createdAt || 0).getTime();
    const latestB = new Date(b.messages[0]?.createdAt || 0).getTime();
    return latestB - latestA;
  });

  const filteredBySearch = searchQuery
    ? conversationList.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.messages.some((m) => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : conversationList;

  const filteredConversations = filter === "bookings"
    ? filteredBySearch.filter((c) => c.hasBooking)
    : filteredBySearch;

  const totalMessages = messages.length;
  const unreadCount = messages.filter((m) => !m.read).length;
  const bookingCount = messages.filter((m) => isBooking(m.content)).length;
  const todayMessages = messages.filter((m) => {
    const d = new Date(m.createdAt);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  }).length;

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/messages/${id}`, { method: "PUT" });
      fetchMessages();
    } catch {}
  }

  async function deleteMessage(id: string) {
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
      fetchMessages();
    } catch {}
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Messages</h1>
        <p className="text-sm text-stone-500">Manage customer conversations & bookings</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-3">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex items-center gap-2 text-stone-500">
            <Mail className="h-4 w-4" />
            <span className="text-xs font-medium">Total</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-stone-900">{totalMessages}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex items-center gap-2 text-primary">
            <MailOpen className="h-4 w-4" />
            <span className="text-xs font-medium">Unread</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-primary">{unreadCount}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex items-center gap-2 text-accent">
            <Calendar className="h-4 w-4" />
            <span className="text-xs font-medium">Bookings</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-accent">{bookingCount}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex items-center gap-2 text-stone-500">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">Today</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-stone-900">{todayMessages}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-surface"
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-stone-200 bg-white p-1">
          {(["all", "unread", "bookings", "phone"] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPhoneFilter(""); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === f
                  ? "bg-primary text-white"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              {f === "all" ? "All" : f === "unread" ? "Unread" : f === "bookings" ? "Bookings" : "By Phone"}
            </button>
          ))}
        </div>
      </div>

      {filter === "phone" && (
        <div className="mb-4">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="tel"
              placeholder="Enter phone number..."
              value={phoneFilter}
              onChange={(e) => setPhoneFilter(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            />
          </div>
        </div>
      )}

      {/* Conversations */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white py-12 text-center">
          <MessageSquare className="mx-auto mb-3 h-10 w-10 text-stone-300" />
          <p className="text-sm text-stone-500">
            {filter === "bookings" ? "No booking requests yet" : "No messages yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredConversations.map((conv) => {
            const lastMsg = conv.messages[0];
            const isConvBooking = lastMsg && isBooking(lastMsg.content);
            const booking = isConvBooking ? parseBooking(lastMsg.content) : null;

            return (
              <div key={conv.phone} className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setExpandedPhone(expandedPhone === conv.phone ? null : conv.phone)}
                  className="flex w-full items-center gap-3 p-4 text-left hover:bg-stone-50 transition"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    conv.hasBooking ? "bg-accent/10 text-accent" : "bg-stone-100 text-stone-600"
                  }`}>
                    {conv.hasBooking ? <Calendar className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-stone-900">{conv.name}</span>
                      {conv.hasBooking && (
                        <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                          BOOKING
                        </span>
                      )}
                      {conv.unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-stone-500">
                      {conv.phone && `${conv.phone} · `}
                      {isConvBooking && booking
                        ? `${booking.date} — ${booking.guests}`
                        : lastMsg?.content}
                    </p>
                  </div>
                  <span className="text-xs text-stone-400">
                    {new Date(lastMsg?.createdAt || 0).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </button>

                {expandedPhone === conv.phone && (
                  <div className="border-t border-stone-100 p-4 space-y-3">
                    {conv.messages.map((msg) => {
                      const msgIsBooking = isBooking(msg.content);
                      const bookingData = msgIsBooking ? parseBooking(msg.content) : null;

                      return (
                        <div key={msg.id} className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                              msgIsBooking
                                ? "bg-accent/10 text-stone-800 border border-accent/30 rounded-bl-md"
                                : msg.sender === "customer"
                                  ? "bg-stone-100 text-stone-800 rounded-bl-md"
                                  : "bg-primary text-white rounded-br-md"
                            }`}
                          >
                            {msgIsBooking && (
                              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-accent">
                                <Calendar className="h-3.5 w-3.5" /> Table Booking
                              </div>
                            )}
                            {msgIsBooking && bookingData ? (
                              <div className="space-y-1 text-xs">
                                <p>📆 <strong>{bookingData.date}</strong></p>
                                <p>👥 {bookingData.guests}</p>
                                <p>👤 {bookingData.name}</p>
                                {bookingData.phone && <p>📱 {bookingData.phone}</p>}
                              </div>
                            ) : (
                              <>
                                {msg.sender === "owner" && (
                                  <p className="mb-0.5 text-[10px] font-semibold text-surface">You</p>
                                )}
                                <p className="whitespace-pre-line">{msg.content}</p>
                              </>
                            )}
                            <div className="mt-1.5 flex items-center gap-2">
                              <span className={`text-[10px] ${
                                msg.sender === "customer" ? "text-stone-400" : "text-white/60"
                              }`}>
                                {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                })}
                              </span>
                              {msg.read && (
                                <CheckCheck className={`h-3 w-3 ${msg.sender === "customer" ? "text-stone-400" : "text-white/60"}`} />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
                      {conv.messages.some((m) => !m.read) && (
                        <button
                          onClick={() => conv.messages.filter((m) => !m.read).forEach((m) => markAsRead(m.id))}
                          className="flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-200 transition"
                        >
                          <CheckCheck className="h-3.5 w-3.5" />
                          Mark all read
                        </button>
                      )}

                      <button
                        onClick={() => conv.messages.forEach((m) => deleteMessage(m.id))}
                        className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete all
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
