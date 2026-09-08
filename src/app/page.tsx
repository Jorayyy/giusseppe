"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import { useMenu, useHours, usePhotos, useSettings } from "@/lib/useRestaurantData";
import { PageLoader } from "@/components/PageLoader";
import { NavBar } from "@/components/NavBar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MenuSection } from "@/components/MenuSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ActionBar, Sidebar, Footer, MobileCTABar, AboutSection, Toast } from "@/components/PageSections";
import { DishModal } from "@/components/DishModal";
import { SplitAbout } from "@/components/SplitAbout";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BackToTop } from "@/components/BackToTop";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Reveal } from "@/components/Reveal";

function useIsOpen() {
  const h = new Date().getHours();
  return (h >= 11 && h < 16) || (h >= 17 && h < 21.5);
}

export default function Home() {
  const { menu } = useMenu();
  const { hours } = useHours();
  const { photos } = usePhotos();
  const { settings } = useSettings();

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const isOpen = useIsOpen();
  const fallbackImg = photos[0] ?? "/photos/google/placejoys-1.jpg";

  const toast_ = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const share = async () => { await navigator.clipboard.writeText(window.location.href); setCopied(true); toast_("Link copied"); setTimeout(() => setCopied(false), 2000); };
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-white text-zinc-900">
        <NavBar settings={settings} onScroll={scroll} />
        <HeroCarousel photos={photos} settings={settings} isOpen={isOpen} onScroll={scroll} />
        <ActionBar settings={settings} saved={saved} copied={copied} onToggleSave={() => setSaved(!saved)} onShare={share} onShowFullMenu={() => {}} />

        <main className="mx-auto max-w-5xl px-4 pb-28">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-16 lg:col-span-2">
              <AboutSection />
              <SplitAbout />
              <MenuSection menu={menu} onSelectDish={setSelectedDish} />

              <Reveal>
                <section id="hours">
                  <p className="text-sm font-medium tracking-widest uppercase text-amber-600">Hours</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">When to visit</h2>
                  <div className="mt-6 divide-y divide-stone-100 text-sm">
                    {Object.entries(hours).map(([day, h]) => (
                      <div key={day} className={`flex justify-between py-3 ${day === new Date().toLocaleDateString("en-US", { weekday: "long" }) ? "font-semibold text-amber-700" : "text-stone-600"}`}>
                        <span>{day}</span>
                        <span className="tabular-nums">
                          {!h.open ? "Closed" : `${h.open} – ${h.close}${h.open2 && h.close2 ? `, ${h.open2} – ${h.close2}` : ""}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              <ReviewsSection settings={settings} />
            </div>
            <Sidebar settings={settings} isOpen={isOpen} />
          </div>
        </main>

        <PhotoGallery photos={photos} settings={settings} />
        <Footer settings={settings} />
        <MobileCTABar settings={settings} />
        <FloatingCTA phoneHref={settings.phoneHref} />
        <BackToTop />
        <DishModal dish={selectedDish} fallbackImg={fallbackImg} settings={settings} onClose={() => setSelectedDish(null)} />
        <Toast message={toast} />
      </div>
    </>
  );
}
