// src/features/anime/utils/filterAnime.ts
import type { Anime } from '../types';
import type { AnimeFilters } from '../types/filter';

export function filterAndSortAnime(list: Anime[], filters: AnimeFilters): Anime[] {
  let result = [...list];

  if (filters.type !== 'All') {
    result = result.filter((a) => a.type === filters.type);
  }

  if (filters.status !== 'All') {
    const airing = filters.status === 'Airing';
    result = result.filter((a) => a.airing === airing);
  }

  result.sort((a, b) => {
    let diff = 0;

    if (filters.sortKey === 'score') {
      diff = (a.score ?? 0) - (b.score ?? 0);
    } else if (filters.sortKey === 'title') {
      diff = a.title.localeCompare(b.title);
    } else if (filters.sortKey === 'episodes') {
      diff = (a.episodes ?? 0) - (b.episodes ?? 0);
    }

    return filters.sortOrder === 'asc' ? diff : -diff;
  });

  return result;
}
