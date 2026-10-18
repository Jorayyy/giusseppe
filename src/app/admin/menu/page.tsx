"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Plus, Trash2, Star, X, ChevronDown, ChevronUp } from "lucide-react";
import ImageUpload from "@/components/image-upload";
import { MENU } from "@/lib/data";
import { PageHeader, Toast, fieldClass, btnPrimary, btnDanger } from "@/components/admin/ui";

type MenuItem = {
  id?: string;
  name: string;
  price: string;
  desc: string;
  popular?: boolean;
  image?: string;
};

type ApiItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string | null;
  popular: boolean;
};

const CACHE_KEY = "giuseppe_menu";

function mapGrouped(grouped: Record<string, ApiItem[]>): Record<string, MenuItem[]> {
  const mapped: Record<string, MenuItem[]> = {};
  for (const [cat, items] of Object.entries(grouped)) {
    mapped[cat] = items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      desc: i.description,
      popular: i.popular,
      image: i.image ?? undefined,
    }));
  }
  return mapped;
}

function flatten(menu: Record<string, MenuItem[]>) {
  return Object.entries(menu).flatMap(([category, items]) =>
    items.map((item, index) => ({ category, item, index }))
  );
}

export default function MenuEditorPage() {
  const [menu, setMenu] = useState<Record<string, MenuItem[]>>(MENU);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(Object.keys(MENU)));
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("bad status");
        const json = await res.json();
        const grouped = json.data as Record<string, ApiItem[]> | undefined;
        if (!grouped || Object.keys(grouped).length === 0) throw new Error("empty");
        if (cancelled) return;
        const mapped = mapGrouped(grouped);
        setMenu(mapped);
        setExpandedCategories(new Set(Object.keys(mapped)));
        return;
      } catch {}
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached && !cancelled) {
          const parsed = JSON.parse(cached);
          setMenu(parsed);
          setExpandedCategories(new Set(Object.keys(parsed)));
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const entries = flatten(menu);
      const keepIds = new Set(entries.map((e) => e.item.id).filter(Boolean));

      const currentRes = await fetch("/api/menu");
      if (!currentRes.ok) throw new Error("db down");
      const currentJson = await currentRes.json();
      const remote: ApiItem[] = Object.values(currentJson.data ?? {}) as ApiItem[];

      for (const [i, { category, item }] of entries.entries()) {
        const payload = {
          name: item.name,
          price: item.price,
          description: item.desc,
          category,
          image: item.image || null,
          popular: !!item.popular,
          sortOrder: i,
        };
        const res = await fetch("/api/menu", {
          method: item.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.id ? { id: item.id, ...payload } : payload),
        });
        if (!res.ok) throw new Error("write failed");
      }

      for (const r of remote) {
        if (!keepIds.has(r.id)) {
          const res = await fetch(`/api/menu?id=${r.id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("delete failed");
        }
      }

      const again = await fetch("/api/menu");
      if (again.ok) {
        const json = await again.json();
        if (json.data && Object.keys(json.data).length > 0) {
          setMenu(mapGrouped(json.data));
        }
      }
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch {}
      showToast("Menu saved");
    } catch {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(menu));
        showToast("Saved locally — database unreachable");
      } catch {
        showToast("Couldn't save — try again");
      }
    }
    setSaving(false);
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const updateItem = (cat: string, idx: number, field: keyof MenuItem, value: string | boolean) => {
    setMenu((prev) => ({
      ...prev,
      [cat]: prev[cat].map((item, i) => (i === idx ? { ...item, [field]: value } : item)),
    }));
  };

  const deleteItem = (cat: string, idx: number) => {
    setMenu((prev) => ({
      ...prev,
      [cat]: prev[cat].filter((_, i) => i !== idx),
    }));
  };

  const addItem = (cat: string) => {
    setMenu((prev) => ({
      ...prev,
      [cat]: [...prev[cat], { name: "New Item", price: "₱0", desc: "", popular: false }],
    }));
  };

  const deleteCategory = (cat: string) => {
    if (!confirm(`Delete "${cat}" and all its items?`)) return;
    setMenu((prev) => {
      const next = { ...prev };
      delete next[cat];
      return next;
    });
  };

  const addCategory = () => {
    const name = newCategoryName.trim();
    if (!name || menu[name]) return;
    setMenu((prev) => ({ ...prev, [name]: [] }));
    setNewCategoryName("");
    setShowNewCategory(false);
    setExpandedCategories((prev) => new Set(prev).add(name));
  };

  const moveItem = (cat: string, idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= menu[cat].length) return;
    setMenu((prev) => {
      const items = [...prev[cat]];
      [items[idx], items[newIdx]] = [items[newIdx], items[idx]];
      return { ...prev, [cat]: items };
    });
  };

  const totalItems = Object.values(menu).flat().length;
  const popularTotal = Object.values(menu).flat().filter((i) => i.popular).length;

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Admin / Menu"
        title="Menu Editor"
        description="Manage your menu items, prices, and photos."
        actions={
          <button onClick={save} disabled={saving} className={btnPrimary}>
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Changes"}
          </button>
        }
      />

      <p className="eyebrow text-stone-400">
        {Object.keys(menu).length} categories · {totalItems} items · {popularTotal} popular
      </p>

      <div className="space-y-4">
        {Object.entries(menu).map(([cat, items]) => (
          <div key={cat} className="border border-line bg-white">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => toggleCategory(cat)}
                className="flex flex-1 items-center gap-3 text-left"
                aria-expanded={expandedCategories.has(cat)}
              >
                {expandedCategories.has(cat) ? (
                  <ChevronUp className="h-4 w-4 text-stone-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-stone-400" />
                )}
                <span className="font-serif text-xl text-foreground">{cat}</span>
                <span className="eyebrow text-stone-400">{items.length} items</span>
              </button>
              <button
                onClick={() => deleteCategory(cat)}
                aria-label={`Delete ${cat}`}
                className="p-2 text-stone-400 transition-colors hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {expandedCategories.has(cat) && (
              <div className="border-t border-line">
                <div className="divide-y divide-line">
                  {items.map((item, idx) => (
                    <div key={idx} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveItem(cat, idx, -1)}
                              disabled={idx === 0}
                              className="p-0.5 text-stone-400 transition-colors hover:text-foreground disabled:opacity-30"
                              aria-label="Move up"
                            >
                              <ChevronUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => moveItem(cat, idx, 1)}
                              disabled={idx === items.length - 1}
                              className="p-0.5 text-stone-400 transition-colors hover:text-foreground disabled:opacity-30"
                              aria-label="Move down"
                            >
                              <ChevronDown className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          {item.image && (
                            <div className="h-16 w-16 overflow-hidden border border-line">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <input
                              value={item.name}
                              onChange={(e) => updateItem(cat, idx, "name", e.target.value)}
                              placeholder="Item name"
                              className={fieldClass}
                            />
                            <input
                              value={item.price}
                              onChange={(e) => updateItem(cat, idx, "price", e.target.value)}
                              placeholder="₱0"
                              className={fieldClass}
                            />
                          </div>
                          <input
                            value={item.desc}
                            onChange={(e) => updateItem(cat, idx, "desc", e.target.value)}
                            placeholder="Description"
                            className={fieldClass}
                          />
                          <div className="space-y-2">
                            <ImageUpload
                              type="menu"
                              currentImage={item.image}
                              onUpload={(url) => updateItem(cat, idx, "image", url)}
                            />
                            <input
                              value={item.image || ""}
                              onChange={(e) => updateItem(cat, idx, "image", e.target.value)}
                              placeholder="Or paste image URL"
                              className={`${fieldClass} text-xs`}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm text-foreground">
                              <input
                                type="checkbox"
                                checked={!!item.popular}
                                onChange={(e) => updateItem(cat, idx, "popular", e.target.checked)}
                                className="h-4 w-4 accent-[var(--primary)]"
                              />
                              <Star className={`h-3.5 w-3.5 ${item.popular ? "fill-accent text-accent" : "text-stone-300"}`} />
                              <span className="font-medium">Popular</span>
                            </label>
                            <button onClick={() => deleteItem(cat, idx)} className={btnDanger}>
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addItem(cat)}
                  className="flex w-full items-center justify-center gap-2 border-t border-dashed border-line py-3 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-primary"
                >
                  <Plus className="h-4 w-4" /> Add Item
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showNewCategory ? (
        <div className="flex items-center gap-3 border border-line bg-white p-4">
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            autoFocus
            className={fieldClass}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <button onClick={addCategory} className={btnPrimary}>
            Add
          </button>
          <button
            onClick={() => {
              setShowNewCategory(false);
              setNewCategoryName("");
            }}
            className="p-2 text-stone-400 hover:text-foreground"
            aria-label="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowNewCategory(true)}
          className="flex w-full items-center justify-center gap-2 border border-dashed border-line py-4 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="h-4 w-4" /> Add Category
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
