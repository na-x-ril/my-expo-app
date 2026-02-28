// src/lib/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

async function readFavorites<T>(): Promise<T[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeFavorites<T>(data: T[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
  } catch {
    throw new Error('Failed to persist favorites.');
  }
}

export const favoritesStorage = { readFavorites, writeFavorites };
