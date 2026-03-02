// src/components/ui/SectionTitle.tsx
import { memo } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface SectionTitleProps {
  title: string;
  accentColor?: string;
}

export const SectionTitle = memo(function SectionTitle({
  title,
  accentColor = '#6366f1',
}: SectionTitleProps) {
  const { isDark } = useTheme();

  return (
    <View className="mb-3 flex-row items-center gap-2">
      <View style={{ backgroundColor: accentColor }} className="h-5 w-1 rounded-full" />
      <Text className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
        {title}
      </Text>
    </View>
  );
});
