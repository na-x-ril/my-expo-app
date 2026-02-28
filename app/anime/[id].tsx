// app/anime/[id].tsx
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAnimeDetail } from '@/features/anime/hooks/useAnimeDetail';
import { useFavorites } from '@/features/favorites/useFavorites';
import { SkeletonCard } from '@/features/anime/components/SkeletonCard';

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const malId = Number(id);
  const { data, isLoading, isError } = useAnimeDetail(malId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-500">Failed to load anime detail.</Text>
      </View>
    );
  }

  const anime = data.data;
  const favorited = isFavorite(anime.mal_id);

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerClassName="pb-10">
      <Image
        source={{ uri: anime.images.jpg.large_image_url }}
        className="h-72 w-full"
        resizeMode="cover"
      />
      <View className="px-4 pt-4">
        <View className="flex-row items-start justify-between">
          <Text className="flex-1 pr-3 text-xl font-bold text-gray-900">{anime.title}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(anime)}>
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={26}
              color={favorited ? '#ef4444' : '#9ca3af'}
            />
          </TouchableOpacity>
        </View>

        <View className="mt-3 flex-row flex-wrap gap-2">
          {anime.genres.map((g) => (
            <View key={g.mal_id} className="rounded-full bg-indigo-100 px-3 py-1">
              <Text className="text-xs font-medium text-indigo-600">{g.name}</Text>
            </View>
          ))}
        </View>

        <View className="mt-4 flex-row gap-4">
          <View className="items-center">
            <Text className="text-xs text-gray-400">Score</Text>
            <Text className="font-bold text-gray-800">{anime.score?.toFixed(1) ?? 'N/A'}</Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-gray-400">Episodes</Text>
            <Text className="font-bold text-gray-800">{anime.episodes ?? '?'}</Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-gray-400">Status</Text>
            <Text className="font-bold text-gray-800">{anime.status ?? 'Unknown'}</Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-gray-400">Rank</Text>
            <Text className="font-bold text-gray-800">#{anime.rank ?? 'N/A'}</Text>
          </View>
        </View>

        <Text className="mt-4 text-sm leading-relaxed text-gray-700">
          {anime.synopsis ?? 'No synopsis available.'}
        </Text>
      </View>
    </ScrollView>
  );
}
