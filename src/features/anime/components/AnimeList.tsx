// src/features/anime/components/AnimeList.tsx
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AnimeCard } from './AnimeCard';
import { SkeletonCard } from './SkeletonCard';
import { useFavorites } from '@/features/favorites/useFavorites';
import type { AnimeListResponse, Anime } from '../types';

interface AnimeListProps {
  query: UseInfiniteQueryResult<InfiniteData<AnimeListResponse>, Error>;
}

function extractAnimeList(data: InfiniteData<AnimeListResponse> | undefined): Anime[] {
  return data?.pages.flatMap((page) => page.data) ?? [];
}

export function AnimeList({ query }: AnimeListProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    query;

  if (isLoading) {
    return (
      <View className="flex-1 px-4 pt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-base text-gray-500">Failed to load anime.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={extractAnimeList(data)}
      keyExtractor={(item) => String(item.mal_id)}
      renderItem={({ item }) => (
        <AnimeCard
          anime={item}
          isFavorite={isFavorite(item.mal_id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
      contentContainerClassName="px-4 pt-4 pb-8"
      onRefresh={refetch}
      refreshing={false}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator className="py-4" color="#6366f1" /> : null
      }
    />
  );
}
