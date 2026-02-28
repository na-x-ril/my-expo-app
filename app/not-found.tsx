// app/+not-found.tsx
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-lg font-bold text-gray-800">Screen not found</Text>
      <Link href="/" className="mt-4 text-indigo-500">
        Go home
      </Link>
    </View>
  );
}
