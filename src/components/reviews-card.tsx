"use client";

import { useState } from "react";
import { Star, Heart, Send, ExternalLink } from "lucide-react";
import { RESTAURANT, type Review } from "@/lib/data";

export default function ReviewsCard({
  reviews,
  onReview,
  showGooglePrompt,
}: {
  reviews: Review[];
  onReview: (r: Review) => void;
  showGooglePrompt: boolean;
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });
  const [helpfulIdx, setHelpfulIdx] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    onReview({
      name: form.name,
      avatar: form.name.slice(0, 2).toUpperCase(),
      rating: form.rating,
      date: "Just now",
      text: form.text,
      likes: 0,
    });
    setForm({ name: "", rating: 5, text: "" });
    setShowForm(false);
  };

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold">Reviews</h2>
        <span className="text-sm text-stone-500">{reviews.length} reviews</span>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-stone-50 p-4">
        <div className="text-3xl font-bold">{RESTAURANT.rating}</div>
        <div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${
                  s <= Math.round(RESTAURANT.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-stone-300"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-stone-500">
            {RESTAURANT.reviewCount} Google reviews · 5/5 Facebook · 4 votes
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="ml-auto rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-stone-50"
        >
          Write a review
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-xl border border-stone-200 p-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
          />
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm({ ...form, rating: s })}
                className="p-0.5 hover:scale-110 transition"
              >
                <Star
                  className={`h-5 w-5 ${
                    s <= form.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-stone-200"
                  }`}
                />
              </button>
            ))}
          </div>
          <textarea
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Tell us about your experience..."
            rows={3}
            className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              <Send className="h-4 w-4" /> Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium hover:bg-stone-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {showGooglePrompt && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="text-sm">
            <p className="font-medium text-amber-900">Thanks for the review! ✨</p>
            <p className="text-xs text-amber-700/70">Want to also post on Google?</p>
          </div>
          <a
            href={RESTAURANT.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-amber-700 shadow-sm hover:bg-amber-100"
          >
            Post on Google <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      <div className="mt-4 space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="border-b border-stone-100 pb-4 last:border-0">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
                {r.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{r.name}</span>
                  <span className="text-xs text-stone-400">{r.date}</span>
                </div>
                <div className="flex gap-0.5 py-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3 w-3 ${
                        s <= r.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-6 text-stone-600">{r.text}</p>
                <button
                  onClick={() => {
                    const nr = [...reviews];
                    nr[i] = { ...r, likes: r.likes + 1 };
                    onReview(nr[i]);
                    setHelpfulIdx(i);
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-stone-400 hover:text-amber-600"
                >
                  <Heart className="h-3 w-3" /> Helpful ({r.likes})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-base font-semibold text-zinc-900">
              Loved your meal? Help us grow
            </h3>
            <p className="mt-1 text-sm leading-5 text-stone-600">
              Your Google review helps locals discover authentic Italian in
              Tacloban. Takes 30 seconds.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <a
                href={RESTAURANT.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
              >
                <Star className="h-4 w-4 fill-white" /> Leave a Google Review
              </a>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-stone-50"
              >
                <Send className="h-4 w-4" /> Share your experience
              </button>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-stone-400">
              <span>Tap a star to start:</span>
              <span className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setForm({ ...form, rating: s });
                      setShowForm(true);
                    }}
                    className="p-0.5 hover:scale-110 transition"
                  >
                    <Star className="h-4 w-4 text-amber-300 hover:fill-amber-400 hover:text-amber-400" />
                  </button>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
