// src/features/anime/hooks/useAnimeDetail.ts
import { useQuery } from '@tanstack/react-query';
import { animeApi } from '@/api/anime';

export function useAnimeDetail(id: number) {
  return useQuery({
    queryKey: ['anime', 'detail', id],
    queryFn: () => animeApi.getAnimeDetail(id),
    staleTime: 1000 * 60 * 30, // 30 minutes — detail data is very stable
    enabled: id > 0,
  });
}
