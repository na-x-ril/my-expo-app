// src/features/anime/utils/filterAnime.ts
import type { Anime, AnimeFilters } from '../types';

export function filterAndSortAnime(list: Anime[], filters: AnimeFilters): Anime[] {
  let result = [...list];

  if (filters.type !== 'All') {
    result = result.filter((a) => a.type === filters.type);
  }

  if (filters.status !== 'All') {
    result = result.filter((a) => {
      if (filters.status === 'Airing') return a.airing === true;
      if (filters.status === 'Finished') return a.airing === false;
      return true;
    });
  }

  result.sort((a, b) => {
    let valA: number | string;
    let valB: number | string;

    switch (filters.sortKey) {
      case 'score':
        valA = a.score ?? -1;
        valB = b.score ?? -1;
        break;
      case 'title':
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
        break;
      case 'episodes':
        valA = a.episodes ?? -1;
        valB = b.episodes ?? -1;
        break;
      case 'addedAt':
        valA = (a as Anime & { addedAt?: number }).addedAt ?? 0;
        valB = (b as Anime & { addedAt?: number }).addedAt ?? 0;
        break;
      default:
        return 0;
    }

    if (valA < valB) return filters.sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return filters.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}
