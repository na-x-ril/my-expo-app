// src/features/favorites/useFavorites.ts
import { useState, useEffect, useCallback } from 'react';
import { favoritesStorage } from '@/lib/storage';
import type { Anime } from '@/features/anime/types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Anime[]>([]);

  useEffect(() => {
    favoritesStorage.readFavorites<Anime>().then(setFavorites);
  }, []);

  const persist = useCallback(async (updated: Anime[]) => {
    await favoritesStorage.writeFavorites(updated);
    setFavorites(updated);
  }, []);

  const addFavorite = useCallback(
    async (anime: Anime) => {
      const current = await favoritesStorage.readFavorites<Anime>();
      const exists = current.some((a) => a.mal_id === anime.mal_id);
      if (!exists) await persist([...current, anime]);
    },
    [persist]
  );

  const removeFavorite = useCallback(
    async (malId: number) => {
      const current = await favoritesStorage.readFavorites<Anime>();
      await persist(current.filter((a) => a.mal_id !== malId));
    },
    [persist]
  );

  const toggleFavorite = useCallback(
    async (anime: Anime) => {
      const current = await favoritesStorage.readFavorites<Anime>();
      const exists = current.some((a) => a.mal_id === anime.mal_id);
      if (exists) {
        await persist(current.filter((a) => a.mal_id !== anime.mal_id));
      } else {
        await persist([...current, anime]);
      }
    },
    [persist]
  );

  const isFavorite = useCallback(
    (malId: number) => favorites.some((a) => a.mal_id === malId),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
}
