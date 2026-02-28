// src/features/anime/hooks/useSeasonalAnime.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { animeApi } from '@/api/anime';

export function useSeasonalAnime() {
  return useInfiniteQuery({
    queryKey: ['anime', 'seasonal'],
    queryFn: ({ pageParam }) => animeApi.getSeasonalAnime(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes — seasonal updates more frequently
  });
}
