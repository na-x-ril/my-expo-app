// src/features/favorites/useFavorites.ts
import { useState, useCallback } from 'react';
import { favoritesStorage } from './storage';
import type { Anime } from '@/features/anime/types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Anime[]>(() => favoritesStorage.getAll());

  const addFavorite = useCallback((anime: Anime) => {
    favoritesStorage.add(anime);
    setFavorites(favoritesStorage.getAll());
  }, []);

  const removeFavorite = useCallback((malId: number) => {
    favoritesStorage.remove(malId);
    setFavorites(favoritesStorage.getAll());
  }, []);

  const toggleFavorite = useCallback((anime: Anime) => {
    if (favoritesStorage.isFavorite(anime.mal_id)) {
      favoritesStorage.remove(anime.mal_id);
    } else {
      favoritesStorage.add(anime);
    }
    setFavorites(favoritesStorage.getAll());
  }, []);

  const isFavorite = useCallback(
    (malId: number) => favorites.some((a) => a.mal_id === malId),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite };
}
