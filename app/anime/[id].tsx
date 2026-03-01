// app/anime/[id].tsx
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAnimeDetail } from '@/features/anime/hooks/useAnimeDetail';
import { useFavorites } from '@/features/favorites/useFavorites';
import { DetailSkeleton } from '@/features/anime/components/skeletons/DetailSkeleton';
import { useTheme } from '@/context/ThemeContext';

const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const malId = Number(id);
  const { data, isLoading, isError } = useAnimeDetail(malId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDark } = useTheme();

  if (isLoading) return <DetailSkeleton />;

  if (isError || !data) {
    return (
      <View
        className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          Failed to load anime detail.
        </Text>
      </View>
    );
  }

  const anime = data.data;
  const favorited = isFavorite(anime.mal_id);

  return (
    <ScrollView
      className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      contentContainerClassName="pb-10">
      <Image
        source={{ uri: anime.images.jpg.large_image_url }}
        style={{ width: '100%', height: 288 }}
        contentFit="cover"
        placeholder={blurhash}
        cachePolicy="memory-disk"
        transition={200}
      />
      <View className="px-4 pt-4">
        <View className="flex-row items-start justify-between">
          <Text
            className={`flex-1 pr-3 text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            {anime.title}
          </Text>
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
            <View
              key={g.mal_id}
              className={`rounded-full px-3 py-1 ${isDark ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
              <Text
                className={`text-xs font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
                {g.name}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-4 flex-row gap-4">
          {[
            { label: 'Score', value: anime.score?.toFixed(1) ?? 'N/A' },
            { label: 'Episodes', value: String(anime.episodes ?? '?') },
            { label: 'Status', value: anime.status ?? 'Unknown' },
            { label: 'Rank', value: `#${anime.rank ?? 'N/A'}` },
          ].map(({ label, value }) => (
            <View key={label} className="items-center">
              <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {label}
              </Text>
              <Text className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {value}
              </Text>
            </View>
          ))}
        </View>

        <Text
          className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {anime.synopsis ?? 'No synopsis available.'}
        </Text>
      </View>
    </ScrollView>
  );
}
