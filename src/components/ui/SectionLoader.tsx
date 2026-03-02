// src/components/ui/SectionLoader.tsx
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface SectionLoaderProps {
  height?: number;
}

export function SectionLoader({ height = 112 }: SectionLoaderProps) {
  const { isDark } = useTheme();

  return (
    <View
      style={{ height }}
      className={`w-full items-center justify-center rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <ActivityIndicator color="#6366f1" />
    </View>
  );
}
