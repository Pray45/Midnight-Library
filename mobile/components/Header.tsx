import { View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

function Header({ heading }: { heading: string }) {
  return (
    <View className="flex w-full flex-row items-center justify-between border-2">
      <View className="border-r-2 w-1/6 flex items-center justify-center h-16">
        <Ionicons name="menu" size={30} color="black" />
      </View>
      <View className="flex-row items-center justify-center">
        <Text className="text-2xl font-bold">{heading}</Text>
      </View>
      <View className="border-l-2 w-1/6 flex items-center justify-center h-16">
        <Image
          source={require('../assets/sunflower2.png')}
          className="h-14 w-14 rounded-full"
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

export default Header;