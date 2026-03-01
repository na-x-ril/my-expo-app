// app/(tabs)/index.tsx
import { useRef, useCallback } from 'react';
import { ScrollView, View, Text, RefreshControl } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { AnimeSection } from '@/features/anime/components/AnimeSection';
import { useTopAnime } from '@/features/anime/hooks/useTopAnime';
import { useSeasonalAnime } from '@/features/anime/hooks/useSeasonalAnime';
import { useUpcomingAnime } from '@/features/anime/hooks/useUpcomingAnime';
import { usePopularAnime } from '@/features/anime/hooks/usePopularAnime';
import type { Anime } from '@/features/anime/types';

function flattenPages(data: any): Anime[] {
  return data?.pages?.flatMap((p: any) => p.data) ?? [];
}

export default function HomeScreen() {
  const { isDark } = useTheme();
  const scrollRef = useRef(null);

  const topQuery = useTopAnime();
  const seasonalQuery = useSeasonalAnime();
  const upcomingQuery = useUpcomingAnime();
  const popularQuery = usePopularAnime();

  const topAnime = flattenPages(topQuery.data).slice(0, 10);
  const seasonalAnime = flattenPages(seasonalQuery.data).slice(0, 10);
  const upcomingAnime = flattenPages(upcomingQuery.data).slice(0, 10);
  const popularAnime = popularQuery.data?.data?.slice(0, 10) ?? [];

  const isRefreshing =
    topQuery.isRefetching ||
    seasonalQuery.isRefetching ||
    upcomingQuery.isRefetching ||
    popularQuery.isRefetching;

  const onRefresh = useCallback(() => {
    topQuery.refetch();
    seasonalQuery.refetch();
    upcomingQuery.refetch();
    popularQuery.refetch();
  }, [topQuery, seasonalQuery, upcomingQuery, popularQuery]);

  return (
    <ScrollView
      ref={scrollRef}
      className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor="#6366f1"
          colors={['#6366f1']}
        />
      }>
      {/* Page header */}
      <View className="px-4 pb-2 pt-2">
        <Text className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          Discover
        </Text>
        <Text className={`mt-0.5 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          {`What's on the anime world today`}
        </Text>
      </View>

      <AnimeSection
        title="Top Anime"
        subtitle="Highest rated of all time"
        data={topAnime}
        isLoading={topQuery.isLoading}
        accentColor="#6366f1"
      />

      <AnimeSection
        title="This Season"
        subtitle="Currently airing"
        data={seasonalAnime}
        isLoading={seasonalQuery.isLoading}
        accentColor="#10b981"
      />

      <AnimeSection
        title="Most Popular"
        subtitle="All-time favourite by members"
        data={popularAnime}
        isLoading={popularQuery.isLoading}
        accentColor="#f59e0b"
      />

      <AnimeSection
        title="Coming Soon"
        subtitle="Next season lineup"
        data={upcomingAnime}
        isLoading={upcomingQuery.isLoading}
        accentColor="#ec4899"
      />

      <View className="h-8" />
    </ScrollView>
  );
}
