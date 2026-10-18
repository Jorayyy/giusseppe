"use client";

import { useEffect, useState } from "react";
import { Gift, Star } from "lucide-react";

type LoyaltyCard = { phone: string; stamps: number; rewards: number };
type WalletItem = { code: string; description: string | null; date: string };

const WALLET_KEY = "giuseppe_my_vouchers";

const inputClass =
  "min-w-0 w-full rounded-2xl border border-line bg-white/80 px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-stone-400 focus:border-primary";

function StampDots({ stamps }: { stamps: number }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-label={`${stamps} of 10 stamps`}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
            i < stamps ? "border-primary bg-primary text-background" : "border-line text-stone-400"
          }`}
        >
          {i < stamps ? <Star className="h-3 w-3 fill-accent text-accent" /> : i + 1}
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
    <section id="perks" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
          {/* Loyalty */}
          <div className="md:pr-14" data-reveal>
            <p className="eyebrow text-stone-400">Giuseppe&apos;s / Loyalty</p>
            <h2 className="mt-4 font-serif text-3xl text-foreground">Ten stamps, one reward</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Check your card, add today&apos;s stamp — every tenth visit is on the house.
            </p>

            <form onSubmit={checkCard} className="mt-8 flex max-w-md items-end gap-3">
              <input
                type="tel"
                placeholder="Your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                aria-label="Mobile number"
              />
              <button
                type="submit"
                disabled={loyaltyBusy}
                className="shrink-0 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
              >
                Check
              </button>
            </form>

            {card && (
              <div className="mt-6 max-w-md rounded-3xl border border-line bg-background/70 p-5">
                <StampDots stamps={card.stamps} />
                <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted">
                  <span>
                    {card.stamps}/10 stamps
                    {card.rewards > 0 && ` · ${card.rewards} reward${card.rewards > 1 ? "s" : ""} ready`}
                  </span>
                  <button
                    type="button"
                    onClick={() => addStamp(false)}
                    disabled={loyaltyBusy}
                    className="link-underline shrink-0 font-medium text-primary disabled:opacity-50"
                  >
                    + Add today&apos;s stamp
                  </button>
                </div>
              </div>
            )}
            {loyaltyMsg && <p className="mt-3 text-sm text-muted">{loyaltyMsg}</p>}
            {card === null && phone.trim() !== "" && (
              <button
                type="button"
                onClick={() => addStamp(true)}
                disabled={loyaltyBusy}
                className="link-underline mt-4 text-sm font-medium text-primary disabled:opacity-50"
              >
                Start my card →
              </button>
            )}
          </div>

          {/* Vouchers */}
          <div className="md:pl-14" data-reveal style={{ transitionDelay: "90ms" }}>
            <p className="eyebrow text-stone-400">Giuseppe&apos;s / Gift vouchers</p>
            <h2 className="mt-4 font-serif text-3xl text-foreground">Have a voucher?</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Enter the code from your gift to redeem it at the table.
            </p>

            <form onSubmit={redeemVoucher} className="mt-8 flex max-w-md flex-col items-end gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="VOUCHER CODE"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className={`${inputClass} font-mono uppercase tracking-wider`}
                aria-label="Voucher code"
              />
              <input
                type="tel"
                placeholder="Mobile"
                value={voucherPhone}
                onChange={(e) => setVoucherPhone(e.target.value)}
                className={`${inputClass} sm:w-36`}
                aria-label="Mobile number"
              />
              <button
                type="submit"
                disabled={voucherBusy}
                className="shrink-0 rounded-full bg-foreground p-3 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
                aria-label="Redeem"
              >
                <Gift className="h-4 w-4" />
              </button>
            </form>

            {voucherMsg && (
              <p className={`mt-3 text-sm font-medium ${voucherMsg.ok ? "text-primary" : "text-red-600"}`}>
                {voucherMsg.text}
              </p>
            )}

            {wallet.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {wallet.map((w, i) => (
                  <li
                    key={`${w.code}-${i}`}
                    className="rounded-full border border-line bg-background/70 px-3 py-1 font-mono text-[11px] text-foreground"
                  >
                    {w.code}
                    <span className="ml-2 text-stone-400">{w.date}</span>
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
