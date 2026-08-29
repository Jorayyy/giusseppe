"use client";

import { useState, useEffect } from "react";
import { Award, Star, PartyPopper, RotateCcw } from "lucide-react";

const STORAGE_KEY = "giuseppe_loyalty_stamps";

export default function LoyaltyCard() {
  const [stamps, setStamps] = useState(0);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setStamps(Number(saved));
    } catch {}
  }, []);

  const save = (val: number) => {
    setStamps(val);
    try {
      localStorage.setItem(STORAGE_KEY, String(val));
    } catch {}
  };

  const addStamp = () => {
    if (stamps >= 10) return;
    const next = stamps + 1;
    save(next);
    if (next === 10) setCelebrating(true);
  };

  const claimReward = () => {
    save(0);
    setCelebrating(false);
  };

  const progress = Math.min(stamps, 10);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 font-serif text-xl font-bold text-white shadow-md">
          G
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900">Loyalty Card</h3>
          <p className="text-sm text-stone-500">Earn a stamp with every visit</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-amber-100/60 to-stone-50 border border-amber-200/60 p-6">
        {/* Progress Label */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-amber-800">
            {progress}/10 stamps
          </span>
          <div className="flex items-center gap-1.5 text-sm text-stone-600">
            <Award className="h-4 w-4 text-amber-600" />
            <span>{10 - progress === 0 ? "Complete!" : `${10 - progress} to go`}</span>
          </div>
        </div>

        {/* Stamp Grid */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {Array.from({ length: 10 }).map((_, i) => {
            const filled = i < progress;
            return (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                  filled
                    ? "border-amber-500 bg-amber-500 shadow-md scale-105"
                    : "border-dashed border-stone-300 bg-white"
                }`}
              >
                {filled ? (
                  <Star className="h-5 w-5 text-white fill-white" />
                ) : (
                  <span className="text-xs font-bold text-stone-300">{i + 1}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Celebration Banner */}
        {celebrating && (
          <div className="mb-4 rounded-xl bg-amber-600 p-4 text-center text-white shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <PartyPopper className="h-5 w-5" />
              <span className="font-serif text-lg font-bold">Free Tiramisu!</span>
              <PartyPopper className="h-5 w-5" />
            </div>
            <p className="text-sm text-amber-100">Show this to your server to claim your reward.</p>
            <a
              href="https://wa.me/639319704073"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 transition"
            >
              Message us on WhatsApp
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!celebrating ? (
            <button
              onClick={addStamp}
              disabled={stamps >= 10}
              className="flex-1 rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {stamps >= 10 ? "Reward Ready!" : "Earn a Stamp"}
            </button>
          ) : (
            <button
              onClick={claimReward}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white hover:bg-stone-800 transition"
            >
              <RotateCcw className="h-4 w-4" />
              Claim &amp; Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
