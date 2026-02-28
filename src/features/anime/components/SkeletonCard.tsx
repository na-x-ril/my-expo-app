// src/features/anime/components/SkeletonCard.tsx
import { View } from 'react-native';

export function SkeletonCard() {
  return (
    <View className="mb-3 flex-row rounded-xl bg-white p-3 shadow-sm">
      <View className="h-28 w-20 animate-pulse rounded-lg bg-gray-200" />
      <View className="ml-3 flex-1 justify-between py-1">
        <View className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <View className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        <View className="mt-2 h-3 w-1/3 animate-pulse rounded bg-gray-200" />
        <View className="mt-2 h-3 w-2/3 animate-pulse rounded bg-gray-200" />
      </View>
    </View>
  );
}
