import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Title from 'components/Title';
import Horizontal from 'components/Horizontal';
import Vertical from 'components/Vertical';
import books from '../../data.json';
import BuyMeCoffee from 'components/Ui/BuyMeCoffee';

export default function index() {
  const coffee = true;
  return (
    <View className="flex-1 bg-background">
      <SafeAreaView edges={['top']} className="flex-1">
        <Header heading="Midnight Library" />
        <ScrollView className="flex">
          <View className="mt-5">
            {coffee && <BuyMeCoffee />}
            <Title title="Recents" readmore />
            <Horizontal data={books} />
            <Title title="Featured Books" readmore={false} />
            <View className="pl-10">
              <Vertical data={books} scale={0.9} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Footer highlight="home" />
    </View>
  );
}
