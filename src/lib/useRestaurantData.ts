"use client";

import { useState, useCallback } from "react";
import type { MenuData, HoursData, RestaurantSettings } from "./types";
import { DEFAULT_MENU, DEFAULT_HOURS, DEFAULT_PHOTOS, DEFAULT_SETTINGS } from "./data";

const KEYS = {
  menu: "giuseppe_menu",
  hours: "giuseppe_hours",
  photos: "giuseppe_photos",
  settings: "giuseppe_settings",
} as const;

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function initMenu(): MenuData {
  return loadFromStorage(KEYS.menu, DEFAULT_MENU);
}

function initHours(): HoursData {
  return loadFromStorage(KEYS.hours, DEFAULT_HOURS);
}

function initPhotos(): string[] {
  const stored = loadFromStorage<string[]>(KEYS.photos, DEFAULT_PHOTOS);
  return Array.isArray(stored) && stored.length > 0 ? stored : DEFAULT_PHOTOS;
}

function initSettings(): RestaurantSettings {
  const stored = loadFromStorage<Partial<RestaurantSettings>>(KEYS.settings, {});
  return { ...DEFAULT_SETTINGS, ...stored };
}

export function useMenu() {
  const [menu, setMenuState] = useState<MenuData>(initMenu);

  const setMenu = useCallback((updater: MenuData | ((prev: MenuData) => MenuData)) => {
    setMenuState((prev) => {
      const next = typeof updater === "function" ? (updater as (prev: MenuData) => MenuData)(prev) : updater;
      saveToStorage(KEYS.menu, next);
      return next;
    });
  }, []);

  return { menu, setMenu };
}

export function useHours() {
  const [hours, setHoursState] = useState<HoursData>(initHours);

  const setHours = useCallback((updater: HoursData | ((prev: HoursData) => HoursData)) => {
    setHoursState((prev) => {
      const next = typeof updater === "function" ? (updater as (prev: HoursData) => HoursData)(prev) : updater;
      saveToStorage(KEYS.hours, next);
      return next;
    });
  }, []);

  return { hours, setHours };
}

export function usePhotos() {
  const [photos, setPhotosState] = useState<string[]>(initPhotos);

  const setPhotos = useCallback((updater: string[] | ((prev: string[]) => string[])) => {
    setPhotosState((prev) => {
      const next = typeof updater === "function" ? (updater as (prev: string[]) => string[])(prev) : updater;
      saveToStorage(KEYS.photos, next);
      return next;
    });
  }, []);

  return { photos, setPhotos };
}

export function useSettings() {
  const [settings, setSettingsState] = useState<RestaurantSettings>(initSettings);

  const setSettings = useCallback((updater: RestaurantSettings | ((prev: RestaurantSettings) => RestaurantSettings)) => {
    setSettingsState((prev) => {
      const next = typeof updater === "function" ? (updater as (prev: RestaurantSettings) => RestaurantSettings)(prev) : updater;
      saveToStorage(KEYS.settings, next);
      return next;
    });
  }, []);

  return { settings, setSettings };
}
