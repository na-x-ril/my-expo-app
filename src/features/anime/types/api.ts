// src/features/anime/types/api.ts
import type { Anime } from './anime';
import type { Pagination } from './pagination';

export interface AnimeListResponse {
  data: Anime[];
  pagination: Pagination;
}

export interface AnimeDetailResponse {
  data: Anime;
}
