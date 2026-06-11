import Sidebar from 'components/Sidebar';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Vertical from 'components/Vertical';
import books from '../../data.json';
import { router } from 'expo-router/build/exports';

export default function Category() {
  return (
    <SafeAreaView className="h-full w-full flex-1 bg-background">
      <Sidebar />
      <ScrollView className="h-full w-2/3 self-end">
        <View className="m-5 flex-row items-center justify-between">
          <Text className="mb-2 text-2xl font-bold text-black">Category</Text>
          <Pressable
            onPress={() => {
              router.replace('/(tabs)/');
            }}
            className="h-12  w-12 items-center justify-center rounded-full  bg-zinc-500">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>
        <Vertical data={books} scale={0.7} />
      </ScrollView>
    </SafeAreaView>
  );
}
