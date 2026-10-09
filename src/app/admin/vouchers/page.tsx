"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Ticket,
  Tag,
  Gift,
  Check,
  X,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface Voucher {
  code: string;
  type: "discount" | "free-item";
  value: number;
  description: string;
  active: boolean;
  createdAt: number;
}

const VOUCHERS_KEY = "giuseppe_vouchers";
const REDEEMED_KEY = "giuseppe_redeemed_vouchers";

const DEFAULT_VOUCHERS: Voucher[] = [
  { code: "GIUSEPPE100", type: "discount", value: 100, description: "₱100 off your order", active: true, createdAt: Date.now() },
  { code: "TIRAMISU", type: "free-item", value: 0, description: "Free Tiramisu dessert", active: true, createdAt: Date.now() },
  { code: "WINE50", type: "discount", value: 50, description: "₱50 off wine selection", active: true, createdAt: Date.now() },
];

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>(DEFAULT_VOUCHERS);
  const [redeemed, setRedeemed] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"discount" | "free-item">("discount");
  const [newValue, setNewValue] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VOUCHERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Voucher[];
        setVouchers(parsed.length > 0 ? parsed : DEFAULT_VOUCHERS);
      }
      const savedRedeemed = localStorage.getItem(REDEEMED_KEY);
      if (savedRedeemed) {
        const list = JSON.parse(savedRedeemed) as { code: string }[];
        const counts: Record<string, number> = {};
        list.forEach((r) => {
          counts[r.code] = (counts[r.code] || 0) + 1;
        });
        setRedeemed(counts);
      }
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const save = () => {
    localStorage.setItem(VOUCHERS_KEY, JSON.stringify(vouchers));
    showToast("Vouchers saved successfully");
  };

  const addVoucher = () => {
    const code = newCode.trim().toUpperCase();
    if (!code) return;
    if (vouchers.some((v) => v.code === code)) {
      showToast("Voucher code already exists");
      return;
    }
    const voucher: Voucher = {
      code,
      type: newType,
      value: newType === "discount" ? Number(newValue) || 0 : 0,
      description: newDesc || (newType === "discount" ? `₱${newValue} off` : "Free item"),
      active: true,
      createdAt: Date.now(),
    };
    setVouchers([...vouchers, voucher]);
    setNewCode("");
    setNewType("discount");
    setNewValue("");
    setNewDesc("");
    setShowAdd(false);
    showToast("Voucher added");
  };

  const toggleActive = (code: string) => {
    setVouchers(vouchers.map((v) => (v.code === code ? { ...v, active: !v.active } : v)));
  };

  const deleteVoucher = (code: string) => {
    if (!confirm(`Delete voucher "${code}"?`)) return;
    setVouchers(vouchers.filter((v) => v.code !== code));
    showToast("Voucher deleted");
  };

  const totalRedeemed = Object.values(redeemed).reduce((a, b) => a + b, 0);
  const activeCount = vouchers.filter((v) => v.active).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Gift Vouchers</h1>
          <p className="mt-1 text-stone-500">Manage voucher codes and track redemptions.</p>
        </div>
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-3">
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
          {vouchers.length} vouchers
        </span>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {activeCount} active
        </span>
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary-light">
          {totalRedeemed} redeemed
        </span>
      </div>

      {/* Voucher List */}
      <div className="space-y-3">
        {vouchers.map((v) => (
          <div
            key={v.code}
            className={`rounded-2xl border bg-white p-4 transition ${
              v.active ? "border-stone-200" : "border-stone-100 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    v.active ? "bg-surface text-primary" : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {v.type === "discount" ? <Tag className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-stone-900">{v.code}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        v.active ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {v.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500">{v.description}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-stone-400">
                    <span>{v.type === "discount" ? `₱${v.value} off` : "Free item"}</span>
                    <span>•</span>
                    <span>{redeemed[v.code] || 0} redeemed</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(v.code)}
                  className={`rounded-lg p-2 transition ${
                    v.active ? "text-emerald-600 hover:bg-emerald-50" : "text-stone-400 hover:bg-stone-50"
                  }`}
                  title={v.active ? "Deactivate" : "Activate"}
                >
                  {v.active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => deleteVoucher(v.code)}
                  className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-500 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Voucher */}
      {showAdd ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-stone-900">New Voucher</h3>
            <button onClick={() => setShowAdd(false)} className="rounded-lg p-1 text-stone-400 hover:text-stone-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Code</label>
              <input
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                placeholder="e.g. SUMMER50"
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-900 uppercase tracking-wider placeholder:normal-case outline-none focus:border-accent focus:ring-2 focus:ring-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as "discount" | "free-item")}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
              >
                <option value="discount">Discount</option>
                <option value="free-item">Free Item</option>
              </select>
            </div>
            {newType === "discount" && (
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Value (₱)</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Description</label>
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g. ₱50 off your order"
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={addVoucher}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light transition"
            >
              <Plus className="h-4 w-4" /> Add Voucher
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-300 bg-white py-4 text-sm font-medium text-stone-600 hover:border-accent hover:bg-surface hover:text-primary-light transition"
        >
          <Plus className="h-4 w-4" /> Add Voucher
        </button>
      )}

      {/* Save button bottom */}
      <div className="flex justify-end pb-8">
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-xl">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
