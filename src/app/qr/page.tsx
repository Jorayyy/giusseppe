"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Printer, QrCode, MessageSquare } from "lucide-react";

export default function QrPage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const menuUrl = origin ? `${origin}/menu` : "https://giusseppe.vercel.app/menu";
  const chatUrl = origin ? `${origin}` : "https://giusseppe.vercel.app";

  const menuQr = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(menuUrl)}`;
  const chatQr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(chatUrl)}`;

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-zinc-900 print:bg-white">
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur print:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8 print:px-0 print:py-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary font-serif text-xl font-bold text-white shadow-sm">
            G
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight">Giuseppe&apos;s</h1>
          <p className="text-sm text-stone-500">Authentic Italian Cucina · Tacloban City</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Menu QR */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm print:border-stone-300 print:shadow-none">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-light">
              <QrCode className="h-3.5 w-3.5" /> Photo Menu
            </div>
            <h2 className="mt-3 font-serif text-2xl font-semibold">Scan to view menu</h2>
            <p className="mt-1 text-sm text-stone-500">Point your camera at the QR — no app needed.</p>

            <div className="mx-auto mt-6 flex max-w-[300px] justify-center rounded-2xl border border-stone-100 bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={menuQr}
                alt="QR code for menu"
                width={400}
                height={400}
                className="h-auto w-full object-contain"
              />
            </div>

            <p className="mt-4 break-all text-xs text-stone-400">{menuUrl}</p>

            <button
              onClick={() => window.print()}
              className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-black print:hidden"
            >
              <Printer className="h-4 w-4" /> Print this QR
            </button>
            <p className="mt-3 hidden text-xs text-stone-500 print:block">Print this page and place on tables.</p>
          </div>

          {/* Chat QR */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm print:shadow-none">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-light">
                <MessageSquare className="h-3.5 w-3.5" /> Chat with Us
              </div>
              <h3 className="mt-3 font-semibold">Questions? Message us</h3>
              <p className="mt-1 text-xs text-stone-500">Scan to open our website chat</p>
              <div className="mx-auto mt-4 flex max-w-[200px] justify-center rounded-2xl border border-stone-100 bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chatQr} alt="QR code for chat" width={300} height={300} className="h-auto w-full object-contain" />
              </div>
              <a
                href={chatUrl}
                target="_blank"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light print:hidden"
              >
                <MessageSquare className="h-4 w-4" /> Open Chat
              </a>
            </div>

            <div className="rounded-2xl border border-primary bg-gradient-to-br from-surface to-orange-50 p-6 print:border-primary-light">
              <h3 className="font-serif font-semibold text-primary">How to use</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-primary/80">
                <li>Print this QR on sturdy paper or sticker.</li>
                <li>Place one on each table — near the centre or menu holder.</li>
                <li>Guests scan to see the photo menu instantly — no reprinting when dishes change.</li>
                <li>Update the menu anytime from the Owner Dashboard.</li>
              </ol>
              <p className="mt-4 rounded-xl bg-white px-3 py-2 text-xs font-medium text-stone-600">
                Tip: For best scans, print at least 4×4 cm and keep good lighting.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-stone-400 print:hidden">Giuseppe&apos;s · 173 Avenida Veteranos, Tacloban City · 0931 970 4073</p>
      </main>

      <style>{`@media print { nav, button { display: none !important; } }`}</style>
    </div>
  );
}