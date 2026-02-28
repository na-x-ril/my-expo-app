// src/features/anime/hooks/useTopAnime.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { animeApi } from '@/api/anime';

export function useTopAnime() {
  return useInfiniteQuery({
    queryKey: ['anime', 'top'],
    queryFn: ({ pageParam }) => animeApi.getTopAnime(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 10, // 10 minutes — top anime rarely changes
  });
}
