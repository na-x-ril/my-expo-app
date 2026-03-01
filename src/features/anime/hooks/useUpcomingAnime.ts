// src/features/anime/hooks/useUpcomingAnime.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { animeApi } from '@/api/anime';

export function useUpcomingAnime() {
  return useInfiniteQuery({
    queryKey: ['anime', 'upcoming'],
    queryFn: ({ pageParam }) => animeApi.getUpcomingAnime(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
    staleTime: 1000 * 60 * 10,
  });
}
