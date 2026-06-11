import { View, Text, Image, ScrollView, Pressable } from 'react-native';

export default function Horizontal({ data }: { data: any[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
      {data.map((item) => (
        <Pressable key={item.id} className="mr-4 w-44" android_ripple={{ color: '#ddd' }}>
          <View className="overflow-hidden rounded-lg border border-neutral-200/50 bg-neutral-50 shadow-sm">
            <Image
              source={{ uri: item.cover }}
              resizeMode="cover"
              className="aspect-[2/3] w-full bg-neutral-200"
            />

            <View className="bg-white p-3">
              <View className="mb-2 self-start rounded-lg bg-amber-100 px-2 py-1">
                <Text className="text-xs font-medium text-amber-700">{item.genre}</Text>
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
