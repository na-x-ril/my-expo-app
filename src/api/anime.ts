// src/api/anime.ts
import { apiClient } from './client';
import type { AnimeListResponse, AnimeDetailResponse } from '@/features/anime/types';
import type {
  AnimeCharactersResponse,
  AnimeStaffResponse,
  AnimeRecommendationsResponse,
} from '@/features/anime/types/detail';

export const animeApi = {
  getTopAnime: (page: number) => apiClient.request<AnimeListResponse>('/top/anime', { page }),

  getSeasonalAnime: (page: number) =>
    apiClient.request<AnimeListResponse>('/seasons/now', { page }),

  getUpcomingAnime: (page: number) =>
    apiClient.request<AnimeListResponse>('/seasons/upcoming', { page }),

  getPopularAnime: (page = 1) =>
    apiClient.request<AnimeListResponse>('/top/anime', { filter: 'bypopularity', page, limit: 10 }),

  searchAnime: (query: string, page: number) =>
    apiClient.request<AnimeListResponse>('/anime', { q: query, page }),

  getAnimeDetail: (id: number) => apiClient.request<AnimeDetailResponse>(`/anime/${id}`),

  getAnimeCharacters: (id: number) =>
    apiClient.request<AnimeCharactersResponse>(`/anime/${id}/characters`),

  getAnimeStaff: (id: number) => apiClient.request<AnimeStaffResponse>(`/anime/${id}/staff`),

  getAnimeRecommendations: (id: number) =>
    apiClient.request<AnimeRecommendationsResponse>(`/anime/${id}/recommendations`),
};
