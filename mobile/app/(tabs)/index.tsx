import { View, ScrollView } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useAuthStore } from 'zustand/authStore';
import { router } from 'expo-router/build/exports';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Title from 'components/Title';
import Horizontal from 'components/Horizontal';
import Vertical from 'components/Vertical';

export default function index() {
  const logout = useAuthStore((state) => state.logout);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      router.replace('/(auth)');
    }
  }, [loggedIn]);

const books = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self Help',
    cover: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
  },
  {
    id: 2,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    cover: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
  },
  {
    id: 3,
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Thriller',
    cover: 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg',
  },
  {
    id: 4,
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    cover: 'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg',
  },
  {
    id: 5,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'History',
    cover: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
  },
  {
    id: 6,
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    genre: 'Finance',
    cover: 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg',
  },
  {
    id: 7,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Finance',
    cover: 'https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg',
  },
  {
    id: 8,
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    cover: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
  },
  {
    id: 9,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    cover: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
  },
  {
    id: 10,
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    cover: 'https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg',
  },
];

  return (
    <SafeAreaView className="h-full w-full flex-1 bg-background">
      <ScrollView className="flex-1">
        <Header />
        {/* <Button title="Logout" onPress={handleLogout} /> */}
        <View className="mt-5">
          <Title title="Recents" readmore={true} />
          <Horizontal data={books} />
          <Title title="Continue Reading" readmore={false} />
          <Vertical data={books} />
        </View>
      </ScrollView>
      <Footer highlight="home" />
    </SafeAreaView>
  );
};
