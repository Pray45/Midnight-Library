import { View, Image, ScrollView, Text, Pressable } from 'react-native';
import { router } from 'expo-router/build/exports';

type VerticalProps = {
  data: any[];
  scale?: number;
};

export default function Vertical({ data, scale = 1 }: VerticalProps) {
  const coverWidth = 176 * scale; // w-44
  const coverHeight = coverWidth * 1.5;
  const cardWidth = 384 * scale; // w-96
  const cardHeight = 160 * scale; // h-40

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
      {data.map((item) => (
        <View key={item.id} className="mb-8 w-48">
          <View className="mr-4 w-48 flex-row items-center gap-3">
            <View className="mb-6 items-center">
              <Pressable
                onPress={() => router.push({ pathname: `/screens/listen/${item.id}`, params: { cover: item.cover, title: item.title, author: item.author } })}
                style={{
                  width: coverWidth,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: '#6b7280',
                  zIndex: 10,
                }}>
                <Image
                  source={{ uri: item.cover }}
                  resizeMode="cover"
                  className="aspect-[2/3] w-full"
                />
              </Pressable>

              <Pressable
                onPress={() => router.push({ pathname: `/screens/listen/${item.id}`, params: { cover: item.cover, title: item.title, author: item.author } })}
                style={{
                  position: 'absolute',
                  left: -24 * scale,
                  bottom: 40 * scale,
                  width: cardWidth,
                  height: cardHeight,
                  padding: 12 * scale,
                  backgroundColor: 'rgba(253,224,71,0.3)',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    left: 208 * scale,
                    width: 144 * scale,
                    fontSize: 20 * scale,
                    fontWeight: '700',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    left: 208 * scale,
                    width: 144 * scale,
                    fontSize: 13 * scale,
                    color: '#6b7280',
                  }}>
                  {item.author}
                </Text>
                <Text
                  style={{
                    left: 208 * scale,
                    width: 144 * scale,
                    fontSize: 13 * scale,
                    color: '#6b7280',
                  }}>
                  {item.genre}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
