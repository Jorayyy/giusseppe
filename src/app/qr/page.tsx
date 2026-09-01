"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Printer, QrCode } from "lucide-react";

export default function QrPage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const menuUrl = origin ? `${origin}#menu` : "https://giusseppe.vercel.app#menu";
  const menuQr = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(menuUrl)}`;

  return (
    <div className="min-h-screen bg-white text-zinc-900 print:bg-white">
      {/* Top bar - hidden on print */}
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur print:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-600">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-8 print:px-0 print:py-4">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-600 font-serif text-2xl font-bold text-white shadow-sm">
            G
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight">Giuseppe&apos;s</h1>
          <p className="mt-1 text-sm text-stone-500">Authentic Italian-Filipino Restaurant · Est. 1992</p>
          <p className="text-xs text-stone-400">173 Avenida Veteranos, Tacloban City</p>
        </div>

        {/* QR Card */}
        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm print:border-stone-300 print:shadow-none">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
            <QrCode className="h-3.5 w-3.5" /> Table QR Code
          </div>
          <h2 className="mt-4 font-serif text-2xl font-semibold">Scan to view menu</h2>
          <p className="mt-2 text-sm text-stone-500">Point your phone camera at the QR code — no app needed.</p>

          <div className="mx-auto mt-8 flex max-w-[320px] justify-center rounded-2xl border border-stone-100 bg-white p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={menuQr}
              alt="QR code for menu"
              width={400}
              height={400}
              className="h-auto w-full object-contain"
            />
          </div>

          <p className="mt-6 break-all text-xs text-stone-400">{menuUrl}</p>

          <button
            onClick={() => window.print()}
            className="mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-black print:hidden"
          >
            <Printer className="h-4 w-4" /> Print this QR
          </button>
          <p className="mt-3 hidden text-xs text-stone-500 print:block">Cut out and place on each table.</p>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 print:border-amber-300">
          <h3 className="font-serif font-semibold text-amber-900">How to use</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-amber-900/80">
            <li>Print this page on sturdy paper or sticker stock.</li>
            <li>Place one QR on each table — near the centre or menu holder.</li>
            <li>Guests scan to see the full menu with photos — no reprinting when dishes change.</li>
            <li>Update the menu anytime from the Owner Dashboard at <span className="font-medium">/admin</span>.</li>
          </ol>
          <p className="mt-4 rounded-xl bg-white px-3 py-2 text-xs font-medium text-stone-600">
            Tip: For best scans, print at least 5×5 cm and keep good lighting.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-stone-400 print:hidden">
          Giuseppe&apos;s · 173 Avenida Veteranos, Tacloban City · 0945 841 9400
        </p>
      </main>

      <style>{`@media print { nav, button { display: none !important; } }`}</style>
    </div>
  );
}
