// src/features/anime/components/skeletons/GridSkeletonCard.tsx
import { memo } from 'react';
import { View, Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;

export const GridSkeletonCard = memo(function GridSkeletonCard() {
  const { isDark } = useTheme();
  const shimmer = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const bg = isDark ? 'bg-gray-800' : 'bg-white';

  return (
    <View style={{ width: CARD_WIDTH }} className={`mb-4 overflow-hidden rounded-2xl ${bg}`}>
      <View style={{ width: CARD_WIDTH, height: CARD_WIDTH * 1.4 }} className={shimmer} />
      <View className="p-2">
        <View className={`h-3 w-4/5 rounded ${shimmer}`} />
        <View className={`mt-1.5 h-3 w-2/5 rounded ${shimmer}`} />
      </View>
    </View>
  );
});
