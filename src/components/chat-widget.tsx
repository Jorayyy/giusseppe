"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  name: string | null;
  phone: string | null;
  content: string;
  read: boolean;
  createdAt: string;
}

const LS_NAME_KEY = "giuseppe_chat_name";
const LS_PHONE_KEY = "giuseppe_chat_phone";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedName = localStorage.getItem(LS_NAME_KEY);
      const savedPhone = localStorage.getItem(LS_PHONE_KEY);
      if (savedName) {
        setName(savedName);
        setNameSaved(true);
      }
      if (savedPhone) setPhone(savedPhone);
    } catch {}
  }, []);

  useEffect(() => {
    if (!open || !nameSaved) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [open, nameSaved]);

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

  function handleSaveName() {
    if (!name.trim()) return;
    try {
      localStorage.setItem(LS_NAME_KEY, name.trim());
      if (phone.trim()) localStorage.setItem(LS_PHONE_KEY, phone.trim());
    } catch {}
    setNameSaved(true);
  }

  async function handleSend() {
    if (!input.trim() || !nameSaved) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "customer",
          name: name.trim(),
          phone: phone.trim() || null,
          content: input.trim(),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      const json = await res.json();
      setMessages((prev) => [...prev, json.data]);
      setInput("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Failed to send message. Please try again.");
    }
    setSending(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary-light hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!open && unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl animate-in slide-in-from-bottom-4 sm:bottom-24 sm:right-6 max-sm:inset-3 max-sm:bottom-16 max-sm:rounded-xl">
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light font-serif text-sm font-bold">
              G
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-sm font-semibold">Giuseppe&apos;s</h3>
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Online
              </div>
            </div>
          </div>

          {!nameSaved ? (
            <div className="flex flex-col items-center justify-center p-6 text-center" style={{ minHeight: "320px" }}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h4 className="mb-1 font-serif text-lg font-bold text-stone-900">Hi there!</h4>
              <p className="mb-6 text-sm text-stone-500">What&apos;s your name so we know who you are?</p>
              <div className="w-full space-y-3">
                <input
                  type="text"
                  placeholder="Your name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                  autoFocus
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                />
                <button
                  onClick={handleSaveName}
                  disabled={!name.trim()}
                  className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start chatting
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-sm:h-[50vh]">
                {submitted && (
                  <div className="rounded-xl bg-green-50 p-3 text-center text-sm text-green-700">
                    Message sent! We&apos;ll reply soon.
                  </div>
                )}

                {error && (
                  <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
                    {error}
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
                          ? "bg-accent text-white rounded-br-md"
                          : "bg-stone-100 text-stone-800 rounded-bl-md"
                      }`}
                    >
                      {msg.sender === "owner" && msg.name && (
                        <p className="mb-0.5 text-xs font-semibold text-primary">{msg.name}</p>
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

              <div className="border-t border-stone-100 p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-accent"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || sending}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-light disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
