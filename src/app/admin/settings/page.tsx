"use client";

import { useState, useEffect } from "react";
import { Save, Store, Phone, MapPin, PhilippinePeso, Globe, RotateCcw } from "lucide-react";
import { PageHeader, Toast, fieldClass, btnPrimary, btnSecondary } from "@/components/admin/ui";

const DEFAULT_SETTINGS = {
  name: "Giuseppe's",
  tagline: "Authentic Italian Cucina",
  phone: "0931 970 4073",
  address: "173 Avenida Veteranos, Tacloban City, 6500 Leyte",
  priceRange: "₱500–2,000",
  mapsUrl: "https://maps.google.com/?q=173+Avenida+Veteranos+Tacloban+City+6500+Leyte",
  googleReviewUrl: "https://www.google.com/search?q=Giuseppe's+Tacloban+reviews",
};

function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block space-y-1.5 ${className}`}>
      <span className="eyebrow flex items-center gap-1.5 text-stone-400">
        {icon}
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={fieldClass}
      />
    </label>
  );
}

export default function SettingsEditorPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("db down");
        const json = await res.json();
        const data = json.data as Record<string, string> | undefined;
        if (!data || Object.keys(data).length === 0) throw new Error("empty");
        if (!cancelled) setSettings((prev) => ({ ...prev, ...data }));
        return;
      } catch {}
      try {
        const s = localStorage.getItem("giuseppe_settings");
        if (s && !cancelled) setSettings(JSON.parse(s));
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
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: Object.entries(settings).map(([key, value]) => ({ key, value })),
        }),
      });
      if (!res.ok) throw new Error("db down");
      localStorage.removeItem("giuseppe_settings");
      showToast("Settings saved");
    } catch {
      localStorage.setItem("giuseppe_settings", JSON.stringify(settings));
      showToast("Saved locally — database unreachable");
    }
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
      <PageHeader
        kicker="Admin / Settings"
        title="Settings"
        description="Manage your restaurant information and links."
        actions={
          <>
            <button onClick={resetToDefault} className={btnSecondary}>
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button onClick={save} className={btnPrimary}>
              <Save className="h-4 w-4" /> Save
            </button>
          </>
        }
      />

      <div className="rounded-3xl border border-line bg-white p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-line pb-4">
          <Store className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-serif text-xl text-foreground">Restaurant Info</h2>
            <p className="text-sm text-muted">Basic information about your restaurant</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Restaurant Name"
            icon={<Store className="h-3 w-3" />}
            value={settings.name}
            onChange={(v) => updateField("name", v)}
          />
          <Field
            label="Price Range"
            icon={<PhilippinePeso className="h-3 w-3" />}
            value={settings.priceRange}
            onChange={(v) => updateField("priceRange", v)}
            placeholder="₱500–2,000"
          />
          <Field
            label="Tagline"
            value={settings.tagline}
            onChange={(v) => updateField("tagline", v)}
            placeholder="Authentic Italian Cucina"
            className="sm:col-span-2"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-white p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-line pb-4">
          <Phone className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-serif text-xl text-foreground">Contact Details</h2>
            <p className="text-sm text-muted">How customers can reach you</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Phone Number"
            icon={<Phone className="h-3 w-3" />}
            value={settings.phone}
            onChange={(v) => updateField("phone", v)}
            placeholder="0931 970 4073"
          />
          <Field
            label="Address"
            icon={<MapPin className="h-3 w-3" />}
            value={settings.address}
            onChange={(v) => updateField("address", v)}
            className="sm:col-span-2"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-white p-6">
        <div className="mb-5 flex items-center gap-3 border-b border-line pb-4">
          <Globe className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-serif text-xl text-foreground">Online Links</h2>
            <p className="text-sm text-muted">External links for your restaurant</p>
          </div>
        </div>
        <div className="space-y-5">
          <Field
            label="Google Maps URL"
            icon={<MapPin className="h-3 w-3" />}
            value={settings.mapsUrl}
            onChange={(v) => updateField("mapsUrl", v)}
          />
          <Field
            label="Google Review URL"
            value={settings.googleReviewUrl}
            onChange={(v) => updateField("googleReviewUrl", v)}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-white p-6">
        <h3 className="font-serif text-xl text-foreground">Preview</h3>
        <div className="mt-4 border border-line bg-background p-6">
          <p className="font-serif text-3xl text-foreground">
            {settings.name}
            <span className="text-primary">.</span>
          </p>
          <p className="eyebrow mt-2 text-stone-400">{settings.tagline}</p>
          <div className="mt-5 space-y-2 text-sm text-muted">
            <p>{settings.address}</p>
            <p>{settings.phone}</p>
            <p>{settings.priceRange}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pb-8">
        <button onClick={save} className={btnPrimary}>
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </div>

      <Toast message={toast} />
    </div>
  );
}
