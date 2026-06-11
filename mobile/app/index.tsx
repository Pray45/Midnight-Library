import { Image, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../zustand/authStore';

export default function NewUser() {
  const [page, setPage] = useState(0);
  const hydrated = useAuthStore((state) => state.hydrated);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  useEffect(() => {
    if (hydrated && loggedIn) {
      router.replace('/(tabs)');
    }
  }, [hydrated, loggedIn]);

  if (!hydrated) {
    return <View className="bg-bgst flex-1" />;
  }

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, 3));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  switch (page) {
    case 0:
      return <FirstPage onNext={nextPage} />;

    case 1:
      return <SecondPage onNext={nextPage} onBack={prevPage} />;

    case 2:
      return <ThirdPage onNext={nextPage} onBack={prevPage} />;

    case 3:
      return <FourthPage onNext={nextPage} onBack={prevPage} />;

    default:
      return <FirstPage onNext={nextPage} />;
  }
}

type PageProps = {
  onNext: () => void;
  onBack?: () => void;
};

function FirstPage({ onNext }: PageProps) {
  return (
    <View className="bg-bgst h-full w-full justify-end">
      <View className="ml-10 flex justify-start">
        <Text className="text-6xl font-bold">Your</Text>
        <Text className="text-6xl font-bold">Bookshelf</Text>
      </View>

      <Image className="h-2/3 w-full" source={require('../assets/INDEX.png')} />

      <View className="flex flex-row items-center justify-around">
        <View className="flex flex-row gap-2">
          <Text className="h-2 w-10 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
        </View>

        <Pressable
          onPress={onNext}
          className="my-12 flex-row rounded-2xl bg-black px-8 py-2.5 text-2xl text-white">
          <Text className="px-3 text-2xl text-white">Next</Text>
          <Ionicons name="arrow-forward" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

function SecondPage({ onNext, onBack }: PageProps) {
  return (
    <View className="bg-bgst h-full w-full justify-end">
      <Pressable onPress={onBack} className="absolute left-6 top-16 z-10">
        <Ionicons name="arrow-back" size={28} color="black" />
      </Pressable>

      <View className="my-10 mr-10 flex w-2/3 items-end self-end">
        <Text className="text-4xl font-bold">Discover books</Text>
        <Text className="text-5xl font-bold">you&apos;ll love.</Text>
      </View>

      <Image className="h-3/5 w-full" source={require('../assets/sunflower2.png')} />

      <View className="flex flex-row items-center justify-around">
        <View className="flex flex-row gap-2">
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-10 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
        </View>

        <Pressable
          onPress={onNext}
          className="my-12 flex-row rounded-2xl bg-black px-8 py-2.5 text-2xl text-white">
          <Text className="px-3 text-2xl text-white">Next</Text>
          <Ionicons name="arrow-forward" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

function ThirdPage({ onNext, onBack }: PageProps) {
  return (
    <View className="bg-bgst h-full w-full justify-end">
      <Pressable onPress={onBack} className="absolute left-6 top-16 z-10">
        <Ionicons name="arrow-back" size={28} color="black" />
      </Pressable>

      <Image className="h-3/5 w-full" source={require('../assets/miss.png')} />

      <View className="my-10 mr-10 flex w-2/3 items-end self-end">
        <Text className="text-5xl font-bold">read Books</Text>
        <Text className="text-4xl font-bold">Anytime Anywhere.</Text>
      </View>

      <View className="flex flex-row items-center justify-around">
        <View className="flex flex-row gap-2">
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-10 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
        </View>

        <Pressable
          onPress={onNext}
          className="my-12 flex-row rounded-2xl bg-black px-8 py-2.5 text-2xl text-white">
          <Text className="px-3 text-2xl text-white">Next</Text>
          <Ionicons name="arrow-forward" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

function FourthPage({ onBack }: PageProps) {
  return (
    <View className="bg-bgst h-full w-full justify-end">
      <Pressable onPress={onBack} className="absolute left-6 top-16 z-10">
        <Ionicons name="arrow-back" size={28} color="black" />
      </Pressable>

      <View className="my-10 ml-10 flex w-2/3 items-start self-start">
        <Text className="text-5xl font-bold">read Books</Text>
        <Text className="text-4xl font-bold">Anytime Anywhere.</Text>
      </View>

      <Image className="h-3/5 w-full" source={require('../assets/book.png')} />

      <View className="flex flex-row items-center justify-around">
        <View className="flex flex-row gap-2">
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-3 rounded-2xl bg-black"></Text>
          <Text className="h-2 w-10 rounded-2xl bg-black"></Text>
        </View>

        <Pressable onPress={() => router.replace('/(auth)')}>
          <Text className="my-12 rounded-2xl bg-black px-8 py-3 text-2xl text-white">
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
