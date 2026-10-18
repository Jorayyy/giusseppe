"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Tag, Gift, X, ToggleLeft, ToggleRight } from "lucide-react";
import { PageHeader, Toast, fieldClass, fieldMonoClass, btnPrimary, Badge } from "@/components/admin/ui";

interface Voucher {
  id?: string;
  code: string;
  type: "discount" | "free-item";
  value: number;
  description: string;
  active: boolean;
  createdAt: number;
  redeemCount?: number;
}

const VOUCHERS_KEY = "giuseppe_vouchers";
const REDEEMED_KEY = "giuseppe_redeemed_vouchers";

const DEFAULT_VOUCHERS: Voucher[] = [
  { code: "GIUSEPPE100", type: "discount", value: 100, description: "₱100 off your order", active: true, createdAt: Date.now() },
  { code: "TIRAMISU", type: "free-item", value: 0, description: "Free Tiramisu dessert", active: true, createdAt: Date.now() },
  { code: "WINE50", type: "discount", value: 50, description: "₱50 off wine selection", active: true, createdAt: Date.now() },
];

type ApiVoucher = {
  id: string;
  code: string;
  type: "discount" | "free-item";
  value: number;
  description: string | null;
  active: boolean;
  createdAt: string;
  _count?: { redemptions: number };
};

function mapApiVoucher(v: ApiVoucher): Voucher {
  return {
    id: v.id,
    code: v.code,
    type: v.type,
    value: v.value,
    description: v.description || "",
    active: v.active,
    createdAt: Date.parse(v.createdAt) || Date.now(),
    redeemCount: v._count?.redemptions ?? 0,
  };
}

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>(DEFAULT_VOUCHERS);
  const [redeemed, setRedeemed] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"discount" | "free-item">("discount");
  const [newValue, setNewValue] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/vouchers");
        if (!res.ok) throw new Error("db down");
        const json = await res.json();
        if (!Array.isArray(json.data) || json.data.length === 0) throw new Error("empty");
        if (!cancelled) setVouchers(json.data.map(mapApiVoucher));
        return;
      } catch {}
      try {
        const saved = localStorage.getItem(VOUCHERS_KEY);
        if (saved && !cancelled) {
          const parsed = JSON.parse(saved) as Voucher[];
          if (parsed.length > 0) setVouchers(parsed);
        }
        const savedRedeemed = localStorage.getItem(REDEEMED_KEY);
        if (savedRedeemed && !cancelled) {
          const list = JSON.parse(savedRedeemed) as { code: string }[];
          const counts: Record<string, number> = {};
          list.forEach((r) => {
            counts[r.code] = (counts[r.code] || 0) + 1;
          });
          setRedeemed(counts);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const currentRes = await fetch("/api/vouchers");
      if (!currentRes.ok) throw new Error("db down");
      const currentJson = await currentRes.json();
      const remote: ApiVoucher[] = Array.isArray(currentJson.data) ? currentJson.data : [];
      const remoteById = new Map(remote.map((r) => [r.id, r]));
      const localIds = new Set(vouchers.map((v) => v.id).filter(Boolean) as string[]);

      for (const v of vouchers) {
        const payload = { code: v.code, type: v.type, value: v.value, description: v.description };
        if (v.id) {
          const before = remoteById.get(v.id);
          if (before && before.active !== v.active) {
            const res = await fetch("/api/vouchers", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: v.id, active: v.active }),
            });
            if (!res.ok) throw new Error("update failed");
          }
        } else {
          const res = await fetch("/api/vouchers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, active: v.active }),
          });
          if (!res.ok) throw new Error("create failed");
        }
      }

      for (const r of remote) {
        if (!localIds.has(r.id)) {
          const res = await fetch(`/api/vouchers/${r.id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("delete failed");
        }
      }

      const again = await fetch("/api/vouchers");
      if (again.ok) {
        const json = await again.json();
        if (Array.isArray(json.data) && json.data.length > 0) {
          setVouchers(json.data.map(mapApiVoucher));
        }
      }
      showToast("Vouchers saved");
    } catch {
      localStorage.setItem(VOUCHERS_KEY, JSON.stringify(vouchers));
      showToast("Saved locally — database unreachable");
    }
    setSaving(false);
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

  const totalRedeemed = vouchers.reduce((sum, v) => sum + (v.redeemCount ?? redeemed[v.code] ?? 0), 0);
  const activeCount = vouchers.filter((v) => v.active).length;

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Admin / Vouchers"
        title="Gift Vouchers"
        description="Manage voucher codes and track redemptions."
        actions={
          <button onClick={save} disabled={saving} className={btnPrimary}>
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Changes"}
          </button>
        }
      />

      <p className="eyebrow text-stone-400">
        {vouchers.length} vouchers · {activeCount} active · {totalRedeemed} redeemed
      </p>

      <div className="space-y-3">
        {vouchers.map((v) => (
          <div
            key={v.code}
            className={`border bg-white p-4 transition-colors ${
              v.active ? "border-line" : "border-line/60 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center border ${
                    v.active ? "border-primary/40 text-primary" : "border-line text-stone-400"
                  }`}
                >
                  {v.type === "discount" ? <Tag className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base tracking-wider text-foreground">{v.code}</span>
                    <Badge tone={v.active ? "primary" : "muted"}>{v.active ? "Active" : "Inactive"}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">{v.description}</p>
                  <div className="mt-1 flex items-center gap-3 font-mono text-[11px] text-stone-400">
                    <span>{v.type === "discount" ? `₱${v.value} off` : "Free item"}</span>
                    <span>·</span>
                    <span>{v.redeemCount ?? redeemed[v.code] ?? 0} redeemed</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(v.code)}
                  className={`p-2 transition-colors ${
                    v.active ? "text-primary hover:bg-surface" : "text-stone-400 hover:text-foreground"
                  }`}
                  title={v.active ? "Deactivate" : "Activate"}
                >
                  {v.active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => deleteVoucher(v.code)}
                  className="p-2 text-stone-400 transition-colors hover:text-red-600"
                  aria-label={`Delete ${v.code}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd ? (
        <div className="rounded-3xl border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
            <h3 className="font-serif text-xl text-foreground">New Voucher</h3>
            <button onClick={() => setShowAdd(false)} className="p-1 text-stone-400 hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="eyebrow text-stone-400">Code</span>
              <input
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                placeholder="e.g. SUMMER50"
                className={fieldMonoClass}
              />
            </label>
            <label className="block space-y-1.5">
              <span className="eyebrow text-stone-400">Type</span>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as "discount" | "free-item")}
                className={fieldClass}
              >
                <option value="discount">Discount</option>
                <option value="free-item">Free Item</option>
              </select>
            </label>
            {newType === "discount" && (
              <label className="block space-y-1.5">
                <span className="eyebrow text-stone-400">Value (₱)</span>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="0"
                  className={fieldClass}
                />
              </label>
            )}
            <label className="block space-y-1.5">
              <span className="eyebrow text-stone-400">Description</span>
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g. ₱50 off your order"
                className={fieldClass}
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button onClick={addVoucher} className={btnPrimary}>
              <Plus className="h-4 w-4" /> Add Voucher
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-line py-4 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="h-4 w-4" /> Add Voucher
        </button>
      )}

      <div className="flex justify-end pb-8">
        <button onClick={save} disabled={saving} className={btnPrimary}>
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <Toast message={toast} />
    </div>
  );
}
