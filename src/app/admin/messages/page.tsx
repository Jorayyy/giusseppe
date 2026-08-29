"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Search,
  CheckCheck,
  Trash2,
  ExternalLink,
  Phone,
  User,
  Clock,
  Mail,
  MailOpen,
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
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "phone">("all");
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
      acc[key] = { phone: key, name: msg.name || key, messages: [], unreadCount: 0 };
    }
    acc[key].messages.push(msg);
    if (!msg.read) acc[key].unreadCount++;
    return acc;
  }, {});

  const conversationList = Object.values(conversations).sort((a, b) => {
    const latestA = new Date(a.messages[0]?.createdAt || 0).getTime();
    const latestB = new Date(b.messages[0]?.createdAt || 0).getTime();
    return latestB - latestA;
  });

  const filteredConversations = searchQuery
    ? conversationList.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.messages.some((m) => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : conversationList;

  const totalMessages = messages.length;
  const unreadCount = messages.filter((m) => !m.read).length;
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

  function getWhatsAppUrl(phone: string, name: string) {
    const text = encodeURIComponent(`Hi ${name}, thanks for messaging Giuseppe's! How can we help?`);
    return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${text}`;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Messages</h1>
        <p className="text-sm text-stone-500">Manage customer conversations</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex items-center gap-2 text-stone-500">
            <Mail className="h-4 w-4" />
            <span className="text-xs font-medium">Total</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-stone-900">{totalMessages}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex items-center gap-2 text-amber-600">
            <MailOpen className="h-4 w-4" />
            <span className="text-xs font-medium">Unread</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-amber-600">{unreadCount}</p>
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
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-stone-200 bg-white p-1">
          {(["all", "unread", "phone"] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPhoneFilter(""); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === f
                  ? "bg-amber-600 text-white"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              {f === "all" ? "All" : f === "unread" ? "Unread" : "By Phone"}
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
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>
      )}

      {/* Conversations */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white py-12 text-center">
          <MessageSquare className="mx-auto mb-3 h-10 w-10 text-stone-300" />
          <p className="text-sm text-stone-500">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredConversations.map((conv) => (
            <div key={conv.phone} className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
              <button
                onClick={() => setExpandedPhone(expandedPhone === conv.phone ? null : conv.phone)}
                className="flex w-full items-center gap-3 p-4 text-left hover:bg-stone-50 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-900">{conv.name}</span>
                    {conv.unreadCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1.5 text-[10px] font-bold text-white">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-stone-500">
                    {conv.phone && `${conv.phone} · `}
                    {conv.messages[0]?.content}
                  </p>
                </div>
                <span className="text-xs text-stone-400">
                  {new Date(conv.messages[0]?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </button>

              {expandedPhone === conv.phone && (
                <div className="border-t border-stone-100 p-4 space-y-3">
                  {conv.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === "customer"
                            ? "bg-stone-100 text-stone-800 rounded-bl-md"
                            : "bg-amber-500 text-white rounded-br-md"
                        }`}
                      >
                        {msg.sender === "owner" && (
                          <p className="mb-0.5 text-[10px] font-semibold text-amber-100">You</p>
                        )}
                        <p>{msg.content}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`text-[10px] ${msg.sender === "customer" ? "text-stone-400" : "text-white/60"}`}>
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
                  ))}

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
                    {conv.phone && (
                      <a
                        href={getWhatsAppUrl(conv.phone, conv.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-medium text-white hover:bg-[#20bd5a] transition"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Reply via WhatsApp
                      </a>
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
          ))}
        </div>
      )}
    </div>
  );
}
