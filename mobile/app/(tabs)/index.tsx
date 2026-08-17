import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Title from 'components/Title';
import Horizontal from 'components/Horizontal';
import Vertical from 'components/Vertical';
import { useBookStore } from 'zustand/bookStore';
import BuyMeCoffee from 'components/Ui/BuyMeCoffee';
import PageTransition from 'components/PageTransition';

export default function Index() {

  const randomBooks = useBookStore((state) => state.randomBooks);
  const getRandomBooks = useBookStore((state) => state.getRandomBooks);
  const coffee = true;

  useEffect(() => {
    getRandomBooks();
  }, [getRandomBooks]);

  return (
    <View className="flex-1 bg-background">
      <PageTransition>
        <SafeAreaView edges={['top']} className="flex-1">
          <Header heading="Midnight Library" />
          <ScrollView className="flex">
            <View className="mt-5">
              {coffee && <BuyMeCoffee />}
              <Title title="Recents" readmore />
              <Horizontal data={randomBooks} />
              <Title title="Featured Books" readmore={false} />
              <View className="ml-10 w-full">
                <Vertical data={randomBooks} scale={0.9} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </PageTransition>
      <Footer highlight="home" />
    </View>
  );
}
