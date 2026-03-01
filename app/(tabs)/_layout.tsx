// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

interface MyAnimeListTitleProps {
  text: string;
  className?: string;
  isDark: boolean;
}

function MyAnimeTitle({ text, isDark, className }: MyAnimeListTitleProps) {
  return (
    <Text
      className={`${className ?? 'font-semibold'} text-4xl ${isDark ? 'text-indigo-200' : 'text-blue-800'}`}>
      {text}
    </Text>
  );
}

export default function TabsLayout() {
  const { isDark } = useTheme();

  const headerBg = isDark ? '#111827' : '#ffffff';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: isDark ? '#6b7280' : '#9ca3af',
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarIconStyle: {
          top: 10,
        },
        tabBarStyle: {
          height: 75,
          backgroundColor: isDark ? '#111827' : '#ffffff',
          borderColor: 'transparent',
          shadowColor: 'transparent',
        },
        headerStyle: { backgroundColor: headerBg },
        headerRight: () => <ThemeToggle />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          headerTitle: () => (
            <MyAnimeTitle className="font-bold" text="My Animes" isDark={isDark} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
          headerTitle: () => <MyAnimeTitle text="Search" isDark={isDark} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
          headerTitle: () => <MyAnimeTitle text="Favorites" isDark={isDark} />,
        }}
      />
    </Tabs>
  );
}
