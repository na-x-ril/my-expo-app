// src/features/anime/components/skeletons/FavoritesSkeleton.tsx
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export function FavoritesSkeleton() {
  const { isDark } = useTheme();
  const shimmer = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const bg = isDark ? 'bg-gray-800' : 'bg-white';

  return (
    <View className={`mb-3 flex-row rounded-xl p-3 ${bg}`}>
      <View className={`h-28 w-20 rounded-lg ${shimmer}`} />
      <View className="ml-3 flex-1 justify-between py-1">
        <View className={`h-4 w-3/4 rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-1/2 rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-1/3 rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-2/3 rounded ${shimmer}`} />
      </View>
    </View>
  );
}
