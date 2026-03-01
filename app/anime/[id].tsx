// app/anime/[id].tsx
import { useRef, useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAnimeDetail } from '@/features/anime/hooks/useAnimeDetail';
import {
  useAnimeCharacters,
  useAnimeStaff,
  useAnimeRecommendations,
} from '@/features/anime/hooks/useAnimeExtras';
import { useFavorites } from '@/features/favorites/useFavorites';
import { DetailSkeleton } from '@/features/anime/components/skeletons/DetailSkeleton';
import { BackToTopButton } from '@/components/BackToTopButton';
import { useTheme } from '@/context/ThemeContext';
import type {
  AnimeCharacter,
  AnimeStaffEntry,
  RecommendationEntry,
} from '@/features/anime/types/detail';

const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';
const SCROLL_THRESHOLD = 300;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Small reusable pieces ────────────────────────────────────────────────────

function SectionTitle({ title, isDark }: { title: string; isDark: boolean }) {
  return (
    <View className="mb-3 flex-row items-center gap-2">
      <View className="h-5 w-1 rounded-full bg-indigo-500" />
      <Text className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
        {title}
      </Text>
    </View>
  );
}

function StatBadge({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return (
    <View className={`flex-1 items-center py-3`}>
      <Text className={`w-full text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </Text>
      <Text className={`mt-0.5 text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
        {value}
      </Text>
    </View>
  );
}

function SectionLoader({ isDark }: { isDark: boolean }) {
  return (
    <View
      className={`h-28 items-center justify-center rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <ActivityIndicator color="#6366f1" />
    </View>
  );
}

// ─── Characters section ───────────────────────────────────────────────────────

function CharacterCard({ item, isDark }: { item: AnimeCharacter; isDark: boolean }) {
  const jaVA = item.voice_actors.find((v) => v.language === 'Japanese');
  return (
    <View
      style={{ width: 130 }}
      className={`mr-3 overflow-hidden rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <Image
        source={{ uri: item.character.images.jpg.image_url }}
        style={{ width: 130, height: 170 }}
        contentFit="cover"
        placeholder={blurhash}
        cachePolicy="memory-disk"
        transition={150}
      />
      <View className="p-2">
        <Text
          className={`text-lg font-semibold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
          numberOfLines={2}>
          {item.character.name}
        </Text>
        <Text className={`mt-0.5 text-sm ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}>
          {item.role}
        </Text>
        {jaVA && (
          <Text
            className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            numberOfLines={1}>
            {jaVA.person.name}
          </Text>
        )}
      </View>
    </View>
  );
}

// ─── Staff section ────────────────────────────────────────────────────────────

function StaffCard({ item, isDark }: { item: AnimeStaffEntry; isDark: boolean }) {
  return (
    <View
      style={{ width: 130 }}
      className={`mr-3 overflow-hidden rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <Image
        source={{ uri: item.person.images.jpg.image_url }}
        style={{ width: 130, height: 170 }}
        contentFit="cover"
        placeholder={blurhash}
        cachePolicy="memory-disk"
        transition={150}
      />
      <View className="p-2">
        <Text
          className={`text-lg font-semibold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
          numberOfLines={2}>
          {item.person.name}
        </Text>
        <Text
          className={`mt-0.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          numberOfLines={2}>
          {item.positions.join(', ')}
        </Text>
      </View>
    </View>
  );
}

// ─── Recommendation card ──────────────────────────────────────────────────────

function RecommendationCard({ item, isDark }: { item: RecommendationEntry; isDark: boolean }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{ width: 120 }}
      className={`mr-3 overflow-hidden rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      activeOpacity={0.8}
      onPress={() => router.push(`/anime/${item.entry.mal_id}`)}>
      <Image
        source={{ uri: item.entry.images.jpg.image_url }}
        style={{ width: 120, height: 165 }}
        contentFit="cover"
        placeholder={blurhash}
        cachePolicy="memory-disk"
        transition={150}
      />
      <View className="p-2">
        <Text
          className={`text-md font-semibold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
          numberOfLines={2}>
          {item.entry.title}
        </Text>
        {item.votes > 0 && (
          <View className="mt-1 flex-row items-center gap-0.5">
            <Ionicons name="thumbs-up-outline" size={10} color={isDark ? '#9ca3af' : '#6b7280'} />
            <Text className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {item.votes}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const malId = Number(id);
  const { data, isLoading, isError } = useAnimeDetail(malId);
  const { data: charsData, isLoading: charsLoading } = useAnimeCharacters(malId);
  const { data: staffData, isLoading: staffLoading } = useAnimeStaff(malId);
  const { data: recsData, isLoading: recsLoading } = useAnimeRecommendations(malId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDark } = useTheme();

  const scrollRef = useRef<ScrollView>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  const handleScroll = useCallback((event: { nativeEvent: { contentOffset: { y: number } } }) => {
    setShowBackToTop(event.nativeEvent.contentOffset.y > SCROLL_THRESHOLD);
  }, []);

  const handleBackToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !data) {
    return (
      <View
        className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          Failed to load anime detail.
        </Text>
      </View>
    );
  }

  const anime = data.data;
  const favorited = isFavorite(anime.mal_id);

  // Prepare data slices
  const characters = charsData?.data
    ? [...charsData.data].sort((a, b) => b.favorites - a.favorites).slice(0, 20)
    : [];
  const staff = staffData?.data?.slice(0, 20) ?? [];
  const recommendations = recsData?.data?.slice(0, 15) ?? [];

  const bg = isDark ? 'bg-gray-900' : 'bg-white';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-gray-200';

  return (
    <View className="flex-1">
      <ScrollView
        ref={scrollRef}
        className={`flex-1 ${bg}`}
        contentContainerClassName="pb-12"
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {/* Hero image */}
        <Image
          source={{ uri: anime.images.jpg.large_image_url }}
          style={{ width: SCREEN_WIDTH, height: 460 }}
          contentFit="contain"
          placeholder={blurhash}
          cachePolicy="memory-disk"
          transition={200}
        />

        {/* Title + favourite */}
        <View className="px-4 pt-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text
                className={`text-4xl font-bold leading-tight ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {anime.title}
              </Text>
              {anime.title_english && anime.title_english !== anime.title && (
                <Text
                  className={`text-md mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  numberOfLines={1}>
                  {anime.title_english}
                </Text>
              )}
              {anime.title_japanese && (
                <Text
                  className={`text-md ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  numberOfLines={1}>
                  {anime.title_japanese}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => toggleFavorite(anime)}
              className={`rounded-full p-2 px-[0.55rem] ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <Ionicons
                name={favorited ? 'heart' : 'heart-outline'}
                size={28}
                color={favorited ? '#ef4444' : isDark ? '#6b7280' : '#9ca3af'}
              />
            </TouchableOpacity>
          </View>

          {/* Genres */}
          {anime.genres.length > 0 && (
            <View className="mt-3 flex-row flex-wrap gap-2">
              {anime.genres.map((g) => (
                <View
                  key={g.mal_id}
                  className={`rounded-full px-3 py-1 ${isDark ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                  <Text
                    className={`text-sm font-semibold ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>
                    {g.name}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Stat badges */}
          <View className={`mt-4 flex-row gap-2 rounded-2xl py-1 ${cardBg}`}>
            <StatBadge label="Score" value={anime.score?.toFixed(1) ?? 'N/A'} isDark={isDark} />
            <StatBadge label="Rank" value={anime.rank ? `#${anime.rank}` : 'N/A'} isDark={isDark} />
            <StatBadge
              label="Episodes"
              value={anime.episodes ? String(anime.episodes) : '?'}
              isDark={isDark}
            />
            <StatBadge
              label="Status"
              value={anime.airing ? 'Airing' : 'Finished'}
              isDark={isDark}
            />
          </View>

          {/* Extra info row */}
          <View className={`mt-2 flex-row gap-2 rounded-2xl py-1 ${cardBg}`}>
            <StatBadge label="Type" value={anime.type ?? 'Unknown'} isDark={isDark} />
            <StatBadge
              label="Season"
              value={
                anime.season && anime.year
                  ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`
                  : anime.year
                    ? String(anime.year)
                    : 'N/A'
              }
              isDark={isDark}
            />
            <StatBadge label="Source" value={anime.source ?? 'N/A'} isDark={isDark} />
            <StatBadge
              label="Popularity"
              value={anime.popularity ? `#${anime.popularity}` : 'N/A'}
              isDark={isDark}
            />
          </View>

          {/* Studios & Broadcast */}
          {(anime.studios.length > 0 || anime.broadcast?.string) && (
            <View className="mt-2 flex-row gap-2">
              {anime.studios.length > 0 && (
                <View
                  className={`flex-1 flex-row items-center gap-2 rounded-2xl px-3 py-3 ${cardBg}`}>
                  <Ionicons
                    name="business-outline"
                    size={15}
                    color={isDark ? '#6b7280' : '#9ca3af'}
                  />
                  <Text
                    className={`flex-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    numberOfLines={2}>
                    {anime.studios.map((s) => s.name).join(', ')}
                  </Text>
                </View>
              )}
              {anime.broadcast?.string && (
                <View
                  className={`flex-1 flex-row items-center gap-2 rounded-2xl px-3 py-3 ${cardBg}`}>
                  <Ionicons name="time-outline" size={15} color={isDark ? '#6b7280' : '#9ca3af'} />
                  <Text
                    className={`flex-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    numberOfLines={2}>
                    {anime.broadcast.string}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Synopsis */}
          {anime.synopsis && (
            <View className="mt-4">
              <SectionTitle title="Synopsis" isDark={isDark} />
              <Text
                className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                numberOfLines={synopsisExpanded ? undefined : 5}>
                {anime.synopsis}
              </Text>
              <TouchableOpacity
                onPress={() => setSynopsisExpanded((v) => !v)}
                className="mt-1 self-start">
                <Text
                  className={`text-sm font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}>
                  {synopsisExpanded ? 'Show less' : 'Read more'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ─── Characters ─────────────────────────────────────── */}
        <View className="mt-6 px-4">
          <SectionTitle title="Characters" isDark={isDark} />
        </View>
        {charsLoading ? (
          <View className="px-4">
            <SectionLoader isDark={isDark} />
          </View>
        ) : characters.length > 0 ? (
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}>
            {characters.map((item) => (
              <CharacterCard key={item.character.mal_id} item={item} isDark={isDark} />
            ))}
          </ScrollView>
        ) : null}

        {/* ─── Staff ──────────────────────────────────────────── */}
        <View className="mt-6 px-4">
          <SectionTitle title="Staff" isDark={isDark} />
        </View>
        {staffLoading ? (
          <View className="px-4">
            <SectionLoader isDark={isDark} />
          </View>
        ) : staff.length > 0 ? (
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}>
            {staff.map((item) => (
              <StaffCard key={item.person.mal_id} item={item} isDark={isDark} />
            ))}
          </ScrollView>
        ) : null}

        {/* ─── Recommendations ────────────────────────────────── */}
        {(recsLoading || recommendations.length > 0) && (
          <>
            <View className="mt-6 px-4">
              <SectionTitle title="You Might Also Like" isDark={isDark} />
            </View>
            {recsLoading ? (
              <View className="px-4">
                <SectionLoader isDark={isDark} />
              </View>
            ) : (
              <ScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}>
                {recommendations.map((item, idx) => (
                  <RecommendationCard
                    key={`${item.entry.mal_id}-${idx}`}
                    item={item}
                    isDark={isDark}
                  />
                ))}
              </ScrollView>
            )}
          </>
        )}

        {/* ─── Background ─────────────────────────────────────── */}
        {anime.background && (
          <View className="mt-6 px-4">
            <SectionTitle title="Background" isDark={isDark} />
            <Text
              className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {anime.background}
            </Text>
          </View>
        )}
      </ScrollView>

      <BackToTopButton visible={showBackToTop} onPress={handleBackToTop} />
    </View>
  );
}
