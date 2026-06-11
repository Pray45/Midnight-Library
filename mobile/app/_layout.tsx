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
    NavigationBar.setButtonStyleAsync('dark');
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
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#050816' },
        }}>
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
