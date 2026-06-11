import { View, Image, ScrollView, Text } from 'react-native';

export default function Vertical({ data }: { data: any[] }) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
      {data.map((item) => (
        <View key={item.id} className="ml-10 mb-8 w-48">
          <View className="mr-4 w-48 flex-row items-center gap-3">
            <View className="mb-6 items-center">
                            
              <View className="z-10 w-44 overflow-hidden border border-gray-500">
                <Image
                  source={{ uri: item.cover }}
                  resizeMode="cover"
                  className="aspect-[2/3] w-full"
                />
              </View>

              <View className="absolute justify-content items-start -left-6 bottom-10 w-96 h-40 bg-yellow-300/30 p-3">
                <Text numberOfLines={2} className="left-52 w-36 text-xl font-bold text-neutral-700">{item.title}</Text>
                <Text className="left-52 mt-2 text-sm text-neutral-500">{item.author}</Text>
                <Text className="left-52 text-sm text-neutral-500">{item.genre}</Text>
                <Text className="left-52 text-sm text-neutral-500">stars</Text>
              </View>

            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
