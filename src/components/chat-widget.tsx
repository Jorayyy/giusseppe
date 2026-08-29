"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Phone } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  name: string | null;
  phone: string | null;
  content: string;
  read: boolean;
  createdAt: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("giuseppe_chat_phone");
      if (saved) setPhone(saved);
      const savedName = localStorage.getItem("giuseppe_chat_name");
      if (savedName) setName(savedName);
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/messages");
      const json = await res.json();
      setMessages(json.data ?? []);
    } catch {}
  }

  async function fetchUnreadCount() {
    try {
      const res = await fetch("/api/messages?unread=true");
      const json = await res.json();
      setUnreadCount(json.data?.length ?? 0);
    } catch {}
  }

  async function handleSend() {
    if (!input.trim() || !name.trim()) return;
    setSending(true);
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "customer",
          name: name.trim(),
          phone: phone.trim() || null,
          content: input.trim(),
        }),
      });
      setInput("");
      setSubmitted(true);
      try {
        localStorage.setItem("giuseppe_chat_name", name.trim());
        if (phone.trim()) localStorage.setItem("giuseppe_chat_phone", phone.trim());
      } catch {}
      fetchMessages();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {}
    setSending(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg transition hover:bg-amber-700 hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!open && unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl animate-in slide-in-from-bottom-4 sm:bottom-24 sm:right-6 max-sm:inset-3 max-sm:bottom-16 max-sm:rounded-xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-amber-600 px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 font-serif text-sm font-bold">
              G
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-sm font-semibold">Giuseppe&apos;s</h3>
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Online
              </div>
            </div>
            <a
              href="https://wa.me/639319704073"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-sm:h-[50vh]">
            {submitted && (
              <div className="rounded-xl bg-green-50 p-3 text-center text-sm text-green-700">
                Message sent! We&apos;ll reply soon.
              </div>
            )}

            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center text-stone-400">
                <MessageSquare className="mb-2 h-8 w-8" />
                <p className="text-sm">Start a conversation with us!</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.sender === "customer"
                      ? "bg-amber-500 text-white rounded-br-md"
                      : "bg-stone-100 text-stone-800 rounded-bl-md"
                  }`}
                >
                  {msg.sender === "owner" && msg.name && (
                    <p className="mb-0.5 text-xs font-semibold text-amber-600">{msg.name}</p>
                  )}
                  <p>{msg.content}</p>
                  <p
                    className={`mt-1 text-[10px] ${
                      msg.sender === "customer" ? "text-white/60" : "text-stone-400"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-stone-100 p-3">
            {!name.trim() && (
              <div className="mb-2 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
                />
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={name.trim() ? "Type a message..." : "Enter name first"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={!name.trim()}
                className="flex-1 rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || !name.trim() || sending}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white transition hover:bg-amber-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
