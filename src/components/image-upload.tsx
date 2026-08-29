"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";

type ImageUploadProps = {
  type: "menu" | "gallery" | "avatar";
  onUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
};

export default function ImageUpload({
  type,
  onUpload,
  currentImage,
  className = "",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const displaySrc = preview || currentImage || null;

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be under 5MB");
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      setUploading(true);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }
        onUpload(data.url);
        setPreview(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        setPreview(null);
      } finally {
        setUploading(false);
      }
    },
    [type, onUpload]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    setPreview(null);
    setError(null);
    onUpload("");
  };

  return (
    <div className={className}>
      {displaySrc && !uploading ? (
        <div className="relative group">
          <div className="h-32 w-full overflow-hidden rounded-xl border border-stone-200">
            <img
              src={displaySrc}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 transition ${
            dragOver
              ? "border-accent bg-surface"
              : "border-stone-300 bg-stone-50 hover:border-stone-400 hover:bg-surface"
          } ${uploading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-stone-400" />
          )}
          <span className="text-sm font-medium text-stone-600">
            {uploading ? "Uploading..." : "Click to upload or drag & drop"}
          </span>
          <span className="text-xs text-stone-400">JPG, PNG, WebP, GIF (max 5MB)</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleChange}
      />

      {error && (
        <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          <X className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
