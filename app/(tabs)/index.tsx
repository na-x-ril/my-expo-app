// app/(tabs)/index.tsx
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTopAnime } from '@/features/anime/hooks/useTopAnime';
import { useSeasonalAnime } from '@/features/anime/hooks/useSeasonalAnime';
import { AnimeList } from '@/features/anime/components/AnimeList';
import { useTheme } from '@/context/ThemeContext';

type Tab = 'top' | 'seasonal';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('top');
  const topAnimeQuery = useTopAnime();
  const seasonalAnimeQuery = useSeasonalAnime();
  const { isDark } = useTheme();

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className="mx-2 my-2 flex-row gap-4">
        <TouchableOpacity
          className={`flex-1 items-center rounded-xl py-2 ${
            activeTab === 'top'
              ? 'bg-indigo-500'
              : isDark
                ? 'border border-gray-700 bg-gray-800'
                : 'border border-gray-200 bg-white'
          }`}
          onPress={() => setActiveTab('top')}>
          <Text
            className={
              activeTab === 'top'
                ? 'text-md font-semibold text-white'
                : isDark
                  ? 'text-gray-300'
                  : 'text-gray-600'
            }>
            Top Anime
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 items-center rounded-xl py-2 ${
            activeTab === 'seasonal'
              ? 'bg-indigo-500'
              : isDark
                ? 'border border-gray-700 bg-gray-800'
                : 'border border-gray-200 bg-white'
          }`}
          onPress={() => setActiveTab('seasonal')}>
          <Text
            className={
              activeTab === 'seasonal'
                ? 'text-md font-semibold text-white'
                : isDark
                  ? 'text-gray-300'
                  : 'text-gray-600'
            }>
            Seasonal
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'top' ? (
        <AnimeList query={topAnimeQuery} />
      ) : (
        <AnimeList query={seasonalAnimeQuery} />
      )}
    </View>
  );
}
