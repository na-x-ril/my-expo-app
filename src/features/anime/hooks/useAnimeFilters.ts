// src/features/anime/hooks/useAnimeFilters.ts
import { useState, useCallback, useMemo } from 'react';
import { DEFAULT_FILTERS } from '../types/filter';
import { filterAndSortAnime } from '../utils/filterAnime';
import type { AnimeFilters } from '../types/filter';
import type { Anime } from '../types';

export function useAnimeFilters(list: Anime[]) {
  const [filters, setFilters] = useState<AnimeFilters>(DEFAULT_FILTERS);
  const [sheetVisible, setSheetVisible] = useState(false);

  const filtered = useMemo(() => filterAndSortAnime(list, filters), [list, filters]);

  const openSheet = useCallback(() => setSheetVisible(true), []);
  const closeSheet = useCallback(() => setSheetVisible(false), []);

  return { filters, setFilters, filtered, sheetVisible, openSheet, closeSheet };
}
