import { View, Text, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Button from '../../components/Ui/Button';

export default function Listen() {
  const item = {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self Help',
    cover: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: '#FFF5E5',
      }}>
      <View className="h-[550px] w-full items-center rounded-b-[80px] border-x-2 border-b-2 bg-[#FFE3BF] ">
        <View className="w-full flex-row justify-between px-8 pb-8 pt-14">
          <Button icon="arrow-back" link="/(tabs)/" />
          <Button icon="grid-outline" link="/(tabs)/" />
        </View>

        <View className="h-3/4 w-1/2 self-center justify-self-center overflow-hidden rounded-xl">
          <Image
            source={{ uri: item.cover }}
            resizeMode="cover"
            className="aspect-[2/3] w-full border-2 border-neutral-300 bg-neutral-200"
          />
          <Text className="mt-4 text-center text-2xl font-bold text-black">{item.title}</Text>
          <Text className="text-center text-lg font-medium text-zinc-500">{item.author}</Text>
        </View>

        <View className="absolute bottom-[-40] h-20 w-1/2 flex-row items-center justify-between gap-5 self-center rounded-full bg-black px-3">
          <View className="rounded-full bg-white p-3">
            <Ionicons name="play-outline" size={24} color="black" />
          </View>
          <Text className="mr-8 text-lg font-bold text-white">Listen Now</Text>
        </View>
      </View>

    </ScrollView>
  );
}
