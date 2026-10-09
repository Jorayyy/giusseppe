"use client";

import { useEffect, useState } from "react";
import { Gift, Star } from "lucide-react";

type LoyaltyCard = { phone: string; stamps: number; rewards: number };
type WalletItem = { code: string; description: string | null; date: string };

const WALLET_KEY = "giuseppe_my_vouchers";

function StampDots({ stamps }: { stamps: number }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-label={`${stamps} of 10 stamps`}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
            i < stamps ? "border-primary bg-primary text-white" : "border-stone-300 text-stone-400"
          }`}
        >
          {i < stamps ? <Star className="h-3 w-3 fill-current" /> : i + 1}
        </span>
      ))}
    </div>
  );
}

export default function Perks() {
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState<LoyaltyCard | null>(null);
  const [loyaltyMsg, setLoyaltyMsg] = useState<string | null>(null);
  const [loyaltyBusy, setLoyaltyBusy] = useState(false);

  const [code, setCode] = useState("");
  const [voucherPhone, setVoucherPhone] = useState("");
  const [voucherMsg, setVoucherMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [voucherBusy, setVoucherBusy] = useState(false);
  const [wallet, setWallet] = useState<WalletItem[]>([]);

  useEffect(() => {
    // defer past hydration so server and client first paint match
    const t = setTimeout(() => {
      try {
        const raw = localStorage.getItem(WALLET_KEY);
        if (raw) setWallet(JSON.parse(raw));
      } catch {}
    }, 0);
    return () => clearTimeout(t);
  }, []);

  async function checkCard(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || loyaltyBusy) return;
    setLoyaltyBusy(true);
    setLoyaltyMsg(null);
    try {
      const res = await fetch(`/api/loyalty?phone=${encodeURIComponent(phone.trim())}`);
      const json = await res.json();
      if (res.ok) {
        setCard(json.data);
        if (!json.data) setLoyaltyMsg("No card on this number yet — start one below.");
      } else {
        setLoyaltyMsg("Couldn't check right now. Try again in a bit.");
      }
    } catch {
      setLoyaltyMsg("Couldn't check right now. Try again in a bit.");
    }
    setLoyaltyBusy(false);
  }

  async function addStamp(start: boolean) {
    if (!phone.trim() || loyaltyBusy) return;
    setLoyaltyBusy(true);
    setLoyaltyMsg(null);
    try {
      const res = await fetch("/api/loyalty", {
        method: start ? "POST" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const json = await res.json();
      if (res.ok) {
        setCard(json.data);
        setLoyaltyMsg(start ? "Card started — first stamp is on us." : "Stamp added. Bring friends.");
      } else {
        setLoyaltyMsg("Couldn't update the card. Try again later.");
      }
    } catch {
      setLoyaltyMsg("Couldn't update the card. Try again later.");
    }
    setLoyaltyBusy(false);
  }

  async function redeemVoucher(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || !voucherPhone.trim() || voucherBusy) return;
    setVoucherBusy(true);
    setVoucherMsg(null);
    try {
      const res = await fetch("/api/vouchers/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase(), phone: voucherPhone.trim() }),
      });
      const json = await res.json();
      if (res.ok) {
        const v = json.data.voucher;
        const item: WalletItem = {
          code: v.code,
          description: v.description,
          date: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" }),
        };
        const next = [item, ...wallet].slice(0, 6);
        setWallet(next);
        try {
          localStorage.setItem(WALLET_KEY, JSON.stringify(next));
        } catch {}
        setVoucherMsg({ ok: true, text: `${v.code} redeemed — enjoy!` });
        setCode("");
      } else {
        setVoucherMsg({ ok: false, text: json.error || "That code didn't work." });
      }
    } catch {
      setVoucherMsg({ ok: false, text: "Couldn't reach the voucher service." });
    }
    setVoucherBusy(false);
  }

  return (
    <section id="perks" className="border-t border-stone-200/70 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-stone-200/70">
          {/* Loyalty */}
          <div className="md:pr-12" data-reveal>
            <p className="eyebrow text-primary">Loyalty card</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-stone-900">
              Ten stamps, one reward
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              Check your card, add today&apos;s stamp — every tenth visit is on the house.
            </p>

            <form onSubmit={checkCard} className="mt-6 flex max-w-md gap-3">
              <input
                type="tel"
                placeholder="Your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="min-w-0 flex-1 rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-primary"
                aria-label="Mobile number"
              />
              <button
                type="submit"
                disabled={loyaltyBusy}
                className="shrink-0 rounded-md border border-stone-900 px-4 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white disabled:opacity-50"
              >
                Check
              </button>
            </form>

            {card && (
              <div className="mt-6 max-w-md rounded-md bg-surface p-4">
                <StampDots stamps={card.stamps} />
                <div className="mt-3 flex items-center justify-between text-xs text-stone-600">
                  <span>
                    {card.stamps}/10 stamps
                    {card.rewards > 0 && ` · ${card.rewards} reward${card.rewards > 1 ? "s" : ""} ready`}
                  </span>
                  <button
                    type="button"
                    onClick={() => addStamp(false)}
                    disabled={loyaltyBusy}
                    className="font-semibold text-primary hover:underline disabled:opacity-50"
                  >
                    + Add today&apos;s stamp
                  </button>
                </div>
              </div>
            )}
            {loyaltyMsg && <p className="mt-3 text-sm text-stone-600">{loyaltyMsg}</p>}
            {card === null && phone.trim() !== "" && (
              <button
                type="button"
                onClick={() => addStamp(true)}
                disabled={loyaltyBusy}
                className="mt-4 text-sm font-semibold text-primary hover:underline disabled:opacity-50"
              >
                Start my card →
              </button>
            )}
          </div>

          {/* Vouchers */}
          <div className="md:pl-12" data-reveal style={{ transitionDelay: "90ms" }}>
            <p className="eyebrow text-primary">Gift vouchers</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-stone-900">
              Have a voucher?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              Enter the code from your gift to redeem it at the table.
            </p>

            <form onSubmit={redeemVoucher} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="VOUCHER CODE"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="min-w-0 flex-1 rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-sm uppercase tracking-wider outline-none transition-colors placeholder:text-stone-400 focus:border-primary"
                aria-label="Voucher code"
              />
              <input
                type="tel"
                placeholder="Mobile"
                value={voucherPhone}
                onChange={(e) => setVoucherPhone(e.target.value)}
                className="min-w-0 rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-primary sm:w-36"
                aria-label="Mobile number"
              />
              <button
                type="submit"
                disabled={voucherBusy}
                className="shrink-0 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-light disabled:opacity-50"
              >
                <Gift className="h-4 w-4" />
                <span className="sr-only">Redeem</span>
              </button>
            </form>

            {voucherMsg && (
              <p className={`mt-3 text-sm font-medium ${voucherMsg.ok ? "text-emerald-700" : "text-red-600"}`}>
                {voucherMsg.text}
              </p>
            )}

            {wallet.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {wallet.map((w, i) => (
                  <li
                    key={`${w.code}-${i}`}
                    className="rounded-full border border-stone-200 bg-surface px-3 py-1 text-xs font-medium text-stone-700"
                  >
                    {w.code}
                    <span className="ml-2 font-normal text-stone-400">{w.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
