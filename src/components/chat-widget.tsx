"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot, User, Sparkles } from "lucide-react";
import { getAIResponse } from "@/lib/ai";

interface Message {
  id: string;
  sender: string;
  name: string | null;
  phone: string | null;
  content: string;
  read: boolean;
  createdAt: string;
}

interface ChatMessage {
  id: string;
  sender: "customer" | "owner" | "ai";
  content: string;
  createdAt: Date;
}

const LS_NAME_KEY = "giuseppe_chat_name";
const LS_PHONE_KEY = "giuseppe_chat_phone";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [dbMessages, setDbMessages] = useState<Message[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [nameSaved, setNameSaved] = useState(false);
  const [mode, setMode] = useState<"choose" | "ai" | "message">("choose");
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
    if (!open || !nameSaved || mode !== "message") return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [open, nameSaved, mode]);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, dbMessages]);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/messages");
      const json = await res.json();
      setDbMessages(json.data ?? []);
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

  function handleAIMessage() {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "customer",
      content: input.trim(),
      createdAt: new Date(),
    };
    const aiResponse = getAIResponse(input.trim());
    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: "ai",
      content: aiResponse,
      createdAt: new Date(),
    };
    setChatMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  }

  async function handleSendMessage() {
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
      setDbMessages((prev) => [...prev, json.data]);
      setInput("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Failed to send message. Please try again.");
    }
    setSending(false);
  }

  function handleSend() {
    if (mode === "ai") {
      handleAIMessage();
    } else {
      handleSendMessage();
    }
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
            {nameSaved && mode !== "choose" && (
              <button
                onClick={() => setMode("choose")}
                className="rounded-lg bg-white/20 px-2 py-1 text-[10px] font-medium text-white hover:bg-white/30 transition"
              >
                Switch
              </button>
            )}
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
          ) : mode === "choose" ? (
            <div className="flex flex-col items-center justify-center p-6 text-center" style={{ minHeight: "320px" }}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h4 className="mb-1 font-serif text-lg font-bold text-stone-900">Welcome, {name}!</h4>
              <p className="mb-6 text-sm text-stone-500">How can we help you today?</p>
              <div className="w-full space-y-3">
                <button
                  onClick={() => {
                    setMode("ai");
                    setChatMessages([{
                      id: "welcome",
                      sender: "ai",
                      content: `Buongiorno ${name}! 🇮🇹 I'm Giuseppe's AI sommelier. Ask me about:\n\n• 🍷 Wine pairings\n• ⚠️ Allergy info\n• 📖 Menu stories\n• 🌟 What to order\n\nBuon appetito!`,
                      createdAt: new Date(),
                    }]);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 text-left transition hover:border-accent hover:bg-surface"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Ask Giuseppe AI</p>
                    <p className="text-xs text-stone-500">Wine pairings, allergies, menu stories</p>
                  </div>
                  <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-primary">SOON</span>
                </button>
                <button
                  onClick={() => setMode("message")}
                  className="flex w-full items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 text-left transition hover:border-accent hover:bg-surface"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Message the restaurant</p>
                    <p className="text-xs text-stone-500">Reservations, inquiries, feedback</p>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-sm:h-[50vh]">
                {mode === "ai" && chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.sender === "customer"
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-surface text-stone-800 rounded-bl-md"
                      }`}
                    >
                      {msg.sender === "ai" && (
                        <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-primary">
                          <Bot className="h-3 w-3" /> Giuseppe AI
                        </p>
                      )}
                      <p className="whitespace-pre-line">{msg.content}</p>
                      <p
                        className={`mt-1 text-[10px] ${
                          msg.sender === "customer" ? "text-white/60" : "text-stone-400"
                        }`}
                      >
                        {msg.createdAt.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {mode === "message" && submitted && (
                  <div className="rounded-xl bg-green-50 p-3 text-center text-sm text-green-700">
                    Message sent! We&apos;ll reply soon.
                  </div>
                )}

                {mode === "message" && error && (
                  <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
                    {error}
                  </div>
                )}

                {mode === "message" && dbMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-stone-400">
                    <MessageSquare className="mb-2 h-8 w-8" />
                    <p className="text-sm">Start a conversation with us!</p>
                  </div>
                )}

                {mode === "message" && dbMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.sender === "customer"
                          ? "bg-primary text-white rounded-br-md"
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
                    placeholder={mode === "ai" ? "Ask about wine, allergies, menu..." : "Type a message..."}
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
