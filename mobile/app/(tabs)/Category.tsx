import Footer from 'components/Footer';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Category() {
  return (
    <SafeAreaView className="h-full w-full flex-1 bg-background">
      <View className="flex-1 items-center justify-center">
        <Text>Category</Text>
      </View>
      <Footer highlight="book" />
    </SafeAreaView>
  );
}
