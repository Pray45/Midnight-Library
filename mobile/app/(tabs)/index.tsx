import { View, ScrollView } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useAuthStore } from 'zustand/authStore';
import { router } from 'expo-router/build/exports';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Title from 'components/Title';
import Horizontal from 'components/Horizontal';
import Vertical from 'components/Vertical';
import books from '../../data.json';

export default function index() {
  const logout = useAuthStore((state) => state.logout);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      router.replace('/(auth)');
    }
  }, [loggedIn]);

  return (
    <SafeAreaView className="h-full w-full flex-1 bg-background">
      <ScrollView className="flex-1">
        <Header />
        {/* <Button title="Logout" onPress={handleLogout} /> */}
        <View className="mt-5">
          <Title title="Recents" readmore={true} />
          <Horizontal data={books} />
          <Title title="Continue Reading" readmore={false} />
          <View className="ml-10">
            <Vertical data={books} scale={0.9} />
          </View>
        </View>
      </ScrollView>
      <Footer highlight="home" />
    </SafeAreaView>
  );
}
