import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function Horizontal({ data }: { data: any }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
      {data.map((item: any) => (
        <Pressable
          key={item.id}
          onPress={() =>
            router.push({
              pathname: `/screens/book/${item.id}`,
              params: { book: JSON.stringify(item) },
            })
          }
          className="mr-4 w-44"
          android_ripple={{ color: '#ddd' }}>
          <View className="overflow-hidden rounded-lg border border-amber-500/50 bg-amber-200/10 ">
            <Image
              source={{ uri: item.cover }}
              resizeMode="cover"
              className="aspect-[2/3] w-full border-2"
            />

            <View className="px-1 py-3">
              <View className="mb-0.5 self-start rounded-lg bg-amber-100 px-2 py-1">
                <Text numberOfLines={1} className="text-xs font-medium text-amber-700">
                  {item.genre}
                </Text>
              </View>

              <Text numberOfLines={1} className="text-base font-bold text-neutral-900">
                {item.title}
              </Text>

              <Text numberOfLines={1} className="mt-1 text-sm text-neutral-500">
                {item.author}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
