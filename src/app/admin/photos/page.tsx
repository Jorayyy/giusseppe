"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Trash2,
  ImageIcon,
  X,
  Plus,
  GripVertical,
  Loader2,
} from "lucide-react";
import ImageUpload from "@/components/image-upload";

type Photo = { id: string; url: string; alt: string | null; sortOrder: number };

export default function PhotosEditorPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/photos");
      const data = await res.json();
      if (res.ok && data.data) {
        setPhotos(data.data);
      }
    } catch {
      // Fallback to localStorage for backwards compatibility
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
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

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
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, alt } : p))
    );
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Gallery Photos</h1>
          <p className="mt-1 text-stone-500">Manage the photos shown on your homepage gallery.</p>
        </div>
        <button
          onClick={saveOrder}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
      </div>

      <div className="flex gap-3">
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
          {photos.length} photos
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="group rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-stone-300"
          >
            <div className="relative overflow-hidden rounded-xl bg-stone-100">
              <img
                src={photo.url}
                alt={photo.alt || `Photo ${idx + 1}`}
                className="h-48 w-full object-cover"
              />
              <div className="absolute left-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white">
                #{idx + 1}
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 className="mr-1 inline h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>

            <div className="mt-3">
              <input
                value={photo.alt || ""}
                onChange={(e) => updateAlt(photo.id, e.target.value)}
                placeholder="Alt text (optional)"
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-900 outline-none focus:border-accent"
              />
            </div>

            <p className="mt-2 truncate text-xs text-stone-400" title={photo.url}>
              {photo.url}
            </p>
          </div>
        ))}

        {newSlot ? (
          <div className="rounded-2xl border-2 border-accent bg-surface p-4">
            <p className="mb-3 text-sm font-medium text-stone-700">Upload new photo</p>
            <ImageUpload
              type="gallery"
              onUpload={handleUpload}
            />
            <button
              onClick={() => setNewSlot(false)}
              className="mt-2 w-full rounded-lg bg-stone-200 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-300 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setNewSlot(true)}
            className="flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-stone-300 bg-white text-stone-500 hover:border-accent hover:bg-surface hover:text-primary-light transition"
          >
            <Plus className="h-8 w-8" />
            <span className="text-sm font-medium">Add Photo</span>
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">Tips</h3>
        <ul className="space-y-1 text-sm text-stone-500">
          <li>• Click &quot;Add Photo&quot; to upload images to Vercel Blob storage</li>
          <li>• Images are stored permanently and served via CDN</li>
          <li>• Recommended size: 800×600px or larger</li>
          <li>• Supported formats: JPG, PNG, WebP, GIF (max 5MB)</li>
        </ul>
      </div>

      <div className="flex justify-end pb-8">
        <button
          onClick={saveOrder}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Photos
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-xl">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
