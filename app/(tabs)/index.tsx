// app/(tabs)/index.tsx
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTopAnime } from '@/features/anime/hooks/useTopAnime';
import { useSeasonalAnime } from '@/features/anime/hooks/useSeasonalAnime';
import { AnimeList } from '@/features/anime/components/AnimeList';

type Tab = 'top' | 'seasonal';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('top');
  const topAnimeQuery = useTopAnime();
  const seasonalAnimeQuery = useSeasonalAnime();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row gap-2 px-4 pb-2 pt-4">
        <TouchableOpacity
          className={`flex-1 items-center rounded-xl py-2 ${activeTab === 'top' ? 'bg-indigo-500' : 'border border-gray-200 bg-white'}`}
          onPress={() => setActiveTab('top')}>
          <Text className={activeTab === 'top' ? 'font-semibold text-white' : 'text-gray-600'}>
            Top Anime
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center rounded-xl py-2 ${activeTab === 'seasonal' ? 'bg-indigo-500' : 'border border-gray-200 bg-white'}`}
          onPress={() => setActiveTab('seasonal')}>
          <Text className={activeTab === 'seasonal' ? 'font-semibold text-white' : 'text-gray-600'}>
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
