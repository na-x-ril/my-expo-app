// src/features/anime/components/skeletons/SearchSkeletonCard.tsx
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export function SearchSkeletonCard() {
  const { isDark } = useTheme();
  const shimmer = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const bg = isDark ? 'bg-gray-800' : 'bg-white';

  return (
    <View className={`mb-3 flex-row rounded-xl p-3 ${bg}`}>
      <View className={`h-20 w-14 rounded-lg ${shimmer}`} />
      <View className="ml-3 flex-1 justify-between py-1">
        <View className={`h-3 w-4/5 rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-2/5 rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-3/5 rounded ${shimmer}`} />
      </View>
    </View>
  );
}
