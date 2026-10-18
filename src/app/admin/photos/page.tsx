"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Trash2, Plus, Loader2 } from "lucide-react";
import ImageUpload from "@/components/image-upload";
import { PageHeader, Toast, Spinner, fieldClass, btnPrimary } from "@/components/admin/ui";

type Photo = { id: string; url: string; alt: string | null; sortOrder: number };

export default function PhotosEditorPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch("/api/photos");
      const data = await res.json();
      if (res.ok && data.data) {
        setPhotos(data.data);
      }
    } catch {
      try {
        const saved = localStorage.getItem("giuseppe_photos");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setPhotos(
              parsed.map((url: string, i: number) => ({
                id: `local-${i}`,
                url,
                alt: null,
                sortOrder: i,
              }))
            );
          }
        }
      } catch {}
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleUpload = async (url: string) => {
    if (!url) return;
    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setPhotos((prev) => [...prev, data.data]);
        showToast("Photo added");
        setNewSlot(false);
      }
    } catch {
      showToast("Failed to save photo");
    }
  };

  const deletePhoto = async (id: string) => {
    if (!id.startsWith("local-")) {
      try {
        await fetch(`/api/photos/${id}`, { method: "DELETE" });
      } catch {}
    }
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    showToast("Photo removed");
  };

  const updateAlt = (id: string, alt: string) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, alt } : p)));
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      const payload = photos.map((p, i) => ({ id: p.id, sortOrder: i }));
      const res = await fetch("/api/photos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: payload }),
      });
      if (res.ok) {
        showToast("Order saved");
      }
    } catch {
      showToast("Failed to save order");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Admin / Photos"
        title="Gallery Photos"
        description="Manage the photos shown on your homepage gallery."
        actions={
          <button onClick={saveOrder} disabled={saving} className={btnPrimary}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>
        }
      />

      <p className="eyebrow text-stone-400">{photos.length} photos</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, idx) => (
          <div key={photo.id} className="group rounded-3xl border border-line bg-white p-4">
            <div className="relative overflow-hidden rounded-2xl bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.alt || `Photo ${idx + 1}`}
                className="h-48 w-full object-cover"
              />
              <div className="absolute left-2 top-2 bg-foreground px-2 py-1 font-mono text-[10px] text-background">
                #{idx + 1}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="flex items-center gap-1.5 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>

            <div className="mt-3">
              <input
                value={photo.alt || ""}
                onChange={(e) => updateAlt(photo.id, e.target.value)}
                placeholder="Alt text (optional)"
                className={`${fieldClass} text-xs`}
              />
            </div>

            <p className="mt-2 truncate font-mono text-[10px] text-stone-400" title={photo.url}>
              {photo.url}
            </p>
          </div>
        ))}

        {newSlot ? (
          <div className="rounded-3xl border border-primary/40 bg-surface p-4">
            <p className="eyebrow mb-3 text-stone-400">Upload new photo</p>
            <ImageUpload type="gallery" onUpload={handleUpload} />
            <button
              onClick={() => setNewSlot(false)}
              className="mt-2 w-full rounded-3xl border border-line bg-white px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setNewSlot(true)}
            className="flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-line bg-white text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">Add Photo</span>
          </button>
        )}
      </div>

      <div className="rounded-3xl border border-line bg-white p-5">
        <h3 className="font-serif text-xl text-foreground">Tips</h3>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          <li>· Click &quot;Add Photo&quot; to upload images to Vercel Blob storage</li>
          <li>· Images are stored permanently and served via CDN</li>
          <li>· Recommended size: 800×600px or larger</li>
          <li>· Supported formats: JPG, PNG, WebP, GIF (max 5MB)</li>
        </ul>
      </div>

      <div className="flex justify-end pb-8">
        <button onClick={saveOrder} disabled={saving} className={btnPrimary}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Photos
        </button>
      </div>

      <Toast message={toast} />
    </div>
  );
}
