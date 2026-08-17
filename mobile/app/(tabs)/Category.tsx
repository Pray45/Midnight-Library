import Sidebar from 'components/Sidebar';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Vertical from 'components/Vertical';
import books from '../../data.json';
import Footer from 'components/Footer';
import PageTransition from 'components/PageTransition';

export default function Category() {
  return (
    <View className="flex-1 bg-background">
      <PageTransition>
        <SafeAreaView className="h-full w-full flex-1 bg-background">
          <Sidebar />
          <ScrollView className="h-full w-2/3 self-end">
            <View className="m-5 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-black">Categories</Text>
            </View>
            <Vertical data={books} scale={0.7} />
          </ScrollView>
        </SafeAreaView>
      </PageTransition>
      <Footer highlight="category" />
    </View>
  );
}
