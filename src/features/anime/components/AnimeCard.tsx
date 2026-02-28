// src/features/anime/components/AnimeCard.tsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
  isFavorite: boolean;
  onToggleFavorite: (anime: Anime) => void;
}

export function AnimeCard({ anime, isFavorite, onToggleFavorite }: AnimeCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="mb-3 flex-row rounded-xl bg-white p-3 shadow-sm"
      onPress={() => router.push(`/anime/${anime.mal_id}`)}
      activeOpacity={0.8}>
      <Image
        source={{ uri: anime.images.jpg.image_url }}
        className="h-28 w-20 rounded-lg"
        resizeMode="cover"
      />
      <View className="ml-3 flex-1 justify-between py-1">
        <Text className="text-sm font-semibold leading-tight text-gray-900" numberOfLines={2}>
          {anime.title}
        </Text>
        <View className="mt-1 flex-row items-center">
          <Ionicons name="star" size={12} color="#f59e0b" />
          <Text className="ml-1 text-xs text-gray-600">{anime.score?.toFixed(1) ?? 'N/A'}</Text>
        </View>
        <Text className="mt-1 text-xs text-gray-500">
          {anime.type ?? 'Unknown'} · {anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}
        </Text>
        <Text className="mt-1 text-xs text-gray-400" numberOfLines={2}>
          {anime.synopsis ?? 'No synopsis available.'}
        </Text>
      </View>
      <TouchableOpacity
        className="self-start p-1"
        onPress={() => onToggleFavorite(anime)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? '#ef4444' : '#9ca3af'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
