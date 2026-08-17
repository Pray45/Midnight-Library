import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import '../global.css';
import { useAuthStore } from '../zustand/authStore';
import * as NavigationBar from 'expo-navigation-bar';

export default function RootLayout() {
  const checkAccessToken = useAuthStore((state) => state.checkAccessToken);
  const hydrated = useAuthStore((state) => state.hydrated);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden').catch(() => {});
    NavigationBar.setBackgroundColorAsync('#000000').catch(() => {});
    NavigationBar.setButtonStyleAsync('light').catch(() => {});
  }, []);

  useEffect(() => {
    void checkAccessToken();
  }, [checkAccessToken]);

  if (!hydrated) {
    return (
      <SafeAreaProvider>
        <View className="flex-1 bg-background" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fef7ec' },
          animation: 'slide_from_right',
          animationDuration: 250,
          gestureEnabled: true,
        }}
      >
        {loggedIn ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
          </>
        )}
      </Stack>
    </SafeAreaProvider>
  );
}
