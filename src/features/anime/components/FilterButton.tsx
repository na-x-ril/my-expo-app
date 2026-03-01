// src/features/anime/components/FilterButton.tsx
import { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { type AnimeFilters, DEFAULT_FILTERS } from '../types';

interface FilterButtonProps {
  filters: AnimeFilters;
  onPress: () => void;
}

function isFiltered(filters: AnimeFilters): boolean {
  return (
    filters.sortKey !== DEFAULT_FILTERS.sortKey ||
    filters.sortOrder !== DEFAULT_FILTERS.sortOrder ||
    filters.type !== DEFAULT_FILTERS.type ||
    filters.status !== DEFAULT_FILTERS.status
  );
}

export const FilterButton = memo(function FilterButton({ filters, onPress }: FilterButtonProps) {
  const { isDark } = useTheme();
  const active = isFiltered(filters);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center gap-1 rounded-xl px-3 py-2 ${
        active
          ? 'bg-indigo-500'
          : isDark
            ? 'border border-gray-700 bg-gray-800'
            : 'border border-gray-200 bg-white'
      }`}>
      <Ionicons
        name="options-outline"
        size={16}
        color={active ? '#ffffff' : isDark ? '#9ca3af' : '#6b7280'}
      />
      <Text
        className={`text-xs font-medium ${active ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Filter
      </Text>
    </TouchableOpacity>
  );
});
