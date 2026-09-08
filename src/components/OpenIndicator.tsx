"use client";

interface OpenIndicatorProps {
  isOpen: boolean;
  className?: string;
}

export function OpenIndicator({ isOpen, className }: OpenIndicatorProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="relative flex h-2.5 w-2.5">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isOpen ? "bg-emerald-500" : "bg-stone-400"}`} />
      </span>
      {isOpen ? "Open now" : "Closed"}
    </span>
  );
}
