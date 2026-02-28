// app/(tabs)/search.tsx
import { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSearchAnime } from '@/features/anime/hooks/useSearchAnime';
import { AnimeList } from '@/features/anime/components/AnimeList';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const searchQuery = useSearchAnime(query);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="mx-4 mb-2 mt-4 flex-row items-center rounded-xl border border-gray-200 bg-white px-4 py-3">
        <Ionicons name="search" size={18} color="#9ca3af" />
        <TextInput
          className="ml-2 flex-1 text-sm text-gray-900"
          placeholder="Search anime..."
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
      {query.trim().length > 2 && <AnimeList query={searchQuery} />}
    </View>
  );
}
