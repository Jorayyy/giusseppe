"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  GripVertical,
  Star,
  Image as ImageIcon,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ImageUpload from "@/components/image-upload";

type MenuItem = { name: string; price: string; desc: string; popular?: boolean; image?: string };

const DEFAULT_MENU: Record<string, MenuItem[]> = {
  Antipasti: [
    { name: "Focaccia", price: "₱180", desc: "Warm house-baked flatbread, rosemary, olive oil", popular: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" },
    { name: "Bruschetta al Pomodoro", price: "₱320", desc: "Grilled sourdough, fresh tomatoes, basil, extra virgin olive oil", popular: true, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
    { name: "Calamari Fritti", price: "₱480", desc: "Lightly fried squid, lemon aioli, marinara", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop" },
    { name: "Antipasto Platter", price: "₱680", desc: "Prosciutto, salami, olives, cheese, artichokes, grilled bread", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop" },
    { name: "Baked Scallops", price: "₱580", desc: "Fresh scallops, garlic butter, parmesan crust", image: "https://images.unsplash.com/photo-1635146037526-a164a3b84f9b?w=400&h=300&fit=crop" },
  ],
  "Wood-Fired Pizza": [
    { name: "Margherita", price: "₱420", desc: "San Marzano tomato, fresh mozzarella, basil", popular: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
    { name: "Prosciutto e Rucola", price: "₱520", desc: "Parma ham, wild arugula, parmesan shavings", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop" },
    { name: "Hawaiian", price: "₱480", desc: "Ham, pineapple, mozzarella, tomato sauce", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop" },
    { name: "Quattro Formaggi", price: "₱520", desc: "Mozzarella, gorgonzola, parmesan, fontina", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
    { name: "Capricciosa", price: "₱520", desc: "Ham, mushrooms, artichokes, olives, mozzarella", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop" },
  ],
  Primi: [
    { name: "Spaghetti Puttanesca", price: "₱420", desc: "Tomato sauce, olives, capers, anchovies, garlic", popular: true, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop" },
    { name: "Lasagna", price: "₱480", desc: "Layers of pasta, beef ragù, béchamel, mozzarella, parmesan", popular: true, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop" },
    { name: "Ravioli", price: "₱520", desc: "House-made ricotta & spinach pasta, sage butter", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
    { name: "Spaghetti al Salsiccia", price: "₱450", desc: "Italian sausage, garlic, chili flakes, olive oil", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop" },
    { name: "Risotto ai Funghi", price: "₱580", desc: "Creamy carnaroli rice, porcini, wild mushrooms, thyme", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop" },
    { name: "Cacio e Pepe", price: "₱420", desc: "Tonarelli, black pepper, Pecorino Romano DOP", image: "https://images.unsplash.com/photo-1677756119517-756a6a555c7f?w=400&h=300&fit=crop" },
  ],
  Secondi: [
    { name: "Grilled Pork Chop", price: "₱580", desc: "Marinated bone-in pork chop, garlic mashed potatoes, vegetables", popular: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
    { name: "Chicken Milanese", price: "₱480", desc: "Crispy breaded chicken breast, Marsala sauce, pasta", popular: true, image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop" },
    { name: "Grilled Salmon", price: "₱680", desc: "Fresh salmon fillet, lemon butter, seasonal vegetables", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop" },
    { name: "Ribeye Steak", price: "₱980", desc: "USDA ribeye, your choice of peppercorn or mushroom sauce", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop" },
    { name: "Pork Ribs", price: "₱780", desc: "Slow-cooked spare ribs, BBQ glaze, coleslaw", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
    { name: "Melanzane alla Parmigiana", price: "₱420", desc: "Baked eggplant, San Marzano tomato, mozzarella, basil", image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop" },
  ],
  Dolci: [
    { name: "Tiramisu", price: "₱320", desc: "Espresso-soaked savoiardi, mascarpone cream, cocoa", popular: true, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop" },
    { name: "Panna Cotta", price: "₱280", desc: "Vanilla panna cotta, warm berry compote", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop" },
  ],
  Drinks: [
    { name: "House Wine (Red/White)", price: "₱280", desc: "Selected Italian wine, glass", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop" },
    { name: "Negroni", price: "₱380", desc: "Campari, sweet vermouth, gin", image: "https://images.unsplash.com/photo-1514362545857-3bc16c1c57e7?w=400&h=300&fit=crop" },
    { name: "Amalfi Spritz", price: "₱350", desc: "Limoncello, prosecco, soda, basil", image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=300&fit=crop" },
    { name: "San Pellegrino", price: "₱120", desc: "Sparkling mineral water, 500ml", image: "https://images.unsplash.com/photo-1523362628745-0c100fc988a5?w=400&h=300&fit=crop" },
  ],
};

export default function MenuEditorPage() {
  const [menu, setMenu] = useState<Record<string, MenuItem[]>>(DEFAULT_MENU);
  const [toast, setToast] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(Object.keys(DEFAULT_MENU)));
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    try {
      const m = localStorage.getItem("giuseppe_menu");
      if (m) setMenu(JSON.parse(m));
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const save = () => {
    localStorage.setItem("giuseppe_menu", JSON.stringify(menu));
    showToast("Menu saved successfully");
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Menu Editor</h1>
          <p className="mt-1 text-stone-500">Manage your menu items, prices, and photos.</p>
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
          {Object.keys(menu).length} categories
        </span>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
          {Object.values(menu).flat().length} items
        </span>
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary-light">
          {Object.values(menu).flat().filter((i) => i.popular).length} popular
        </span>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {Object.entries(menu).map(([cat, items]) => (
          <div key={cat} className="rounded-2xl border border-stone-200 bg-white">
            {/* Category header */}
            <button
              onClick={() => toggleCategory(cat)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100">
                  {expandedCategories.has(cat) ? (
                    <ChevronUp className="h-4 w-4 text-stone-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-stone-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">{cat}</h3>
                  <p className="text-xs text-stone-500">{items.length} items</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCategory(cat);
                }}
                className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-500 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </button>

            {/* Items */}
            {expandedCategories.has(cat) && (
              <div className="space-y-3 border-t border-stone-100 p-4 pt-3">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl border border-stone-100 bg-stone-50/50 p-4 transition hover:border-stone-200"
                  >
                    <div className="flex items-start gap-3">
                      {/* Drag handle & image */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                          <button
                            onClick={() => moveItem(cat, idx, -1)}
                            disabled={idx === 0}
                            className="rounded p-0.5 text-stone-400 hover:text-stone-600 disabled:opacity-30"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => moveItem(cat, idx, 1)}
                            disabled={idx === items.length - 1}
                            className="rounded p-0.5 text-stone-400 hover:text-stone-600 disabled:opacity-30"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>
                        {item.image && (
                          <div className="h-16 w-16 overflow-hidden rounded-lg border border-stone-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                        )}
                      </div>

                      {/* Fields */}
                      <div className="flex-1 space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <input
                            value={item.name}
                            onChange={(e) => updateItem(cat, idx, "name", e.target.value)}
                            placeholder="Item name"
                            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                          />
                          <input
                            value={item.price}
                            onChange={(e) => updateItem(cat, idx, "price", e.target.value)}
                            placeholder="₱0"
                            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                          />
                        </div>
                        <input
                          value={item.desc}
                          onChange={(e) => updateItem(cat, idx, "desc", e.target.value)}
                          placeholder="Description"
                          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
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
                            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="inline-flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={!!item.popular}
                              onChange={(e) => updateItem(cat, idx, "popular", e.target.checked)}
                              className="h-4 w-4 rounded border-stone-300 text-primary focus:ring-accent"
                            />
                            <Star className={`h-3.5 w-3.5 ${item.popular ? "fill-accent text-accent" : "text-stone-400"}`} />
                            <span className="font-medium">Popular</span>
                          </label>
                          <button
                            onClick={() => deleteItem(cat, idx)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addItem(cat)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-white py-3 text-sm font-medium text-stone-600 hover:border-accent hover:bg-surface hover:text-primary-light transition"
                >
                  <Plus className="h-4 w-4" /> Add Item
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Category */}
      {showNewCategory ? (
        <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4">
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            autoFocus
            className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <button
            onClick={addCategory}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
          >
            Add
          </button>
          <button
            onClick={() => { setShowNewCategory(false); setNewCategoryName(""); }}
            className="rounded-lg p-2 text-stone-400 hover:text-stone-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowNewCategory(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-300 bg-white py-4 text-sm font-medium text-stone-600 hover:border-accent hover:bg-surface hover:text-primary-light transition"
        >
          <Plus className="h-4 w-4" /> Add Category
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