"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Store,
  Phone,
  MapPin,
  DollarSign,
  Globe,
  RotateCcw,
} from "lucide-react";

const DEFAULT_SETTINGS = {
  name: "Giuseppe's",
  tagline: "Authentic Italian Cucina",
  phone: "0931 970 4073",
  address: "173 Avenida Veteranos, Tacloban City, 6500 Leyte",
  priceRange: "₱500–2,000",
  mapsUrl: "https://maps.google.com/?q=173+Avenida+Veteranos+Tacloban+City+6500+Leyte",
  googleReviewUrl: "https://www.google.com/search?q=Giuseppe's+Tacloban+reviews",
};

export default function SettingsEditorPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("giuseppe_settings");
      if (s) setSettings(JSON.parse(s));
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const save = () => {
    localStorage.setItem("giuseppe_settings", JSON.stringify(settings));
    showToast("Settings saved successfully");
  };

  const resetToDefault = () => {
    if (!confirm("Reset all settings to default?")) return;
    setSettings(DEFAULT_SETTINGS);
  };

  const updateField = (field: keyof typeof settings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Settings</h1>
          <p className="mt-1 text-stone-500">Manage your restaurant information and links.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefault}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition"
          >
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-stone-900">Restaurant Info</h2>
            <p className="text-sm text-stone-500">Basic information about your restaurant</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <Store className="h-3 w-3" /> Restaurant Name
            </span>
            <input
              value={settings.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            />
          </label>
          <label className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <DollarSign className="h-3 w-3" /> Price Range
            </span>
            <input
              value={settings.priceRange}
              onChange={(e) => updateField("priceRange", e.target.value)}
              placeholder="₱500–2,000"
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            />
          </label>
          <label className="space-y-1.5 sm:col-span-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Tagline
            </span>
            <input
              value={settings.tagline}
              onChange={(e) => updateField("tagline", e.target.value)}
              placeholder="Authentic Italian Cucina"
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            />
          </label>
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-stone-900">Contact Details</h2>
            <p className="text-sm text-stone-500">How customers can reach you</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <Phone className="h-3 w-3" /> Phone Number
            </span>
            <input
              value={settings.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="0931 970 4073"
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            />
          </label>
          <label className="space-y-1.5 sm:col-span-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <MapPin className="h-3 w-3" /> Address
            </span>
            <input
              value={settings.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            />
          </label>
        </div>
      </div>

      {/* Links */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100">
            <Globe className="h-5 w-5 text-stone-600" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-stone-900">Online Links</h2>
            <p className="text-sm text-stone-500">External links for your restaurant</p>
          </div>
        </div>
        <div className="space-y-4">
          <label className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <MapPin className="h-3 w-3" /> Google Maps URL
            </span>
            <input
              value={settings.mapsUrl}
              onChange={(e) => updateField("mapsUrl", e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            />
          </label>

          <label className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Google Review URL
            </span>
            <input
              value={settings.googleReviewUrl}
              onChange={(e) => updateField("googleReviewUrl", e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-accent focus:ring-2 focus:ring-surface"
            />
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <h3 className="mb-4 font-serif text-lg font-semibold text-stone-900">Preview</h3>
        <div className="rounded-xl bg-stone-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary font-serif text-lg font-bold text-white">G</div>
            <div>
              <h4 className="font-serif text-xl font-bold text-stone-900">{settings.name}</h4>
              <p className="text-sm text-stone-500">{settings.tagline}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm text-stone-600">
            <p>📍 {settings.address}</p>
            <p>📞 {settings.phone}</p>
            <p>💰 {settings.priceRange}</p>
          </div>
        </div>
      </div>

      {/* Save bottom */}
      <div className="flex justify-end pb-8">
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition"
        >
          <Save className="h-4 w-4" /> Save Settings
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