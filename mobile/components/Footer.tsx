import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router/build/exports';

const Footer = ({ highlight }: { highlight: string }) => {
  return (
    <View className="absolute bottom-0 w-full">
      <Image className="absolute bottom-[-25] w-full" source={require('../assets/base.png')} />
      <View className="z-10 flex-row items-center justify-around py-10 pb-1">
        
        {highlight === 'book' ? (
          <Ionicons className="pb-0" name="book" size={24} color="white" />
        ) : (
          <Ionicons onPress={() => {router.replace('/(tabs)/Category');}} className="pb-0" name="book-outline" size={24} color="white" />
        )}

        {highlight === 'bookmark' ? (
          <Ionicons className="pb-10" name="bookmark" size={24} color="white" />
        ) : (
          <Ionicons onPress={() => {router.replace('/(tabs)/bookmark');}} className="pb-10" name="bookmark-outline" size={24} color="white" />
        )}
        
        {highlight === 'home' ? (
          <Ionicons className="pb-10" name="home" size={24} color="white" />
        ) : (
          <Ionicons onPress={() => {router.replace('/(tabs)');}} className="pb-10" name="home-outline" size={24} color="white" />
        )}
        
        <Ionicons onPress={() => {router.replace('/(tabs)/profile');}} name="headset-outline" size={24} color="white" />
      </View>
    </View>
  );
};

export default Footer;
