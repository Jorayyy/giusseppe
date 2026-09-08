"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import { useMenu, useHours, usePhotos, useSettings } from "@/lib/useRestaurantData";
import { NavBar } from "@/components/NavBar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MenuSection } from "@/components/MenuSection";
import { HoursSection } from "@/components/HoursSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ActionBar, Sidebar, Footer, MobileCTABar, AboutSection, Toast } from "@/components/PageSections";
import { DishModal } from "@/components/DishModal";

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
    <div className="min-h-screen bg-white text-zinc-900">
      <NavBar settings={settings} onScroll={scroll} />
      <HeroCarousel photos={photos} settings={settings} isOpen={isOpen} onScroll={scroll} />
      <ActionBar settings={settings} saved={saved} copied={copied} onToggleSave={() => setSaved(!saved)} onShare={share} onShowFullMenu={() => {}} />

      <main className="mx-auto max-w-5xl px-4 pb-28">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <AboutSection />
            <MenuSection menu={menu} onSelectDish={setSelectedDish} />
            <HoursSection hours={hours} isOpen={isOpen} />
            <ReviewsSection settings={settings} />
          </div>
          <Sidebar settings={settings} isOpen={isOpen} />
        </div>
      </main>

      <Footer settings={settings} />
      <MobileCTABar settings={settings} />
      <DishModal dish={selectedDish} fallbackImg={fallbackImg} settings={settings} onClose={() => setSelectedDish(null)} />
      <Toast message={toast} />
    </div>
  );
}
