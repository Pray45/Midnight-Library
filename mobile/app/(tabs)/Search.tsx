import { View, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Vertical from 'components/Vertical';
import books from '../../data.json';
import Title from 'components/Title';

export default function Search() {
  return (
    <View className="flex-1 bg-background">
      <SafeAreaView edges={['top']} className="flex-1">
        <Header heading="Search"/>
        <ScrollView className="flex">

          <View className="py-10 px-6 bg-yel border-b-2 flex-row items-center justify-between">
            <View className="flex-row items-center justify-start pl-4 py-1 border-2  bg-background w-4/5">
              <Ionicons name="search" size={24} color="black" />
              <TextInput className="text-lg ml-2 text-black w-5/6 h-14 mt-1" placeholderTextColor="#000000" placeholder="Search books, authors, genres ..." />
            </View>
            <View className="p-4 border-2 py-4 bg-background">
              <Ionicons name="options" size={24} color="black" />
            </View>
          </View>


          <View className="m-5 ">
            <Title title="Search Results" readmore={false} />
            <Vertical data={books} scale={0.9} />
          </View>

        </ScrollView>
      </SafeAreaView>
      <Footer highlight="search" />
    </View>
  );
}
