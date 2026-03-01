// src/features/anime/components/AnimeSection.tsx
import { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { AnimeSliderCard } from './AnimeSliderCard';
import { SliderSkeletonCard } from './skeletons/SliderSkeletonCard';
import type { Anime } from '../types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.38;
const CARD_HEIGHT = CARD_WIDTH * 1.45;

interface AnimeSectionProps {
  title: string;
  subtitle?: string;
  data: Anime[];
  isLoading?: boolean;
  seeAllRoute?: string;
  accentColor?: string;
}

const SKELETON_DATA = Array.from({ length: 5 }, (_, i) => ({ mal_id: -(i + 1) }));

export function AnimeSection({
  title,
  subtitle,
  data,
  isLoading = false,
  seeAllRoute,
  accentColor = '#6366f1',
}: AnimeSectionProps) {
  const { isDark } = useTheme();
  const router = useRouter();

  const renderItem = useCallback(
    ({ item }: { item: Anime | { mal_id: number } }) => {
      if (isLoading) {
        return <SliderSkeletonCard width={CARD_WIDTH} height={CARD_HEIGHT} />;
      }
      return <AnimeSliderCard anime={item as Anime} width={CARD_WIDTH} height={CARD_HEIGHT} />;
    },
    [isLoading]
  );

  const keyExtractor = useCallback((item: Anime | { mal_id: number }) => String(item.mal_id), []);

  const listData = isLoading ? SKELETON_DATA : data;

  return (
    <View className="mb-4">
      {/* Section header */}
      <View className="mb-2 flex-row items-center justify-between px-4">
        <View>
          <View className="flex-row items-center gap-2">
            <View style={{ backgroundColor: accentColor }} className="h-5 w-1 rounded-full" />
            <Text className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              {title}
            </Text>
          </View>
          {subtitle ? (
            <Text className={`ml-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {seeAllRoute ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => router.push(seeAllRoute as any)}
            className="flex-row items-center gap-0.5">
            <Text style={{ color: accentColor }} className="text-sm font-medium">
              See all
            </Text>
            <Ionicons name="chevron-forward" size={16} color={accentColor} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Horizontal list */}
      <FlatList
        data={listData as any}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        windowSize={3}
        removeClippedSubviews
      />
    </View>
  );
}
