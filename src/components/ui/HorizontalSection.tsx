// src/components/ui/HorizontalSection.tsx
import { ReactNode } from 'react';
import { View, ScrollView } from 'react-native';
import { SectionTitle } from './SectionTitle';
import { SectionLoader } from './SectionLoader';

interface HorizontalSectionProps {
  title: string;
  accentColor?: string;
  isLoading?: boolean;
  children: ReactNode;
}

export function HorizontalSection({
  title,
  accentColor = '#6366f1',
  isLoading = false,
  children,
}: HorizontalSectionProps) {
  return (
    <View className="mt-6">
      <View className="px-4">
        <SectionTitle title={title} accentColor={accentColor} />
      </View>
      {isLoading ? (
        <View className="px-4">
          <SectionLoader />
        </View>
      ) : (
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}>
          {children}
        </ScrollView>
      )}
    </View>
  );
}
