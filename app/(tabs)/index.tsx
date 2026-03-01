// app/(tabs)/index.tsx
import { useState, useRef, useCallback } from 'react';
import { View, Pressable, Animated, Easing, FlatList } from 'react-native';
import { useTopAnime } from '@/features/anime/hooks/useTopAnime';
import { useSeasonalAnime } from '@/features/anime/hooks/useSeasonalAnime';
import { AnimeList } from '@/features/anime/components/AnimeList';
import { BackToTopButton } from '@/components/BackToTopButton';
import { useTheme } from '@/context/ThemeContext';

type Tab = 'top' | 'seasonal';

const SCROLL_THRESHOLD = 300;

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('top');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const topAnimeQuery = useTopAnime();
  const seasonalAnimeQuery = useSeasonalAnime();
  const { isDark } = useTheme();

  const listRef = useRef<FlatList>(null);
  const topBg = useRef(new Animated.Value(1)).current;
  const seasonalBg = useRef(new Animated.Value(0)).current;

  const animateTab = useCallback(
    (tab: Tab) => {
      Animated.parallel([
        Animated.timing(topBg, {
          toValue: tab === 'top' ? 1 : 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(seasonalBg, {
          toValue: tab === 'seasonal' ? 1 : 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start();
    },
    [topBg, seasonalBg]
  );

  const handleTabPress = useCallback(
    (tab: Tab) => {
      if (tab === activeTab) return;
      setActiveTab(tab);
      animateTab(tab);
      setShowBackToTop(false);
    },
    [activeTab, animateTab]
  );

  const handleScroll = useCallback((event: { nativeEvent: { contentOffset: { y: number } } }) => {
    setShowBackToTop(event.nativeEvent.contentOffset.y > SCROLL_THRESHOLD);
  }, []);

  const handleBackToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const inactiveBg = isDark ? 'rgba(31,41,55,1)' : 'rgba(255,255,255,1)';
  const inactiveBorder = isDark ? 'rgba(55,65,81,1)' : 'rgba(229,231,235,1)';

  const topBgColor = topBg.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveBg, 'rgba(99,102,241,1)'],
  });

  const topBorderColor = topBg.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveBorder, 'rgba(99,102,241,1)'],
  });

  const seasonalBgColor = seasonalBg.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveBg, 'rgba(99,102,241,1)'],
  });

  const seasonalBorderColor = seasonalBg.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveBorder, 'rgba(99,102,241,1)'],
  });

  const topTextColor = topBg.interpolate({
    inputRange: [0, 1],
    outputRange: [isDark ? '#d1d5db' : '#4b5563', '#ffffff'],
  });

  const seasonalTextColor = seasonalBg.interpolate({
    inputRange: [0, 1],
    outputRange: [isDark ? '#d1d5db' : '#4b5563', '#ffffff'],
  });

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="mx-4 my-2 flex-row gap-2">
        <Pressable className="flex-1" onPress={() => handleTabPress('top')}>
          <Animated.View
            style={{
              borderRadius: 14,
              paddingVertical: 8,
              alignItems: 'center',
              backgroundColor: topBgColor,
              borderWidth: 1,
              borderColor: topBorderColor,
            }}>
            <Animated.Text style={{ fontWeight: '600', fontSize: 16, color: topTextColor }}>
              Top Anime
            </Animated.Text>
          </Animated.View>
        </Pressable>

        <Pressable className="flex-1" onPress={() => handleTabPress('seasonal')}>
          <Animated.View
            style={{
              borderRadius: 14,
              paddingVertical: 8,
              alignItems: 'center',
              backgroundColor: seasonalBgColor,
              borderWidth: 1,
              borderColor: seasonalBorderColor,
            }}>
            <Animated.Text style={{ fontWeight: '600', fontSize: 16, color: seasonalTextColor }}>
              Seasonal
            </Animated.Text>
          </Animated.View>
        </Pressable>
      </View>

      <AnimeList
        query={activeTab === 'top' ? topAnimeQuery : seasonalAnimeQuery}
        listRef={listRef}
        onScroll={handleScroll}
      />

      <BackToTopButton visible={showBackToTop} onPress={handleBackToTop} />
    </View>
  );
}
