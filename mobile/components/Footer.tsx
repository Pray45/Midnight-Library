import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type TabName = 'home' | 'category' | 'bookmark' | 'search' | 'star';

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
  { name: 'star', icon: 'sparkles-outline', route: '/(tabs)/Star' },
];

function FooterTabItem({
  tab,
  isHighlighted,
}: {
  tab: (typeof tabs)[number];
  isHighlighted: boolean;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.88, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    if (!isHighlighted) {
      router.replace(tab.route as any);
    }
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      className="flex p-3 items-center justify-center"
    >
      <Animated.View style={animatedStyle} className="items-center justify-center">
        <Ionicons
          name={tab.icon}
          size={26}
          color={isHighlighted ? '#f59e0b' : '#1f2937'}
        />
        {isHighlighted && (
          <View className="mt-1 h-1 w-1 rounded-full bg-amber-500" />
        )}
      </Animated.View>
    </Pressable>
  );
}

const Footer = ({ highlight }: { highlight: TabName }) => {
  return (
    <View className="z-10 flex-row items-center justify-around py-3 bg-background border-t-2 border-black">
      {tabs.map((tab) => (
        <FooterTabItem
          key={tab.name}
          tab={tab}
          isHighlighted={highlight === tab.name}
        />
      ))}
    </View>
  );
};

export default Footer;
