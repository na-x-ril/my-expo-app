// app/(tabs)/search.tsx
import { useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSearchAnime } from '@/features/anime/hooks/useSearchAnime';
import { AnimeCard } from '@/features/anime/components/AnimeCard';
import { GridSkeletonCard } from '@/features/anime/components/skeletons/GridSkeletonCard';
import { FilterSheet } from '@/features/anime/components/FilterSheet';
import { FilterButton } from '@/features/anime/components/FilterButton';
import { useAnimeFilters } from '@/features/anime/hooks/useAnimeFilters';
import { BackToTopButton } from '@/components/BackToTopButton';
import { useTheme } from '@/context/ThemeContext';
import type { Anime, AnimeListResponse } from '@/features/anime/types';
import type { InfiniteData } from '@tanstack/react-query';

type ListItem = Anime | { mal_id: number };

function extractAnimeList(data: InfiniteData<AnimeListResponse> | undefined): Anime[] {
  return data?.pages.flatMap((page) => page.data) ?? [];
}

const SKELETON_DATA: ListItem[] = Array.from({ length: 6 }, (_, i) => ({ mal_id: -(i + 1) }));
const SCROLL_THRESHOLD = 300;

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useSearchAnime(query);
  const { isDark } = useTheme();
  const listRef = useRef<FlatList>(null);

  const rawList = extractAnimeList(data);
  const { filters, setFilters, filtered, sheetVisible, openSheet, closeSheet } =
    useAnimeFilters(rawList);

  const showList = query.trim().length > 2;
  const listData: ListItem[] = isLoading ? SKELETON_DATA : filtered;

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (isLoading) return <GridSkeletonCard />;
      const anime = item as Anime;
      return <AnimeCard anime={anime} />;
    },
    [isLoading]
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const keyExtractor = useCallback((item: ListItem) => String(item.mal_id), []);

  const handleScroll = useCallback((event: { nativeEvent: { contentOffset: { y: number } } }) => {
    setShowBackToTop(event.nativeEvent.contentOffset.y > SCROLL_THRESHOLD);
  }, []);

  const handleBackToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <View
        className={`mx-4 my-2 flex-row items-center rounded-full border px-4 ${
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
        <Ionicons name="search" size={24} color={isDark ? '#6b7280' : '#9ca3af'} />
        <TextInput
          className={`ml-2 flex-1 text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
          placeholder="Search anime..."
          placeholderTextColor={isDark ? '#4b5563' : '#9ca3af'}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={24} color={isDark ? '#6b7280' : '#9ca3af'} />
          </TouchableOpacity>
        )}
      </View>

      {showList && (
        <>
          <FlatList
            ref={listRef}
            key="search-grid"
            data={listData}
            keyExtractor={keyExtractor}
            numColumns={2}
            columnWrapperClassName="justify-between"
            renderItem={renderItem}
            contentContainerClassName={`px-4 pb-8 ${isError ? 'flex-1' : ''}`}
            onRefresh={refetch}
            refreshing={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.4}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            extraData={filters}
            removeClippedSubviews
            maxToRenderPerBatch={6}
            windowSize={5}
            initialNumToRender={6}
            ListHeaderComponent={
              !isLoading ? (
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className={`text-md flex-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {filtered.length} results
                  </Text>
                  <FilterButton filters={filters} onPress={openSheet} />
                </View>
              ) : (
                <View className="mt-2" />
              )
            }
            ListEmptyComponent={
              isError ? (
                <View className="flex-1 items-center justify-center">
                  <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Search failed. Try again.
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
          <BackToTopButton visible={showBackToTop} onPress={handleBackToTop} />
        </>
      )}
    </View>
  );
}
