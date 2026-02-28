// app/(tabs)/favorites.tsx
import { View, Text, FlatList } from 'react-native';
import { useFavorites } from '@/features/favorites/useFavorites';
import { AnimeCard } from '@/features/anime/components/AnimeCard';

export default function FavoritesScreen() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="mb-3 text-4xl">💔</Text>
        <Text className="text-base text-gray-500">No favorites yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => String(item.mal_id)}
      renderItem={({ item }) => (
        <AnimeCard
          anime={item}
          isFavorite={isFavorite(item.mal_id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
      contentContainerClassName="px-4 pt-4 pb-8"
      className="bg-gray-50"
    />
  );
}
