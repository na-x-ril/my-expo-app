// src/features/anime/hooks/usePopularAnime.ts
import { useQuery } from '@tanstack/react-query';
import { animeApi } from '@/api/anime';

export function usePopularAnime() {
  return useQuery({
    queryKey: ['anime', 'popular'],
    queryFn: () => animeApi.getPopularAnime(),
    staleTime: 1000 * 60 * 15,
  });
}
