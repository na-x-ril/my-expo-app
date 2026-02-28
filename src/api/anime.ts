// src/api/anime.ts
import { apiClient } from './client';
import type { AnimeListResponse, AnimeDetailResponse } from '@/features/anime/types';

export const animeApi = {
  getTopAnime: (page: number) => apiClient.request<AnimeListResponse>('/top/anime', { page }),

  getSeasonalAnime: (page: number) =>
    apiClient.request<AnimeListResponse>('/seasons/now', { page }),

  searchAnime: (query: string, page: number) =>
    apiClient.request<AnimeListResponse>('/anime', { q: query, page }),

  getAnimeDetail: (id: number) => apiClient.request<AnimeDetailResponse>(`/anime/${id}`),
};
