import { Text, View, Image } from 'react-native';
import React from 'react';
import { useAuthStore } from '../zustand/authStore';

export const Header = () => {
  const userData = useAuthStore((state) => state.userData);
  const date = new Date().toLocaleDateString('en-US', { day: 'numeric' });
  const month = new Date().toLocaleDateString('en-US', { month: 'short' });
  const year = new Date().toLocaleDateString('en-US', { year: '2-digit' });
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const specialWish = 'its 11:11, make a wish!!!';
  const wish =
    hour < 12
      ? hour < 5
        ? 'you should sleep!!!'
        : 'Good Morning'
      : hour < 17
        ? 'Good Afternoon'
        : 'Good Evening';
  const name = userData?.name || 'User';
  const pfp =
    'https://imgs.search.brave.com/w2X_sut9-uGu-jk7yvhvar8NEqQBJDedOSC1nYd9S74/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTE2/MjUwMDY4L3Bob3Rv/L25ldy15b3JrLW55/LWd1ZXN0cy1wb3Nl/LXdpdGgtanVkaXRo/LWxlaWJlci1wcm9k/dWN0cy1hdC10aGUt/cGFweXJ1cy1jYWYl/QzMlQTktZHVyaW5n/LWF0LWltZy1ueWZ3/LXRoZS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9QjZ2WmJY/Tl9SVnNZSTVRSUt3/Z2FDR2E4eFhlRGJ6/M1J6ZF9mdVJZSUhw/OD0';

  return (
    <View className="flex w-full flex-row items-center justify-between p-4">
      <View>
        <View className="flex w-full flex-row gap-1">
          <Text className="text-3xl font-bold text-black">{date}</Text>
          <Text className="text-3xl font-semibold text-black">{month}</Text>
          <Text className="text-3xl font-semibold text-black">{year}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-lg font-medium text-zinc-500">
            {(hour == 11 && minute == 11) || (hour == 23 && minute == 11) ? specialWish : wish},
          </Text>
          <Text className="ml-1 font-black text-black">{name} !</Text>
        </View>
      </View>
      <View>
        <Image
          className="h-16 w-16 rounded-full"
          source={pfp ? { uri: pfp } : require('../assets/login.png')}
        />
      </View>
    </View>
  );
};

export default Header;
