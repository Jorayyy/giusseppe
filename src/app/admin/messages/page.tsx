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
import { PageHeader, Stat, Spinner, EmptyState, Badge, fieldClass } from "@/components/admin/ui";

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
    <div className="space-y-6">
      <PageHeader
        kicker="Admin / Messages"
        title="Messages"
        description="Manage customer conversations & bookings."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total" value={totalMessages} icon={<Mail className="h-4 w-4" />} />
        <Stat label="Unread" value={unreadCount} icon={<MailOpen className="h-4 w-4" />} />
        <Stat label="Bookings" value={bookingCount} icon={<Calendar className="h-4 w-4" />} />
        <Stat label="Today" value={todayMessages} icon={<Clock className="h-4 w-4" />} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${fieldClass} pl-10`}
          />
        </div>
        <div className="flex border border-line bg-white p-1">
          {(["all", "unread", "bookings", "phone"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setPhoneFilter("");
              }}
              className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                filter === f ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : f === "unread" ? "Unread" : f === "bookings" ? "Bookings" : "By Phone"}
            </button>
          ))}
        </div>
      </div>

      {filter === "phone" && (
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="tel"
            placeholder="Enter phone number..."
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            className={`${fieldClass} pl-10`}
          />
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : filteredConversations.length === 0 ? (
        <div className="border border-line bg-white">
          <EmptyState
            icon={<MessageSquare className="h-8 w-8" />}
            title={filter === "bookings" ? "No booking requests yet" : "No messages yet"}
          />
        </div>
      ) : (
        <div className="space-y-3">
          {filteredConversations.map((conv) => {
            const lastMsg = conv.messages[0];
            const isConvBooking = lastMsg && isBooking(lastMsg.content);
            const booking = isConvBooking ? parseBooking(lastMsg.content) : null;

            return (
              <div key={conv.phone} className="overflow-hidden border border-line bg-white">
                <button
                  onClick={() => setExpandedPhone(expandedPhone === conv.phone ? null : conv.phone)}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center border ${
                      conv.hasBooking ? "border-accent text-accent" : "border-line text-stone-500"
                    }`}
                  >
                    {conv.hasBooking ? <Calendar className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{conv.name}</span>
                      {conv.hasBooking && <Badge>Booking</Badge>}
                      {conv.unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center bg-primary px-1.5 font-mono text-[10px] text-background">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {conv.phone && `${conv.phone} · `}
                      {isConvBooking && booking
                        ? `${booking.date} — ${booking.guests}`
                        : lastMsg?.content}
                    </p>
                  </div>
                  <span className="eyebrow shrink-0 text-stone-400">
                    {new Date(lastMsg?.createdAt || 0).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </button>

                {expandedPhone === conv.phone && (
                  <div className="space-y-3 border-t border-line p-4">
                    {conv.messages.map((msg) => {
                      const msgIsBooking = isBooking(msg.content);
                      const bookingData = msgIsBooking ? parseBooking(msg.content) : null;

                      return (
                        <div key={msg.id} className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`max-w-[85%] border px-4 py-2.5 text-sm ${
                              msgIsBooking
                                ? "border-accent/40 bg-accent/10 text-foreground"
                                : msg.sender === "customer"
                                  ? "border-line bg-surface text-foreground"
                                  : "border-foreground bg-foreground text-background"
                            }`}
                          >
                            {msgIsBooking && (
                              <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-primary">
                                <Calendar className="h-3.5 w-3.5" /> Table Booking
                              </div>
                            )}
                            {msgIsBooking && bookingData ? (
                              <div className="space-y-1 text-xs">
                                <p><strong>{bookingData.date}</strong></p>
                                <p>{bookingData.guests}</p>
                                <p>{bookingData.name}</p>
                                {bookingData.phone && <p>{bookingData.phone}</p>}
                              </div>
                            ) : (
                              <>
                                {msg.sender === "owner" && (
                                  <p className="eyebrow mb-1 text-accent">You</p>
                                )}
                                <p className="whitespace-pre-line">{msg.content}</p>
                              </>
                            )}
                            <div className="mt-1.5 flex items-center gap-2">
                              <span
                                className={`font-mono text-[10px] ${
                                  msg.sender === "customer" ? "text-stone-400" : "text-background/50"
                                }`}
                              >
                                {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                })}
                              </span>
                              {msg.read && (
                                <CheckCheck
                                  className={`h-3 w-3 ${
                                    msg.sender === "customer" ? "text-stone-400" : "text-background/50"
                                  }`}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex flex-wrap gap-2 border-t border-line pt-3">
                      {conv.messages.some((m) => !m.read) && (
                        <button
                          onClick={() => conv.messages.filter((m) => !m.read).forEach((m) => markAsRead(m.id))}
                          className="flex items-center gap-1.5 border border-line px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                        >
                          <CheckCheck className="h-3.5 w-3.5" />
                          Mark all read
                        </button>
                      )}

                      <button
                        onClick={() => conv.messages.forEach((m) => deleteMessage(m.id))}
                        className="flex items-center gap-1.5 border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
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
