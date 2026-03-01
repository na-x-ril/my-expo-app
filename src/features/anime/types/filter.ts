// src/features/anime/types/filter.ts
export type SortKey = 'score' | 'title' | 'episodes' | 'addedAt';
export type SortOrder = 'asc' | 'desc';
export type AnimeTypeFilter = 'All' | 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA';
export type AnimeStatusFilter = 'All' | 'Airing' | 'Finished';

export interface AnimeFilters {
  sortKey: SortKey;
  sortOrder: SortOrder;
  type: AnimeTypeFilter;
  status: AnimeStatusFilter;
}

export const DEFAULT_FILTERS: AnimeFilters = {
  sortKey: 'score',
  sortOrder: 'desc',
  type: 'All',
  status: 'All',
};
