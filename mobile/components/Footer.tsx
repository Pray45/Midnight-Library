import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';

type TabName = 'home' | 'category' | 'bookmark' | 'search' | 'event';

const tabs: {
  name: TabName;
  icon:
  | 'home-outline'
  | 'book-outline'
  | 'bookmark-outline'
  | 'search-outline'
  | 'sparkles-outline';
  route: string;
}[] = [
    { name: 'category', icon: 'book-outline', route: '/(tabs)/Category' },
    { name: 'bookmark', icon: 'bookmark-outline', route: '/(tabs)/Saved' },
    { name: 'home', icon: 'home-outline', route: '/(tabs)' },
    { name: 'search', icon: 'search-outline', route: '/(tabs)/Search' },
    { name: 'event', icon: 'sparkles-outline', route: '/(tabs)/event' },
  ];

const Footer = ({ highlight }: { highlight: TabName }) => {
  return (
    <View className="z-10 flex-row items-center justify-around py-4 bg-background border-2">
      {tabs.map((tab) => (
        <Pressable key={tab.name} className="flex p-3 items-center justify-center" onPress={() => router.replace(tab.route as any)}>
          <Ionicons
            key={tab.name}
            name={tab.icon}
            size={24}
            color={highlight === tab.name ? '#f59e0b' : 'black'}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default Footer;
