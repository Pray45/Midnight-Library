import { View, Image, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';
import { useAuthStore } from 'zustand/authStore';

function Header({ heading }: { heading: string }) {

  const userData = useAuthStore((state) => state.userData);

  return (
    <View className="flex w-full flex-row items-center justify-between border-2">
      <Pressable
        onPress={() => router.push({ pathname: `/screens/Settings` })}
        className="border-r-2 w-1/6 flex items-center justify-center h-16">
        <Ionicons name="menu" size={30} color="black" />
      </Pressable>
      <View className="flex-row items-center justify-center">
        <Text className="text-2xl font-bold">{heading}</Text>
      </View>
      <View className="border-l-2 w-1/6 flex items-center justify-center h-16">
        <View className="w-12 h-12 rounded-full bg-purple-700 overflow-hidden justify-center items-center">
          <Text className="text-white text-center text-xl font-bold leading-14">{userData?.name?.charAt(0)}</Text>
        </View>
      </View>
    </View>
  );
}

export default Header;