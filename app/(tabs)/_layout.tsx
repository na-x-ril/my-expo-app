// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

interface MyAnimeListTitleProps {
  text: string;
  isDark: boolean;
}

function MyAnimeTitle({ text, isDark }: MyAnimeListTitleProps) {
  return (
    <Text className={`text-4xl font-bold ${isDark ? 'text-indigo-200' : 'text-blue-800'}`}>
      {text}
    </Text>
  );
}

export default function TabsLayout() {
  const { isDark } = useTheme();

  const headerBg = isDark ? '#1f2937' : '#ffffff';
  const headerColor = isDark ? '#f9fafb' : '#111827';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: isDark ? '#6b7280' : '#9ca3af',
        tabBarShowLabel: false,
        tabBarIconStyle: {
          top: 8,
        },
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderColor: '#454545',
        },
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: headerColor,
        headerRight: () => <ThemeToggle />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          headerTitle: () => <MyAnimeTitle text="My Anime" isDark={isDark} />,
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
