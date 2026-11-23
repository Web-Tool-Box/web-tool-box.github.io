'use client';

const RECENT_TOOLS_KEY = 'wtb_recent_tools';
const FAVORITES_KEY = 'wtb_favorite_tools';
const MAX_RECENTS = 8;

export function getRecentTools(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(RECENT_TOOLS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addRecentTool(slug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getRecentTools().filter((s) => s !== slug);
    current.unshift(slug);
    localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(current.slice(0, MAX_RECENTS)));
  } catch {
    // ignore
  }
}

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getFavorites();
    const index = current.indexOf(slug);
    let updated: string[];
    let isFav = false;
    if (index >= 0) {
      updated = current.filter((s) => s !== slug);
      isFav = false;
    } else {
      updated = [...current, slug];
      isFav = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return isFav;
  } catch {
    return false;
  }
}

export function isFavorite(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getFavorites();
    return current.includes(slug);
  } catch {
    return false;
  }
}
