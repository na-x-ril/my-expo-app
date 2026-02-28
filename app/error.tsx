// app/+error.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ErrorScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-6">
      <Text className="mb-2 text-2xl font-bold text-gray-800">Oops!</Text>
      <Text className="mb-6 text-center text-gray-500">Something went wrong.</Text>
      <TouchableOpacity
        className="rounded-xl bg-indigo-500 px-6 py-3"
        onPress={() => router.replace('/')}>
        <Text className="font-semibold text-white">Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}
