// app/_layout.tsx
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import '../global.css';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="anime/[id]"
          options={{ title: 'Anime Detail', headerBackTitle: 'Back' }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
