// src/components/ui/MediaCard.tsx
import { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

interface BaseMediaCardProps {
  width: number;
  imageUrl: string;
  title: string;
  subtitle?: string;
  extra?: string | React.ReactNode;
  onPress?: () => void;
}

interface CharacterCardProps extends BaseMediaCardProps {
  variant: 'character';
  voiceActor?: string;
}

interface StaffCardProps extends BaseMediaCardProps {
  variant: 'staff';
  positions: string[];
}

interface RecommendationCardProps extends BaseMediaCardProps {
  variant: 'recommendation';
  votes?: number;
  animeId?: number;
}

type MediaCardProps = CharacterCardProps | StaffCardProps | RecommendationCardProps;

const CharacterCardContent = memo(function CharacterCardContent({
  subtitle,
  voiceActor,
  isDark,
}: {
  subtitle?: string;
  voiceActor?: string;
  isDark: boolean;
}) {
  return (
    <View className="p-2">
      {subtitle && (
        <Text className={`text-sm ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}>
          {subtitle}
        </Text>
      )}
      {voiceActor && (
        <Text
          className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          numberOfLines={1}>
          {voiceActor}
        </Text>
      )}
    </View>
  );
});

const StaffCardContent = memo(function StaffCardContent({
  positions,
  isDark,
}: {
  positions: string[];
  isDark: boolean;
}) {
  return (
    <View className="p-2">
      <Text
        className={`mt-0.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
        numberOfLines={2}>
        {positions.join(', ')}
      </Text>
    </View>
  );
});

const RecommendationCardContent = memo(function RecommendationCardContent({
  votes,
  isDark,
}: {
  votes?: number;
  isDark: boolean;
}) {
  return (
    <View className="p-2">
      {votes !== undefined && votes > 0 && (
        <View className="mt-1 flex-row items-center gap-0.5">
          <Ionicons name="thumbs-up-outline" size={10} color={isDark ? '#9ca3af' : '#6b7280'} />
          <Text className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{votes}</Text>
        </View>
      )}
    </View>
  );
});

export const MediaCard = memo(function MediaCard(props: MediaCardProps) {
  const { width, imageUrl, title, variant } = props;
  const router = useRouter();
  const { isDark } = useTheme();

  const imageHeight = width * 1.3;

  const content = useCallback(() => {
    switch (variant) {
      case 'character': {
        const characterProps = props as CharacterCardProps;
        return (
          <CharacterCardContent
            subtitle={characterProps.subtitle}
            voiceActor={characterProps.voiceActor}
            isDark={isDark}
          />
        );
      }
      case 'staff': {
        const staffProps = props as StaffCardProps;
        return <StaffCardContent positions={staffProps.positions} isDark={isDark} />;
      }
      case 'recommendation': {
        const recProps = props as RecommendationCardProps;
        return <RecommendationCardContent votes={recProps.votes} isDark={isDark} />;
      }
      default:
        return null;
    }
  }, [variant, props, isDark]);

  const handlePress = useCallback(() => {
    if (variant === 'recommendation') {
      const recProps = props as RecommendationCardProps;
      if (recProps.animeId) {
        router.push(`/anime/${recProps.animeId}`);
      }
    }
  }, [variant, props, router]);

  const Wrapper = variant === 'recommendation' ? TouchableOpacity : View;

  return (
    <Wrapper
      style={{ width }}
      className={`mr-3 overflow-hidden rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      {...(variant === 'recommendation' ? { onPress: handlePress, activeOpacity: 0.8 } : {})}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width, height: imageHeight }}
        contentFit="cover"
        placeholder={blurhash}
        cachePolicy="memory-disk"
        transition={150}
      />
      <View>
        <View className="p-2">
          <Text
            className={`text-lg font-semibold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
            numberOfLines={2}>
            {title}
          </Text>
        </View>
        {content()}
      </View>
    </Wrapper>
  );
});
