// src/features/anime/components/AnimeSliderCard.tsx
import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import type { Anime } from '../types';

const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

interface AnimeSliderCardProps {
  anime: Anime;
  width: number;
  height: number;
}

export const AnimeSliderCard = memo(function AnimeSliderCard({
  anime,
  width,
  height,
}: AnimeSliderCardProps) {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      style={{ width }}
      className={`mr-3 overflow-hidden rounded-2xl shadow-sm ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
      onPress={() => router.push(`/anime/${anime.mal_id}`)}
      activeOpacity={0.8}>
      <View className="relative">
        <Image
          source={{ uri: anime.images.jpg.large_image_url }}
          style={{ width, height }}
          contentFit="cover"
          placeholder={blurhash}
          cachePolicy="memory-disk"
          transition={200}
        />
        {anime.score !== null && (
          <View className="absolute bottom-2 left-2 flex-row items-center rounded-full bg-black/50 px-2 py-1">
            <Ionicons name="star" size={14} color="#f59e0b" />
            <Text className="ml-1 text-sm font-semibold text-white">{anime.score.toFixed(1)}</Text>
          </View>
        )}
        {anime.airing && (
          <View className="absolute right-2 top-2 rounded-full bg-green-500/90 px-2 py-0.5">
            <Text className="text-xs font-semibold text-white">Airing</Text>
          </View>
        )}
      </View>
      <View className="p-2">
        <Text
          className={`text-lg font-semibold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
          numberOfLines={2}>
          {anime.title}
        </Text>
        <Text className={`mt-0.5 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          {anime.type ?? 'Unknown'} · {anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
