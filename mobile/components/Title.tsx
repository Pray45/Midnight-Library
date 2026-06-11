import { View, Text } from 'react-native';
import React from 'react';

export default function Title({ title, readmore }: { title: string; readmore: boolean }) {
  return (
    <View className=" my-5 mx-4 flex-row justify-between items-end">
      <Text className="text-3xl font-bold">{title}</Text>
      {readmore && <Text className="text-zinc-500">Read more</Text>}
    </View>
  );
}
