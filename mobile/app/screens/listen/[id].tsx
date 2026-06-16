import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import Button from '../../../components/Ui/Button';
import { useLocalSearchParams } from 'expo-router';

export default function Listen() {
  const { cover, title, author } = useLocalSearchParams();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: '#FFF5E5',
      }}>
      <View className="h-[550px] w-full items-center rounded-b-[80px] border-x-2 border-b-2 bg-[#FFE3BF] ">
        <View className="w-full flex-row justify-between px-8 pb-8 pt-14">
          <Button icon="arrow-back" link="/(tabs)/" />
          <Pressable
            onPress={() => setSidebarVisible(!sidebarVisible)}
            className="z-100 h-12  w-12 items-center justify-center  rounded-full bg-zinc-500">
            <Ionicons name="grid-outline" size={24} color="white" />
          </Pressable>
        </View>

        <View className="h-3/4 w-1/2 self-center justify-self-center overflow-hidden rounded-xl">
          <Image
            source={{ uri: cover as string }}
            resizeMode="cover"
            className="aspect-[2/3] w-full border-2 border-neutral-300 bg-neutral-200"
          />
          <Text className="mt-4 text-center text-2xl font-bold text-black">{title}</Text>
          <Text className="text-center text-lg font-medium text-zinc-500">{author}</Text>
        </View>

        <View className="absolute bottom-[-40] h-20 w-1/2 flex-row items-center justify-between gap-5 self-center rounded-full bg-black px-3">
          <View className="rounded-full bg-white p-3">
            <Ionicons name="play-outline" size={24} color="black" />
          </View>
          <Text className="mr-8 text-lg font-bold text-white">Listen Now</Text>
        </View>
      </View>

      <View className="mt-20 px-8">
        <Text className="mb-4 text-2xl font-bold text-black">Description</Text>
        <Text className="text-base font-medium text-zinc-500">
          Atomic Habits is a self-help book written by James Clear that explores the power of small
          habits and how they can lead to significant personal and professional growth. The book
          provides practical strategies for building good habits, breaking bad ones, and making
          lasting changes in one&apos;s life. Clear emphasizes the importance of focusing on systems
          rather than goals, and he offers actionable advice on how to create an environment that
          supports positive behavior change. With its engaging storytelling and evidence-based
          insights, Atomic Habits has become a popular resource for individuals looking to improve
          their habits and achieve their goals.Atomic Habits is a self-help book written by James
          Clear that explores the power of small habits and how they can lead to significant
          personal and professional growth. The book provides practical strategies for building good
          habits, breaking bad ones, and making lasting changes in one&apos;s life. Clear emphasizes the
          importance of focusing on systems rather than goals, and he offers actionable advice on
          how to create an environment that supports positive behavior change. With its engaging
          storytelling and evidence-based insights, Atomic Habits has become a popular resource for
          individuals looking to improve their habits and achieve their goals.Atomic Habits is a
          self-help book written by James Clear that explores the power of small habits and how they
          can lead to significant personal and professional growth. The book provides practical
          strategies for building good habits, breaking bad ones, and making lasting changes in
          one&apos;s life. Clear emphasizes the importance of focusing on systems rather than goals, and
          he offers actionable advice on how to create an environment that supports positive
          behavior change. With its engaging storytelling and evidence-based insights, Atomic Habits
        </Text>
      </View>
    </ScrollView>
  );
}