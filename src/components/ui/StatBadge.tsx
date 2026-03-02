// src/components/ui/StatBadge.tsx
import { memo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface StatBadgeProps {
  label: string;
  value: string;
}

export const StatBadge = memo(function StatBadge({ label, value }: StatBadgeProps) {
  const { isDark } = useTheme();

  return (
    <View className="flex-1 items-center py-3">
      <Text className={`w-full text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </Text>
      <Text className={`mt-0.5 text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
        {value}
      </Text>
    </View>
  );
});
