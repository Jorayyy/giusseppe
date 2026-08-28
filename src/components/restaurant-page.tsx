"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import QrBanner from "@/components/qr-banner";
import About from "@/components/about";
import MenuSection from "@/components/menu-section";
import HoursCard from "@/components/hours-card";
import PopularTimes from "@/components/popular-times";
import ReviewsCard from "@/components/reviews-card";
import ContactCard from "@/components/contact-card";
import BookingWidget from "@/components/booking-widget";
import EventForm from "@/components/event-form";
import Roadmap from "@/components/roadmap";
import PhotoLightbox from "@/components/photo-lightbox";
import Toast from "@/components/toast";
import Footer from "@/components/footer";
import { PHOTOS, DEFAULT_REVIEWS, type Review, isOpen } from "@/lib/data";

export default function RestaurantPage() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [now, setNow] = useState(new Date());
  const [toast, setToast] = useState<string | null>(null);
  const [photos] = useState(PHOTOS);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const open = isOpen(now);
  const today = now.toLocaleDateString("en-US", { weekday: "long" });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleReview = (r: Review) => {
    setReviews([{ ...r, date: "Just now" }, ...reviews]);
    setShowGooglePrompt(true);
    showToast("Review posted — thank you!");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-zinc-900">
      <Navbar />
      <Hero photos={photos} photoIdx={photoIdx} setPhotoIdx={setPhotoIdx} open={open} onShowLightbox={() => setShowLightbox(true)} />
      <div className="mx-auto max-w-6xl px-4">
        <QrBanner />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <About />
            <MenuSection />
            <HoursCard open={open} today={today} />
            <PopularTimes />
            <ReviewsCard reviews={reviews} onReview={handleReview} showGooglePrompt={showGooglePrompt} />
          </div>

          <div className="space-y-6">
            <ContactCard open={open} />
            <BookingWidget onToast={showToast} />
            <EventForm onToast={showToast} />
          </div>
        </div>

        <Roadmap onToast={showToast} />
      </main>

      <Footer />

      {showLightbox && (
        <PhotoLightbox photos={photos} idx={photoIdx} setIdx={setPhotoIdx} onClose={() => setShowLightbox(false)} />
      )}
      <Toast message={toast} />
    </div>
  );
}
