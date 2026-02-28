// src/features/anime/hooks/useSearchAnime.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { animeApi } from '@/api/anime';

export function useSearchAnime(query: string) {
  return useInfiniteQuery({
    queryKey: ['anime', 'search', query],
    queryFn: ({ pageParam }) => animeApi.searchAnime(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined,
    enabled: query.trim().length > 2,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
