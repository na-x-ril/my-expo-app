// src/features/favorites/useFavorites.ts
import { useState, useEffect, useCallback } from 'react';
import { favoritesStorage } from '@/lib/storage';
import type { Anime } from '@/features/anime/types';

type Listener = (favorites: Anime[]) => void;

const listeners = new Set<Listener>();
let cachedFavorites: Anime[] = [];

function notify(updated: Anime[]) {
  cachedFavorites = updated;
  listeners.forEach((l) => l(updated));
}

async function loadFavorites() {
  const data = await favoritesStorage.readFavorites<Anime>();
  notify(data);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Anime[]>(cachedFavorites);
  const [isLoading, setIsLoading] = useState(cachedFavorites.length === 0);

  useEffect(() => {
    listeners.add(setFavorites);

    if (cachedFavorites.length === 0) {
      loadFavorites().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }

    return () => {
      listeners.delete(setFavorites);
    };
  }, []);

  const persist = useCallback(async (updated: Anime[]) => {
    await favoritesStorage.writeFavorites(updated);
    notify(updated);
  }, []);

  const addFavorite = useCallback(
    async (anime: Anime) => {
      const exists = cachedFavorites.some((a) => a.mal_id === anime.mal_id);
      if (!exists) await persist([...cachedFavorites, anime]);
    },
    [persist]
  );

  const removeFavorite = useCallback(
    async (malId: number) => {
      await persist(cachedFavorites.filter((a) => a.mal_id !== malId));
    },
    [persist]
  );

  const toggleFavorite = useCallback(
    async (anime: Anime) => {
      const exists = cachedFavorites.some((a) => a.mal_id === anime.mal_id);
      if (exists) {
        await persist(cachedFavorites.filter((a) => a.mal_id !== anime.mal_id));
      } else {
        await persist([...cachedFavorites, anime]);
      }
    },
    [persist]
  );

  const isFavorite = useCallback(
    (malId: number) => favorites.some((a) => a.mal_id === malId),
    [favorites]
  );

  return { favorites, isLoading, addFavorite, removeFavorite, toggleFavorite, isFavorite };
}
