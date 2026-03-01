// src/features/anime/components/AnimeCard.tsx
import { memo } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import type { Anime } from '../types';

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;

const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

interface AnimeCardProps {
  anime: Anime;
  isFavorite: boolean;
  onToggleFavorite: (anime: Anime) => void;
}

export const AnimeCard = memo(function AnimeCard({
  anime,
  isFavorite,
  onToggleFavorite,
}: AnimeCardProps) {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      style={{ width: CARD_WIDTH }}
      className={`mb-4 overflow-hidden rounded-2xl shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}
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
        <TouchableOpacity
          className="absolute right-2 top-2 rounded-full bg-black/30 p-1.5"
          onPress={() => onToggleFavorite(anime)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={16}
            color={isFavorite ? '#ef4444' : '#ffffff'}
          />
        </TouchableOpacity>
        {anime.score !== null && (
          <View className="absolute bottom-2 left-2 flex-row items-center rounded-full bg-black/50 px-2 py-0.5">
            <Ionicons name="star" size={10} color="#f59e0b" />
            <Text className="ml-1 text-xs font-semibold text-white">{anime.score.toFixed(1)}</Text>
          </View>
        )}
      </View>
      <View className="p-2">
        <Text
          className={`text-xs font-semibold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
          numberOfLines={2}>
          {anime.title}
        </Text>
        <Text className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {anime.type ?? 'Unknown'} · {anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
