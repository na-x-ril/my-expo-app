// src/features/favorites/storage.ts
import { storage } from '@/lib/mmkv';
import type { Anime } from '@/features/anime/types';

const FAVORITES_KEY = 'favorites';

function readFavorites(): Anime[] {
  const raw = storage.getString(FAVORITES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Anime[];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: Anime[]): void {
  storage.set(FAVORITES_KEY, JSON.stringify(favorites));
}

export const favoritesStorage = {
  getAll: readFavorites,

  add: (anime: Anime): void => {
    const current = readFavorites();
    const exists = current.some((a) => a.mal_id === anime.mal_id);
    if (!exists) {
      writeFavorites([...current, anime]);
    }
  },

  remove: (malId: number): void => {
    const current = readFavorites();
    writeFavorites(current.filter((a) => a.mal_id !== malId));
  },

  isFavorite: (malId: number): boolean => {
    return readFavorites().some((a) => a.mal_id === malId);
  },
};
