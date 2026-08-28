"use client";

import { useState, useEffect, useRef } from "react";
import {
  Save,
  Upload,
  Trash2,
  ImageIcon,
  Link2,
  X,
  Plus,
} from "lucide-react";

const DEFAULT_PHOTOS = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
  "/photos/4.jpg",
  "/photos/5.jpg",
  "/photos/6.jpg",
];

export default function PhotosEditorPage() {
  const [photos, setPhotos] = useState<string[]>(DEFAULT_PHOTOS);
  const [toast, setToast] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [editingUrl, setEditingUrl] = useState<number | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    try {
      const p = localStorage.getItem("giuseppe_photos");
      if (p) {
        const parsed = JSON.parse(p);
        if (Array.isArray(parsed)) setPhotos(parsed);
      }
    } catch {}
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const save = () => {
    localStorage.setItem("giuseppe_photos", JSON.stringify(photos));
    showToast("Photos saved successfully");
  };

  const handleFileSelect = (idx: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPhotos((prev) => {
        const next = [...prev];
        next[idx] = dataUrl;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (idx: number, e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(idx, file);
    }
  };

  const setUrl = (idx: number) => {
    if (urlInput.trim()) {
      setPhotos((prev) => {
        const next = [...prev];
        next[idx] = urlInput.trim();
        return next;
      });
    }
    setEditingUrl(null);
    setUrlInput("");
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => {
      const next = [...prev];
      next[idx] = DEFAULT_PHOTOS[idx] || "";
      return next;
    });
  };

  const addSlot = () => {
    setPhotos((prev) => [...prev, ""]);
  };

  const removeSlot = (idx: number) => {
    if (photos.length <= 1) return;
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Gallery Photos</h1>
          <p className="mt-1 text-stone-500">Manage the photos shown on your homepage gallery.</p>
        </div>
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition"
        >
          <Save className="h-4 w-4" /> Save
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
          {photos.length} slots
        </span>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {photos.filter((p) => p && !p.startsWith("/photos/")).length} custom
        </span>
      </div>

      {/* Photo grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, idx) => {
          const isDefault = !photo || photo.startsWith("/photos/");
          const displaySrc = photo || DEFAULT_PHOTOS[idx] || "";

          return (
            <div
              key={idx}
              className={`group rounded-2xl border-2 bg-white p-4 transition ${
                dragOver === idx
                  ? "border-amber-400 bg-amber-50"
                  : "border-stone-200 hover:border-stone-300"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(idx); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => handleDrop(idx, e)}
            >
              {/* Image preview */}
              <div className="relative overflow-hidden rounded-xl bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displaySrc}
                  alt={`Photo ${idx + 1}`}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_PHOTOS[idx] || "";
                  }}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => fileRefs.current[idx]?.click()}
                    className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-stone-900 hover:bg-stone-100 transition"
                  >
                    <Upload className="mr-1 inline h-3.5 w-3.5" /> Upload
                  </button>
                  <button
                    onClick={() => { setEditingUrl(idx); setUrlInput(isDefault ? "" : photo); }}
                    className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-stone-900 hover:bg-stone-100 transition"
                  >
                    <Link2 className="mr-1 inline h-3.5 w-3.5" /> URL
                  </button>
                </div>
                {/* Slot number badge */}
                <div className="absolute left-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white">
                  #{idx + 1}
                </div>
                {/* Default badge */}
                {isDefault && (
                  <div className="absolute right-2 top-2 rounded-lg bg-stone-600/80 px-2 py-1 text-xs font-medium text-white">
                    Default
                  </div>
                )}
              </div>

              {/* URL display */}
              <div className="mt-3 flex items-center justify-between">
                <p className="truncate text-xs text-stone-500" title={photo}>
                  {isDefault ? "Default placeholder" : photo}
                </p>
                {!isDefault && (
                  <button
                    onClick={() => removePhoto(idx)}
                    className="rounded p-1 text-stone-400 hover:text-red-500 transition"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={(el) => { fileRefs.current[idx] = el; }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(idx, file);
                }}
              />

              {/* URL input modal */}
              {editingUrl === idx && (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="mb-2 text-xs font-medium text-stone-700">Enter image URL</p>
                  <div className="flex gap-2">
                    <input
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      autoFocus
                      className="flex-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-amber-400"
                      onKeyDown={(e) => e.key === "Enter" && setUrl(idx)}
                    />
                    <button
                      onClick={() => setUrl(idx)}
                      className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
                    >
                      Set
                    </button>
                    <button
                      onClick={() => { setEditingUrl(null); setUrlInput(""); }}
                      className="rounded-lg bg-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Remove slot */}
              {photos.length > 1 && (
                <button
                  onClick={() => removeSlot(idx)}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-red-200 bg-white py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                >
                  <Trash2 className="h-3 w-3" /> Remove slot
                </button>
              )}
            </div>
          );
        })}

        {/* Add slot */}
        <button
          onClick={addSlot}
          className="flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-stone-300 bg-white text-stone-500 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition"
        >
          <Plus className="h-8 w-8" />
          <span className="text-sm font-medium">Add Photo Slot</span>
        </button>
      </div>

      {/* Tips */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">Tips</h3>
        <ul className="space-y-1 text-sm text-stone-500">
          <li>• Drag and drop an image onto any slot, or click Upload</li>
          <li>• Use URL to link to an image hosted elsewhere (Google Drive, Imgur, etc.)</li>
          <li>• Recommended size: 800×600px or larger</li>
          <li>• Supported formats: JPG, PNG, WebP, GIF</li>
        </ul>
      </div>

      {/* Save bottom */}
      <div className="flex justify-end pb-8">
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition"
        >
          <Save className="h-4 w-4" /> Save Photos
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