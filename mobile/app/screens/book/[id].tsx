import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ButtonUI from 'components/Ui/ButtonUI';
import { Ionicons } from '@expo/vector-icons';
import Title from 'components/Title';
import { useLocalSearchParams } from 'expo-router';
import PageTransition from 'components/PageTransition';

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function parseBookParam(value: string | string[] | undefined) {
  const param = readParam(value);

  if (!param) {
    return null;
  }

  try {
    return JSON.parse(param);
  } catch {
    return null;
  }
}

export default function Listen() {
  const { book, cover, title, author } = useLocalSearchParams();

  const Book =
    parseBookParam(book) ??
    (cover || title || author
      ? {
          cover: readParam(cover),
          title: readParam(title),
          author: readParam(author),
        }
      : null);

  return (
    <View className="flex-1 bg-background">
      <PageTransition>
        <SafeAreaView edges={['top']} className="flex-1">
          <ScrollView>
            <Header heading={Book?.title} />
            <View className="p-10">
              <View className="flex-row items-center bg-background">
                <Image source={{ uri: Book?.cover }} className="mb-4 h-48 w-36 border-2" />
                <View className="ml-6 flex justify-center">
                  <Text className="mb-4 text-2xl font-bold">{Book?.title}</Text>
                  <Text className="pt-0.5 text-lg">by {Book?.author}</Text>
                  <Text className="text-md pt-0.5">Genre: {Book?.genre}</Text>
                  <Text className="text-md pt-0.5">language: {Book?.language}</Text>
                  <Text className="text-md pt-0.5">Publishing Year: {Book?.publishingyear}</Text>
                </View>
              </View>

              <View className="mt-4 flex gap-2">
                <ButtonUI title="Buy me a coffee" icon="cafe" link="/listen" color="background" />
                <ButtonUI title="Listen to the book" icon="play" link="/listen" color="org" />
              </View>

              <View className="mt-8 flex-row items-center justify-center border-2 ">
                <Ionicons
                  name="cloud-download-outline"
                  size={32}
                  color="black"
                  className="p-9 pr-12"
                />
                <Ionicons
                  name="bookmark-outline"
                  size={32}
                  color="black"
                  className="border-x-2 px-12 py-9"
                />
                <Ionicons name="list-outline" size={32} color="black" className="p-9 pl-12" />
              </View>

              <View className="mt-8">
                <Title title="Description" readmore={false} />
                <Text className="text-lg">{Book?.description}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </PageTransition>
      <Footer highlight="home" />
    </View>
  );
}
