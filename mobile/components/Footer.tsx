import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router/build/exports';

const Footer = ({ highlight }: { highlight: string }) => {
  return (
    <View className="absolute bottom-0 w-full">
      <Image className="absolute bottom-[-25] w-full" source={require('../assets/base.png')} />
      <View className="z-10 flex-row items-center justify-around py-10 pb-1">
        <Ionicons
          onPress={() => {
            router.replace('/(tabs)/Category');
          }}
          className="pb-0"
          name="book-outline"
          size={24}
          color="white"
        />

        <Ionicons
          onPress={() => {
            router.replace('/(tabs)/bookmark');
          }}
          className="pb-8"
          name="bookmark-outline"
          size={24}
          color="white"
        />

        <Ionicons
          onPress={() => {
            router.replace('/(tabs)');
          }}
          className="pb-14"
          name="home-outline"
          size={24}
          color="white"
        />

        <Ionicons
          onPress={() => {
            router.replace('/(tabs)/Listen');
          }}
          className='pb-8'
          name="headset-outline"
          size={24}
          color="white"
        />

        <Ionicons
          onPress={() => {
            router.replace('/(tabs)/event');
          }}
          name="sparkles-outline"
          size={24}
          color="white"
        />
      </View>
    </View>
  );
};

export default Footer;
