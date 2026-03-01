// src/features/anime/hooks/useAnimeExtras.ts
import { useQuery } from '@tanstack/react-query';
import { animeApi } from '@/api/anime';

export function useAnimeCharacters(id: number) {
  return useQuery({
    queryKey: ['anime', 'characters', id],
    queryFn: () => animeApi.getAnimeCharacters(id),
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: id > 0,
  });
}

export function useAnimeStaff(id: number) {
  return useQuery({
    queryKey: ['anime', 'staff', id],
    queryFn: () => animeApi.getAnimeStaff(id),
    staleTime: 1000 * 60 * 60,
    enabled: id > 0,
  });
}

export function useAnimeRecommendations(id: number) {
  return useQuery({
    queryKey: ['anime', 'recommendations', id],
    queryFn: () => animeApi.getAnimeRecommendations(id),
    staleTime: 1000 * 60 * 30,
    enabled: id > 0,
  });
}
