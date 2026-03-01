// src/features/anime/components/FilterSheet.tsx
import { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import type { AnimeFilters, SortKey, AnimeTypeFilter, AnimeStatusFilter } from '../types';

interface FilterSheetProps {
  visible: boolean;
  filters: AnimeFilters;
  onChange: (filters: AnimeFilters) => void;
  onClose: () => void;
}

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onSelect,
  isDark,
}: {
  label: string;
  options: T[];
  value: T;
  onSelect: (v: T) => void;
  isDark: boolean;
}) {
  return (
    <View className="mb-4">
      <Text
        className={`mb-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <TouchableOpacity
              key={opt}
              onPress={() => onSelect(opt)}
              className={`rounded-full px-3 py-1.5 ${
                active
                  ? 'bg-indigo-500'
                  : isDark
                    ? 'border border-gray-600 bg-gray-700'
                    : 'border border-gray-200 bg-white'
              }`}>
              <Text
                className={`text-xs font-medium ${active ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export const FilterSheet = memo(function FilterSheet({
  visible,
  filters,
  onChange,
  onClose,
}: FilterSheetProps) {
  const { isDark } = useTheme();

  const update = useCallback(
    (partial: Partial<AnimeFilters>) => onChange({ ...filters, ...partial }),
    [filters, onChange]
  );

  const toggleSortOrder = useCallback(() => {
    update({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
  }, [filters.sortOrder, update]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />
      <View className={`rounded-t-3xl px-5 pb-10 pt-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <View className="mb-4 flex-row items-center justify-between">
          <Text className={`text-base font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Sort & Filter
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color={isDark ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
        </View>

        <ChipGroup<SortKey>
          label="Sort By"
          options={['score', 'title', 'episodes']}
          value={filters.sortKey}
          onSelect={(v) => update({ sortKey: v })}
          isDark={isDark}
        />

        <View className="mb-4 flex-row items-center justify-between">
          <Text
            className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Order
          </Text>
          <TouchableOpacity
            onPress={toggleSortOrder}
            className={`flex-row items-center gap-1 rounded-full px-3 py-1.5 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <Ionicons
              name={filters.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
              size={14}
              color={isDark ? '#a5b4fc' : '#6366f1'}
            />
            <Text
              className={`text-xs font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
              {filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Text>
          </TouchableOpacity>
        </View>

        <ChipGroup<AnimeTypeFilter>
          label="Type"
          options={['All', 'TV', 'Movie', 'OVA', 'Special', 'ONA']}
          value={filters.type}
          onSelect={(v) => update({ type: v })}
          isDark={isDark}
        />

        <ChipGroup<AnimeStatusFilter>
          label="Status"
          options={['All', 'Airing', 'Finished']}
          value={filters.status}
          onSelect={(v) => update({ status: v })}
          isDark={isDark}
        />
      </View>
    </Modal>
  );
});
