import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

const categories = [
  'Fiction',
  'Non-fiction',
  'Sci-fi',
  'Fantasy',
  'Mystery',
  'Romance',
  'Thriller',
  'Biography',
  'History',
  "Children's",
];

const CategoryText = ({ content }: { content: string }) => {
  return (
    <View className="z-100 mb-28 h-24 items-start justify-center">
      <Text
        style={{
          transform: [{ rotate: '-90deg' }],
        }}
        className="absolute -left-6 top-16 w-28 text-center text-lg font-bold text-white">
        {content}
      </Text>
    </View>
  );
};

export default function SidebarWave() {
  const svgHeight = height + 500; // intentionally oversized

  return (
    <SafeAreaView className="absolute left-0 z-10 top-0 h-[1000px] w-16 items-center justify-center">
      <ScrollView
        className="h-full w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}>
        {categories.map((category) => (
          <CategoryText key={category} content={category} />
        ))}
      </ScrollView>

      <View
        style={{ zIndex: -10 }}
        className="absolute h-[1000px] w-16 items-center justify-center bg-black"></View>
      <Svg
        width={120}
        height={svgHeight}
        viewBox={`-15 0 80 ${svgHeight}`}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: -1,
        }}>
        <Path
          fill="black"
          d={`
          M0 0
          H50

          C80 40 80 80 50 120
          C20 160 20 200 50 240

          C80 280 80 320 50 360
          C20 400 20 440 50 480

          C80 520 80 560 50 600
          C20 640 20 680 50 720

          C80 760 80 800 50 840
          C20 880 20 920 50 960

          C80 1000 80 1040 50 1080
          C20 1120 20 1160 50 1200

          C80 1240 80 1280 50 1320
          C20 1360 20 1400 50 1440

          H0
          Z
        `}
        />
      </Svg>
    </SafeAreaView>
  );
}
