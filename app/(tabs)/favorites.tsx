// app/(tabs)/favorites.tsx
import { useCallback, useRef, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFavorites } from '@/features/favorites/useFavorites';
import { AnimeCard } from '@/features/anime/components/AnimeCard';
import { FilterSheet } from '@/features/anime/components/FilterSheet';
import { FilterButton } from '@/features/anime/components/FilterButton';
import { useAnimeFilters } from '@/features/anime/hooks/useAnimeFilters';
import { BackToTopButton } from '@/components/BackToTopButton';
import { useTheme } from '@/context/ThemeContext';
import type { Anime } from '@/features/anime/types';

const SCROLL_THRESHOLD = 300;

export default function FavoritesScreen() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { isDark } = useTheme();
  const { filters, setFilters, filtered, sheetVisible, openSheet, closeSheet } =
    useAnimeFilters(favorites);

  const listRef = useRef<FlatList>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const renderItem = useCallback(
    ({ item }: { item: Anime }) => (
      <AnimeCard
        anime={item}
        isFavorite={isFavorite(item.mal_id)}
        onToggleFavorite={toggleFavorite}
      />
    ),
    [isFavorite, toggleFavorite]
  );

  const keyExtractor = useCallback((item: Anime) => String(item.mal_id), []);

  const handleScroll = useCallback((event: { nativeEvent: { contentOffset: { y: number } } }) => {
    setShowBackToTop(event.nativeEvent.contentOffset.y > SCROLL_THRESHOLD);
  }, []);

  const handleBackToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  if (favorites.length === 0) {
    return (
      <View
        className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className="mb-3 text-4xl">💔</Text>
        <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          No favorites yet.
        </Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        ref={listRef}
        key="favorites-grid"
        data={filtered}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperClassName="justify-between"
        renderItem={renderItem}
        contentContainerClassName="px-4 pb-8"
        className={isDark ? 'bg-gray-900' : 'bg-gray-50'}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        removeClippedSubviews
        maxToRenderPerBatch={6}
        windowSize={5}
        initialNumToRender={6}
        ListHeaderComponent={
          <View className="my-2 flex-row items-center justify-between">
            <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {filtered.length} of {favorites.length}
            </Text>
            <FilterButton filters={filters} onPress={openSheet} />
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No results match your filter.
            </Text>
          </View>
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
  );
}
