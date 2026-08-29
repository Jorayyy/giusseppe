"use client";

import { useState, useEffect } from "react";
import { Gift, Tag, Check, Ticket, X, Sparkles } from "lucide-react";

interface Voucher {
  code: string;
  type: "discount" | "free-item";
  value: number;
  description: string;
  active: boolean;
}

const VOUCHERS_KEY = "giuseppe_vouchers";
const REDEEMED_KEY = "giuseppe_redeemed_vouchers";

const DEFAULT_VOUCHERS: Voucher[] = [
  { code: "GIUSEPPE100", type: "discount", value: 100, description: "₱100 off your order", active: true },
  { code: "TIRAMISU", type: "free-item", value: 0, description: "Free Tiramisu dessert", active: true },
  { code: "WINE50", type: "discount", value: 50, description: "₱50 off wine selection", active: true },
];

interface RedeemedVoucher {
  code: string;
  description: string;
  redeemedAt: number;
}

export default function GiftVoucher() {
  const [vouchers, setVouchers] = useState<Voucher[]>(DEFAULT_VOUCHERS);
  const [redeemed, setRedeemed] = useState<RedeemedVoucher[]>([]);
  const [inputCode, setInputCode] = useState("");
  const [foundVoucher, setFoundVoucher] = useState<Voucher | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VOUCHERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Voucher[];
        setVouchers(parsed.length > 0 ? parsed : DEFAULT_VOUCHERS);
      }
      const savedRedeemed = localStorage.getItem(REDEEMED_KEY);
      if (savedRedeemed) setRedeemed(JSON.parse(savedRedeemed));
    } catch {}
  }, []);

  const lookupVoucher = () => {
    setError("");
    setFoundVoucher(null);
    const code = inputCode.trim().toUpperCase();
    if (!code) {
      setError("Please enter a voucher code");
      return;
    }
    const voucher = vouchers.find((v) => v.code === code);
    if (!voucher) {
      setError("Invalid voucher code");
      return;
    }
    if (!voucher.active) {
      setError("This voucher is no longer active");
      return;
    }
    if (redeemed.some((r) => r.code === code)) {
      setError("This voucher has already been redeemed");
      return;
    }
    setFoundVoucher(voucher);
  };

  const redeemVoucher = () => {
    if (!foundVoucher) return;
    const entry: RedeemedVoucher = {
      code: foundVoucher.code,
      description: foundVoucher.description,
      redeemedAt: Date.now(),
    };
    const updated = [...redeemed, entry];
    setRedeemed(updated);
    try {
      localStorage.setItem(REDEEMED_KEY, JSON.stringify(updated));
    } catch {}
    setSuccess(`Voucher "${foundVoucher.code}" redeemed successfully!`);
    setFoundVoucher(null);
    setInputCode("");
    setTimeout(() => setSuccess(""), 3000);
  };

  const totalSavings = redeemed.reduce((sum, r) => {
    const v = vouchers.find((v) => v.code === r.code);
    return sum + (v?.value || 0);
  }, 0);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 font-serif text-xl font-bold text-white shadow-md">
          G
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900">Gift Vouchers</h3>
          <p className="text-sm text-stone-500">Redeem your gift card codes</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-amber-100/60 to-stone-50 border border-amber-200/60 p-6">
        {/* Input */}
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && lookupVoucher()}
              placeholder="Enter voucher code"
              className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 uppercase tracking-wider placeholder:text-stone-400 placeholder:normal-case focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
            />
            <button
              onClick={lookupVoucher}
              className="rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition"
            >
              <Ticket className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            <X className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            <Check className="h-4 w-4 shrink-0" />
            {success}
          </div>
        )}

        {/* Found Voucher */}
        {foundVoucher && (
          <div className="mb-4 overflow-hidden rounded-xl border-2 border-amber-300 bg-white">
            {/* Ribbon */}
            <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3">
              <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#FFFBF5]" />
              <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#FFFBF5]" />
              <div className="flex items-center justify-center gap-2">
                <Gift className="h-5 w-5 text-white" />
                <span className="font-serif text-lg font-bold text-white">{foundVoucher.code}</span>
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {foundVoucher.type === "discount" ? (
                  <Tag className="h-5 w-5 text-amber-600" />
                ) : (
                  <Sparkles className="h-5 w-5 text-amber-600" />
                )}
                <span className="text-sm font-medium text-stone-700">{foundVoucher.description}</span>
              </div>
              <button
                onClick={redeemVoucher}
                className="mt-2 w-full rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition"
              >
                Redeem Now
              </button>
            </div>
          </div>
        )}

        {/* Wallet */}
        {redeemed.length > 0 && (
          <div className="mt-4 border-t border-amber-200/60 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-stone-700">Your Wallet</span>
              <span className="text-xs text-stone-500">{redeemed.length} voucher{redeemed.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {[...redeemed].reverse().map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 border border-stone-100">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <div>
                      <span className="text-xs font-bold text-stone-900">{r.code}</span>
                      <p className="text-xs text-stone-500">{r.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-stone-400">
                    {new Date(r.redeemedAt).toLocaleDateString("en-PH")}
                  </span>
                </div>
              ))}
            </div>
            {totalSavings > 0 && (
              <div className="mt-3 rounded-xl bg-amber-100 p-3 text-center">
                <span className="text-xs text-amber-700">Total Savings</span>
                <p className="font-serif text-lg font-bold text-amber-800">₱{totalSavings}</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {redeemed.length === 0 && !foundVoucher && (
          <div className="mt-2 text-center text-sm text-stone-500">
            <Gift className="mx-auto mb-2 h-8 w-8 text-stone-300" />
            <p>No vouchers yet. Enter a code above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
