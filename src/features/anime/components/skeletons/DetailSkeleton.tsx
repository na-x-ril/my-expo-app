// src/features/anime/components/skeletons/DetailSkeleton.tsx
import { ScrollView, View, Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export function DetailSkeleton() {
  const { isDark } = useTheme();
  const shimmer = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const bg = isDark ? 'bg-gray-900' : 'bg-gray-50';

  return (
    <ScrollView className={`flex-1 ${bg}`}>
      <View style={{ height: 288, width }} className={shimmer} />
      <View className="px-4 pt-4">
        <View className={`h-6 w-3/4 rounded ${shimmer}`} />
        <View className={`mt-2 h-4 w-1/2 rounded ${shimmer}`} />
        <View className="mt-3 flex-row gap-2">
          {[40, 56, 48].map((w) => (
            <View key={w} style={{ width: w }} className={`h-6 rounded-full ${shimmer}`} />
          ))}
        </View>
        <View className="mt-4 flex-row gap-6">
          {[0, 1, 2, 3].map((i) => (
            <View key={i} className="items-center gap-1">
              <View className={`h-3 w-10 rounded ${shimmer}`} />
              <View className={`h-4 w-8 rounded ${shimmer}`} />
            </View>
          ))}
        </View>
        <View className={`mt-4 h-3 w-full rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-full rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-full rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-4/5 rounded ${shimmer}`} />
        <View className={`mt-2 h-3 w-3/5 rounded ${shimmer}`} />
      </View>
    </ScrollView>
  );
}
