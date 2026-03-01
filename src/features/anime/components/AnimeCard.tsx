// src/features/anime/components/AnimeCard.tsx
import { memo } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import type { Anime } from '../types';

const CARD_WIDTH = (Dimensions.get('window').width - 50) / 2;

const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = memo(function AnimeCard({ anime }: AnimeCardProps) {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      style={{ width: CARD_WIDTH }}
      className={`mb-2 overflow-hidden rounded-2xl shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      onPress={() => router.push(`/anime/${anime.mal_id}`)}
      activeOpacity={0.8}>
      <View className="relative">
        <Image
          source={{ uri: anime.images.jpg.large_image_url }}
          style={{ width: CARD_WIDTH, height: CARD_WIDTH * 1.4 }}
          contentFit="cover"
          placeholder={blurhash}
          cachePolicy="memory-disk"
          transition={200}
        />
        {anime.score !== null && (
          <View className="absolute bottom-2 left-2 flex-row items-center rounded-full bg-black/50 px-2 py-1">
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text className="text-md ml-1 font-semibold text-white">{anime.score.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <View className="p-2">
        <Text
          className={`text-lg font-semibold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
          numberOfLines={2}>
          {anime.title}
        </Text>
        <Text className={`mt-1 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {anime.type ?? 'Unknown'} · {anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
