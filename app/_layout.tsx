// app/_layout.tsx
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import '../global.css';

function RootStack() {
  const { isDark } = useTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: isDark ? '#111827' : '#f9fafb' }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: isDark ? '#1f2937' : '#ffffff' },
          headerTintColor: isDark ? '#f9fafb' : '#111827',
          headerRight: () => <ThemeToggle />,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="anime/[id]"
          options={{ title: 'Anime Detail', headerBackTitle: 'Back' }}
        />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
