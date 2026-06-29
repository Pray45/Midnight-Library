import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default function Listen({ Book }: any) {
  const book = Book || {
    "id": 2,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "genre": "Fiction",
    "cover": "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg"
  };
  return (
    <View className="flex-1 bg-background">
      <SafeAreaView edges={['top']} className="flex-1">
        <Header heading={book.title} />
        <View className="flex-1 items-center justify-center">
          <View className="flex-row bg-background">
            <Image source={{ uri: book.cover }} className="w-48 h-64 border-2 mb-4" />
            <>
              <Text className="text-2xl font-bold mb-4">{book.title}</Text>
            </>
          </View>
          </View>
      </SafeAreaView>
      <Footer highlight="home" />
    </View>
  );
}
