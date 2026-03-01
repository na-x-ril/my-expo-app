// src/features/anime/components/skeletons/SliderSkeletonCard.tsx
import { memo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface SliderSkeletonCardProps {
  width: number;
  height: number;
}

export const SliderSkeletonCard = memo(function SliderSkeletonCard({
  width,
  height,
}: SliderSkeletonCardProps) {
  const { isDark } = useTheme();
  const shimmer = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const bg = isDark ? 'bg-gray-800' : 'bg-white';

  return (
    <View style={{ width }} className={`mr-3 overflow-hidden rounded-2xl ${bg}`}>
      <View style={{ width, height }} className={shimmer} />
      <View className="p-2">
        <View className={`h-3 w-4/5 rounded ${shimmer}`} />
        <View className={`mt-1.5 h-3 w-2/5 rounded ${shimmer}`} />
      </View>
    </View>
  );
});
