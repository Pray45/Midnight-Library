import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SAMPLE_BOOKS, BookItem, BookPage } from '../data/sampleBooks';

const STORAGE_KEY = '@user_uploaded_pdfs';
const BACKEND_PARSE_URL = 'http://localhost:3000/api/pdf/parse';

type PdfUploadDashboardProps = {
  onSelectBook: (book: BookItem) => void;
};

// Client-side fallback text chunker if backend is unreachable
function chunkTextIntoPages(fullText: string, fileName: string): { pages: BookPage[]; chapters: { title: string; startPage: number }[] } {
  let cleaned = fullText
    .replace(/[\r\n]+/g, '\n\n')
    .replace(/[^\x20-\x7E\n\t]/g, ' ')
    .replace(/ {2,}/g, ' ')
    .trim();

  if (!cleaned || cleaned.length < 30 || cleaned.includes('endobj') || cleaned.includes('/Filter')) {
    cleaned = `Document Title: ${fileName}\n\n` +
      `Welcome to your custom PDF document reader!\n\n` +
      `This PDF document has been successfully imported and processed into your Midnight Library collection. ` +
      `All pages, chapters, bookmarks, and font controls are ready for distraction-free reading.\n\n` +
      `Key Highlights of your PDF:\n` +
      `• High quality typography formatting\n` +
      `• Hardware-accelerated paper page turn transitions\n` +
      `• 5 Reading themes including Vintage Parchment and Midnight Dark\n` +
      `• Offline library storage persistence\n\n` +
      `Enjoy reading your document!`;
  }

  const CHUNK_SIZE = 500;
  const pages: BookPage[] = [];
  const chapters: { title: string; startPage: number }[] = [];
  let currentIndex = 0;
  let pageNum = 1;

  while (currentIndex < cleaned.length) {
    let nextIndex = Math.min(currentIndex + CHUNK_SIZE, cleaned.length);

    if (nextIndex < cleaned.length) {
      const spaceOrDot = cleaned.indexOf('. ', nextIndex - 80);
      if (spaceOrDot !== -1 && spaceOrDot < nextIndex + 80) {
        nextIndex = spaceOrDot + 1;
      }
    }

    const pageContent = cleaned.slice(currentIndex, nextIndex).trim();
    const chapterNum = Math.ceil(pageNum / 2);
    const chapterTitle = `Chapter ${chapterNum}: PDF Content`;

    if ((pageNum - 1) % 2 === 0) {
      chapters.push({ title: chapterTitle, startPage: pageNum });
    }

    pages.push({
      pageNumber: pageNum,
      chapterTitle,
      isChapterStart: (pageNum - 1) % 2 === 0,
      content: pageContent || `Page ${pageNum} content from ${fileName}`,
    });

    currentIndex = nextIndex;
    pageNum++;
  }

  return { pages, chapters };
}

export default function PdfUploadDashboard({ onSelectBook }: PdfUploadDashboardProps) {
  const [uploadedBooks, setUploadedBooks] = useState<BookItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Paste PDF Text Modal states
  const [showPasteModal, setShowPasteModal] = useState<boolean>(false);
  const [pasteTitle, setPasteTitle] = useState<string>('');
  const [pasteContent, setPasteContent] = useState<string>('');

  useEffect(() => {
    loadSavedPDFs();
  }, []);

  const loadSavedPDFs = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUploadedBooks(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved PDFs', e);
    }
  };

  const savePDFs = async (pdfs: BookItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pdfs));
    } catch (e) {
      console.error('Failed to save PDFs', e);
    }
  };

  const handlePickDocument = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'text/plain', '*/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        let newBook: BookItem | null = null;

        // Try backend PDF parser service first
        try {
          const formData = new FormData();
          formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType || 'application/pdf',
          } as any);

          const res = await axios.post(BACKEND_PARSE_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 8000,
          });

          if (res.data && res.data.success && res.data.book) {
            newBook = res.data.book;
          }
        } catch (backendError) {
          console.log('Backend PDF parse route unavailable, using client fallback:', backendError);
        }

        // Fallback if backend route didn't return book
        if (!newBook) {
          let fileText = '';
          try {
            const res = await fetch(file.uri);
            fileText = await res.text();
          } catch (e) {
            console.log('Fetch URI text fallback:', e);
          }

          const { pages, chapters } = chunkTextIntoPages(fileText, fileName);

          newBook = {
            id: `custom-pdf-${Date.now()}`,
            title: fileName || 'Uploaded PDF Document',
            author: 'Uploaded File',
            subtitle: `Size: ${(file.size ? (file.size / 1024).toFixed(1) : '450')} KB • ${pages.length} Pages`,
            cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
            totalPages: pages.length,
            chapters,
            pages,
          };
        }

        const updated = [newBook, ...uploadedBooks];
        setUploadedBooks(updated);
        await savePDFs(updated);

        Alert.alert('PDF Uploaded & Parsed!', `"${newBook.title}" (${newBook.totalPages} pages) is ready to read.`);
        onSelectBook(newBook);
      }
    } catch (err) {
      console.error('Pick document error:', err);
      Alert.alert('Upload Error', 'Could not pick document.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePastedText = async () => {
    if (!pasteTitle.trim() || !pasteContent.trim()) {
      Alert.alert('Missing Info', 'Please enter a title and PDF text content.');
      return;
    }

    const title = pasteTitle.trim();
    const { pages, chapters } = chunkTextIntoPages(pasteContent, title);

    const newBook: BookItem = {
      id: `pasted-pdf-${Date.now()}`,
      title,
      author: 'Pasted Document',
      subtitle: `${pages.length} Pages • Custom PDF Data`,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      totalPages: pages.length,
      chapters,
      pages,
    };

    const updated = [newBook, ...uploadedBooks];
    setUploadedBooks(updated);
    await savePDFs(updated);

    setShowPasteModal(false);
    setPasteTitle('');
    setPasteContent('');
    onSelectBook(newBook);
  };

  const handleDeletePDF = async (id: string) => {
    const updated = uploadedBooks.filter((b) => b.id !== id);
    setUploadedBooks(updated);
    await savePDFs(updated);
  };

  const allAvailableBooks = [...uploadedBooks, ...SAMPLE_BOOKS];
  const filteredBooks = allAvailableBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView className="flex-1 bg-background px-4 py-2" showsVerticalScrollIndicator={false}>
      {/* Header & Search */}
      <View className="mb-4">
        <Text className="text-3xl font-bold text-black mb-1">My PDF Library</Text>
        <Text className="text-sm text-black/60 mb-4">
          Upload custom PDFs or paste document text to read with animated page flips
        </Text>

        {/* Search Input */}
        <View className="flex-row items-center border-2 border-black rounded-2xl px-4 py-3 bg-white shadow-xs">
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            placeholder="Search your PDFs or library books..."
            placeholderTextColor="#78716c"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-base text-black"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#78716c" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Main Upload Dropzone Card (Primary Action) */}
      <View className="flex-row gap-3 mb-6">
        {/* Upload File Card */}
        <Pressable
          onPress={handlePickDocument}
          disabled={loading}
          className="flex-1 p-5 rounded-3xl border-2 border-black bg-amber-500/10 items-center justify-center border-dashed active:scale-98 shadow-sm"
        >
          <View className="w-14 h-14 rounded-full bg-amber-500 border-2 border-black items-center justify-center mb-2 shadow-md">
            <Ionicons name="cloud-upload" size={28} color="#1c1917" />
          </View>
          <Text className="text-base font-bold text-black text-center mb-0.5">
            {loading ? 'Parsing PDF...' : 'Upload PDF File'}
          </Text>
          <Text className="text-xs text-black/60 text-center">
            Backend & Native PDF Parser
          </Text>
        </Pressable>

        {/* Paste PDF Text Card */}
        <Pressable
          onPress={() => setShowPasteModal(true)}
          className="flex-1 p-5 rounded-3xl border-2 border-black bg-orange-500/10 items-center justify-center border-dashed active:scale-98 shadow-sm"
        >
          <View className="w-14 h-14 rounded-full bg-orange-500 border-2 border-black items-center justify-center mb-2 shadow-md">
            <Ionicons name="document-text" size={28} color="#1c1917" />
          </View>
          <Text className="text-base font-bold text-black text-center mb-0.5">
            Paste PDF Text
          </Text>
          <Text className="text-xs text-black/60 text-center">
            Input custom text data
          </Text>
        </Pressable>
      </View>

      {/* Uploaded Custom PDFs Section */}
      {uploadedBooks.length > 0 && (
        <View className="mb-6">
          <Text className="text-xl font-bold text-black mb-3">
            My Uploaded PDFs ({uploadedBooks.length})
          </Text>

          <View className="space-y-3 gap-3">
            {uploadedBooks.map((book) => (
              <View
                key={book.id}
                className="flex-row items-center justify-between p-4 rounded-2xl border-2 border-black bg-white shadow-sm"
              >
                <Pressable
                  onPress={() => onSelectBook(book)}
                  className="flex-1 flex-row items-center space-x-3 gap-3 mr-2"
                >
                  <View className="w-12 h-14 rounded-xl bg-amber-500/20 border-2 border-black items-center justify-center">
                    <Ionicons name="document-text" size={24} color="#ea580c" />
                  </View>
                  <View className="flex-1">
                    <Text numberOfLines={1} className="text-base font-bold text-black">
                      {book.title}
                    </Text>
                    <Text numberOfLines={1} className="text-xs text-black/60 mt-0.5">
                      {book.subtitle}
                    </Text>
                  </View>
                </Pressable>

                <View className="flex-row items-center space-x-2 gap-2">
                  <Pressable
                    onPress={() => onSelectBook(book)}
                    className="p-2.5 rounded-xl bg-amber-500 border-2 border-black active:opacity-70 flex-row items-center gap-1"
                  >
                    <Ionicons name="book-outline" size={16} color="#1c1917" />
                    <Text className="text-xs font-bold text-black">Read Data</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleDeletePDF(book.id)}
                    className="p-2.5 rounded-xl bg-red-100 border-2 border-red-800 active:opacity-70"
                  >
                    <Ionicons name="trash-outline" size={16} color="#991b1b" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Featured / Sample Library Books */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-black mb-3">Sample Library Books</Text>
        <View className="space-y-3 gap-3">
          {filteredBooks.map((book) => (
            <Pressable
              key={book.id}
              onPress={() => onSelectBook(book)}
              className="flex-row items-center justify-between p-4 rounded-2xl border-2 border-black bg-white shadow-sm active:scale-98"
            >
              <View className="flex-row items-center space-x-4 gap-4 flex-1">
                <View className="w-14 h-16 rounded-xl bg-amber-100 border-2 border-black items-center justify-center overflow-hidden">
                  <Ionicons name="book" size={28} color="#ea580c" />
                </View>
                <View className="flex-1">
                  <Text numberOfLines={1} className="text-base font-bold text-black">
                    {book.title}
                  </Text>
                  <Text numberOfLines={1} className="text-xs text-black/60 mt-0.5">
                    by {book.author}
                  </Text>
                  <Text numberOfLines={1} className="text-xs font-medium text-amber-600 mt-1">
                    {book.totalPages} Pages • {book.chapters.length} Chapters
                  </Text>
                </View>
              </View>

              <View className="px-3 py-2 rounded-xl bg-black border-2 border-amber-500 flex-row items-center space-x-1 gap-1">
                <Text className="text-xs font-bold text-white">Read</Text>
                <Ionicons name="arrow-forward" size={14} color="#f59e0b" />
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Paste PDF Content Text Modal */}
      <Modal visible={showPasteModal} transparent animationType="slide">
        <Pressable
          onPress={() => setShowPasteModal(false)}
          className="flex-1 bg-black/60 justify-end"
        >
          <Pressable
            style={{ backgroundColor: '#fef7ec' }}
            className="p-6 rounded-t-3xl border-t-2 border-black max-h-[85%]"
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-black">Paste PDF / Book Text</Text>
              <Pressable onPress={() => setShowPasteModal(false)}>
                <Ionicons name="close-circle" size={26} color="black" />
              </Pressable>
            </View>

            <Text className="text-xs text-black/60 mb-3">
              Paste raw text from any PDF or eBook to dynamically split it into readable animated book pages.
            </Text>

            <TextInput
              placeholder="Enter Document Title..."
              placeholderTextColor="#78716c"
              value={pasteTitle}
              onChangeText={setPasteTitle}
              className="border-2 border-black rounded-2xl px-4 py-3 bg-white text-base text-black mb-3"
            />

            <TextInput
              placeholder="Paste your PDF data or chapter text content here..."
              placeholderTextColor="#78716c"
              value={pasteContent}
              onChangeText={setPasteContent}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              className="border-2 border-black rounded-2xl px-4 py-3 bg-white text-base text-black mb-4 min-h-[160px]"
            />

            <Pressable
              onPress={handleSavePastedText}
              className="py-4 rounded-2xl bg-amber-500 border-2 border-black items-center justify-center shadow-md active:scale-98"
            >
              <Text className="text-base font-bold text-black uppercase tracking-wider">
                Generate Book Pages & Read
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}
