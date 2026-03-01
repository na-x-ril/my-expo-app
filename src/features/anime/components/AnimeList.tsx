// src/features/anime/components/AnimeList.tsx
import { useCallback, useRef } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AnimeCard } from './AnimeCard';
import { GridSkeletonCard } from './skeletons/GridSkeletonCard';
import { FilterSheet } from './FilterSheet';
import { FilterButton } from './FilterButton';
import { useFavorites } from '@/features/favorites/useFavorites';
import { useTheme } from '@/context/ThemeContext';
import { useAnimeFilters } from '../hooks/useAnimeFilters';
import type { AnimeListResponse, Anime } from '../types';

interface AnimeListProps {
  query: UseInfiniteQueryResult<InfiniteData<AnimeListResponse>, Error>;
  listRef?: React.RefObject<FlatList | null>;
  onScroll?: (event: { nativeEvent: { contentOffset: { y: number } } }) => void;
}

type ListItem = Anime | { mal_id: number };

function extractAnimeList(data: InfiniteData<AnimeListResponse> | undefined): Anime[] {
  return data?.pages.flatMap((page) => page.data) ?? [];
}

const SKELETON_DATA: ListItem[] = Array.from({ length: 6 }, (_, i) => ({ mal_id: -(i + 1) }));

export function AnimeList({ query, listRef, onScroll }: AnimeListProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDark } = useTheme();
  const internalRef = useRef<FlatList | null>(null);
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    query;

  const rawList = extractAnimeList(data);
  const { filters, setFilters, filtered, sheetVisible, openSheet, closeSheet } =
    useAnimeFilters(rawList);

  const listData: ListItem[] = isLoading ? SKELETON_DATA : filtered;

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (isLoading) return <GridSkeletonCard />;
      const anime = item as Anime;
      return (
        <AnimeCard
          anime={anime}
          isFavorite={isFavorite(anime.mal_id)}
          onToggleFavorite={toggleFavorite}
        />
      );
    },
    [isLoading, isFavorite, toggleFavorite]
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const keyExtractor = useCallback((item: ListItem) => String(item.mal_id), []);

  return (
    <>
      <FlatList
        ref={listRef ?? internalRef}
        key="anime-grid"
        data={listData}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperClassName="justify-between"
        renderItem={renderItem}
        contentContainerClassName={`px-4 pb-8 ${isError ? 'flex-1' : ''}`}
        className={isDark ? 'bg-gray-900' : 'bg-gray-50'}
        onRefresh={refetch}
        refreshing={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        onScroll={onScroll}
        scrollEventThrottle={16}
        extraData={filters}
        removeClippedSubviews
        maxToRenderPerBatch={6}
        windowSize={5}
        initialNumToRender={6}
        ListHeaderComponent={
          !isLoading ? (
            <View className="mb-2 flex-row items-center justify-between">
              <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {filtered.length} results
              </Text>
              <FilterButton filters={filters} onPress={openSheet} />
            </View>
          ) : (
            <View className="mt-4" />
          )
        }
        ListEmptyComponent={
          isError ? (
            <View className="flex-1 items-center justify-center">
              <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Failed to load anime.
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator className="py-4" color="#6366f1" /> : null
        }
      />
      <FilterSheet
        visible={sheetVisible}
        filters={filters}
        onChange={setFilters}
        onClose={closeSheet}
      />
    </>
  );
}
