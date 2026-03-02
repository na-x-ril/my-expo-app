// src/components/BackToTopButton.tsx
import { memo, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface BackToTopButtonProps {
  visible: boolean;
  onPress: () => void;
}

export const BackToTopButton = memo(function BackToTopButton({
  visible,
  onPress,
}: BackToTopButtonProps) {
  const { isDark } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: visible ? 0 : 16,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, opacity, translateY]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        opacity,
        transform: [{ translateY }],
      }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          width: 48,
          height: 48,
          borderRadius: 30,
          backgroundColor: isDark ? '#4f46e5' : '#6366f1',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 6,
        }}>
        <Ionicons name="arrow-up" size={26} color="#ffffff" />
      </TouchableOpacity>
    </Animated.View>
  );
});
