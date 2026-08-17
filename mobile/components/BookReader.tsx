import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Easing,
  runOnJS,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {
  SAMPLE_BOOKS,
  BOOK_THEMES,
  BookItem,
  BookTheme,
  BookPage,
} from '../data/sampleBooks';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type BookReaderProps = {
  activeBook?: BookItem;
  onBackToDashboard?: () => void;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
};

export default function BookReader({
  activeBook,
  onBackToDashboard,
  isFullScreen = false,
  onToggleFullScreen,
}: BookReaderProps) {
  const [selectedBook, setSelectedBook] = useState<BookItem>(
    activeBook || SAMPLE_BOOKS[0]
  );

  useEffect(() => {
    if (activeBook) {
      setSelectedBook(activeBook);
      setCurrentPage(1);
    }
  }, [activeBook]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [theme, setTheme] = useState<BookTheme>(BOOK_THEMES[0]); // Default: Midnight Library Signature
  const [fontSize, setFontSize] = useState<number>(18);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showTocModal, setShowTocModal] = useState<boolean>(false);
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);
  const [fabOpen, setFabOpen] = useState<boolean>(false);

  // Animation values
  const flipProgress = useSharedValue(0);
  const flipDirection = useSharedValue<'next' | 'prev'>('next');
  const fabRotation = useSharedValue(0);
  const [animatingPage, setAnimatingPage] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  const activePageData =
    selectedBook.pages.find((p) => p.pageNumber === currentPage) ||
    selectedBook.pages[0];

  const animatingPageData =
    selectedBook.pages.find((p) => p.pageNumber === animatingPage) ||
    activePageData;

  const toggleFab = () => {
    const nextState = !fabOpen;
    setFabOpen(nextState);
    fabRotation.value = withSpring(nextState ? 1 : 0, {
      damping: 14,
      stiffness: 180,
    });
  };

  const handleNextPage = () => {
    if (currentPage >= selectedBook.totalPages || isFlipping) return;
    setIsFlipping(true);
    flipDirection.value = 'next';
    setAnimatingPage(currentPage);
    flipProgress.value = 0;

    const nextPageNum = currentPage + 1;

    flipProgress.value = withTiming(
      1,
      { duration: 320, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(setCurrentPage)(nextPageNum);
          runOnJS(setIsFlipping)(false);
          flipProgress.value = 0;
        }
      }
    );
  };

  const handlePrevPage = () => {
    if (currentPage <= 1 || isFlipping) return;
    setIsFlipping(true);
    flipDirection.value = 'prev';
    const prevPageNum = currentPage - 1;
    setAnimatingPage(prevPageNum);
    flipProgress.value = 0;

    flipProgress.value = withTiming(
      1,
      { duration: 320, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) {
          runOnJS(setCurrentPage)(prevPageNum);
          runOnJS(setIsFlipping)(false);
          flipProgress.value = 0;
        }
      }
    );
  };

  const jumpToPage = (pageNum: number) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum);
    setShowTocModal(false);
    setFabOpen(false);
  };

  const toggleBookmark = (pageNum: number) => {
    if (bookmarks.includes(pageNum)) {
      setBookmarks(bookmarks.filter((p) => p !== pageNum));
    } else {
      setBookmarks([...bookmarks, pageNum]);
    }
  };

  const isBookmarked = bookmarks.includes(currentPage);

  // Silky smooth paper page slide & fade transition style
  const pageFlipStyle = useAnimatedStyle(() => {
    const isNext = flipDirection.value === 'next';

    const translateX = interpolate(
      flipProgress.value,
      [0, 1],
      [0, isNext ? -SCREEN_WIDTH * 0.8 : SCREEN_WIDTH * 0.8]
    );

    const opacity = interpolate(
      flipProgress.value,
      [0, 0.8, 1],
      [1, 0.85, 0]
    );

    const scale = interpolate(
      flipProgress.value,
      [0, 0.5, 1],
      [1, 0.97, 0.95]
    );

    return {
      transform: [{ translateX }, { scale }],
      opacity,
    };
  });

  const fabIconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(fabRotation.value, [0, 1], [0, 135]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  return (
    <View
      style={{ backgroundColor: theme.bg }}
      className={`flex-1 ${isFullScreen ? 'absolute inset-0 z-50 p-2' : 'p-3'}`}
    >
      <StatusBar hidden={isFullScreen} />

      {/* Realistic Book Display Area */}
      <View className="flex-1 my-1 items-center justify-center relative">
        {/* Hardcover Casing Frame */}
        <View
          style={{
            backgroundColor: theme.coverBorder,
            borderRadius: 18,
            padding: 6,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 10,
          }}
          className="w-full flex-1 relative"
        >
          {/* Stacked Paper Edge Margins */}
          <View
            style={{
              position: 'absolute',
              top: 10,
              bottom: 10,
              left: 2,
              width: 5,
              backgroundColor: theme.pageEdge,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
              opacity: 0.9,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 10,
              bottom: 10,
              right: 2,
              width: 5,
              backgroundColor: theme.pageEdge,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              opacity: 0.9,
            }}
          />

          {/* Bookmark Ribbon */}
          {isBookmarked && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 28,
                width: 14,
                height: 44,
                backgroundColor: theme.accent,
                zIndex: 60,
                borderBottomLeftRadius: 7,
                borderBottomRightRadius: 7,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              }}
            />
          )}

          {/* Book Inner Page Container */}
          <View
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
            }}
            className="w-full flex-1 rounded-xl border-2 overflow-hidden relative"
          >
            {/* Active Base Page Content */}
            <View className="absolute inset-0 p-6 justify-between">
              <View className="flex-1">
                {activePageData?.chapterTitle && (
                  <View className="border-b-2 border-black/10 pb-2 mb-4">
                    <Text
                      style={{ color: theme.accent }}
                      className="text-xs font-bold uppercase tracking-widest text-center"
                    >
                      {activePageData.chapterTitle}
                    </Text>
                  </View>
                )}
                <ScrollView showsVerticalScrollIndicator={false}>
                  {activePageData && (
                    <RenderPageContent
                      page={activePageData}
                      theme={theme}
                      fontSize={fontSize}
                    />
                  )}
                </ScrollView>
              </View>

              {/* Running Footer */}
              <View className="flex-row items-center justify-between border-t-2 border-black/10 pt-3 mt-3">
                <Text style={{ color: theme.subtext }} className="text-xs font-serif italic flex-1 mr-2" numberOfLines={1}>
                  {selectedBook.title}
                </Text>
                <Text style={{ color: theme.subtext }} className="text-xs font-bold tracking-wider">
                  — Page {currentPage} of {selectedBook.totalPages} —
                </Text>
              </View>
            </View>

            {/* Smooth Animated Sliding Page Layer */}
            {isFlipping && (
              <Animated.View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: theme.cardBg, padding: 24, zIndex: 30 },
                  pageFlipStyle,
                ]}
              >
                <View className="flex-1 justify-between">
                  <View className="flex-1">
                    {animatingPageData?.chapterTitle && (
                      <View className="border-b-2 border-black/10 pb-2 mb-4">
                        <Text
                          style={{ color: theme.accent }}
                          className="text-xs font-bold uppercase tracking-widest text-center"
                        >
                          {animatingPageData.chapterTitle}
                        </Text>
                      </View>
                    )}
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {animatingPageData && (
                        <RenderPageContent
                          page={animatingPageData}
                          theme={theme}
                          fontSize={fontSize}
                        />
                      )}
                    </ScrollView>
                  </View>

                  <View className="flex-row items-center justify-between border-t-2 border-black/10 pt-3 mt-3">
                    <Text style={{ color: theme.subtext }} className="text-xs font-serif italic flex-1 mr-2" numberOfLines={1}>
                      {selectedBook.title}
                    </Text>
                    <Text style={{ color: theme.subtext }} className="text-xs font-bold tracking-wider">
                      — Page {animatingPage} of {selectedBook.totalPages} —
                    </Text>
                  </View>
                </View>
              </Animated.View>
            )}

            {/* Touch Tap Page Turn Areas (Left / Right) */}
            <Pressable
              onPress={handlePrevPage}
              className="absolute left-0 top-0 bottom-0 w-1/4 z-40 opacity-20 items-start justify-center pl-3"
            >
              <Ionicons name="chevron-back-circle" size={36} color={theme.text} />
            </Pressable>

            <Pressable
              onPress={handleNextPage}
              className="absolute right-0 top-0 bottom-0 w-1/4 z-40 opacity-20 items-end justify-center pr-3"
            >
              <Ionicons name="chevron-forward-circle" size={36} color={theme.text} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* SINGLE EXPANDABLE FLOATING ACTION BUTTON (FAB) MENU */}
      <View className="absolute bottom-6 right-6 z-50 items-end">
        {/* Expanded Floating Controls Speed-Dial */}
        {fabOpen && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(150)}
            className="mb-3 space-y-2 gap-2 items-end"
          >
            {/* Return to Upload Dashboard Button */}
            {onBackToDashboard && (
              <Pressable
                onPress={() => {
                  onBackToDashboard();
                  setFabOpen(false);
                }}
                className="flex-row items-center px-4 py-2.5 rounded-2xl bg-amber-500 border-2 border-black shadow-lg gap-2"
              >
                <Ionicons name="arrow-back" size={18} color="#1c1917" />
                <Text className="text-xs font-bold text-black">Back to PDF Library</Text>
              </Pressable>
            )}

            {/* Book Selector Toggle Pill */}
            <Pressable
              onPress={() => {
                const nextBookIndex =
                  (SAMPLE_BOOKS.findIndex((b) => b.id === selectedBook.id) + 1) %
                  SAMPLE_BOOKS.length;
                setSelectedBook(SAMPLE_BOOKS[nextBookIndex]);
                setCurrentPage(1);
                setFabOpen(false);
              }}
              className="flex-row items-center px-4 py-2.5 rounded-2xl bg-black border-2 border-amber-500 shadow-lg gap-2"
            >
              <Ionicons name="book-outline" size={18} color="#f59e0b" />
              <Text className="text-xs font-bold text-white">
                Book: {selectedBook.title}
              </Text>
            </Pressable>

            {/* Reading Theme Picker */}
            <Pressable
              onPress={() => {
                setShowThemeModal(true);
                setFabOpen(false);
              }}
              className="flex-row items-center px-4 py-2.5 rounded-2xl bg-black border-2 border-amber-500 shadow-lg gap-2"
            >
              <Ionicons name="color-palette-outline" size={18} color="#f59e0b" />
              <Text className="text-xs font-bold text-white">Themes ({theme.name})</Text>
            </Pressable>

            {/* Font Size Adjusters */}
            <View className="flex-row items-center bg-black border-2 border-amber-500 rounded-2xl px-3 py-1.5 shadow-lg gap-3">
              <Ionicons name="text-outline" size={16} color="#f59e0b" />
              <Pressable
                onPress={() => setFontSize((f) => Math.max(f - 2, 14))}
                className="px-2 py-1 bg-white/20 rounded-lg active:opacity-70"
              >
                <Text className="text-xs font-bold text-white">A-</Text>
              </Pressable>
              <Text className="text-xs font-bold text-amber-400">{fontSize}px</Text>
              <Pressable
                onPress={() => setFontSize((f) => Math.min(f + 2, 26))}
                className="px-2 py-1 bg-white/20 rounded-lg active:opacity-70"
              >
                <Text className="text-xs font-bold text-white">A+</Text>
              </Pressable>
            </View>

            {/* Table of Contents / Chapters */}
            <Pressable
              onPress={() => {
                setShowTocModal(true);
                setFabOpen(false);
              }}
              className="flex-row items-center px-4 py-2.5 rounded-2xl bg-black border-2 border-amber-500 shadow-lg gap-2"
            >
              <Ionicons name="list-outline" size={18} color="#f59e0b" />
              <Text className="text-xs font-bold text-white">Table of Contents</Text>
            </Pressable>

            {/* Bookmark Toggle */}
            <Pressable
              onPress={() => toggleBookmark(currentPage)}
              className="flex-row items-center px-4 py-2.5 rounded-2xl bg-black border-2 border-amber-500 shadow-lg gap-2"
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={18}
                color="#f59e0b"
              />
              <Text className="text-xs font-bold text-white">
                {isBookmarked ? 'Bookmarked' : 'Bookmark Page'}
              </Text>
            </Pressable>

            {/* Full Screen Mode Toggle */}
            {onToggleFullScreen && (
              <Pressable
                onPress={() => {
                  onToggleFullScreen();
                  setFabOpen(false);
                }}
                className="flex-row items-center px-4 py-2.5 rounded-2xl bg-black border-2 border-amber-500 shadow-lg gap-2"
              >
                <Ionicons
                  name={isFullScreen ? 'contract-outline' : 'expand-outline'}
                  size={18}
                  color="#f59e0b"
                />
                <Text className="text-xs font-bold text-white">
                  {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                </Text>
              </Pressable>
            )}
          </Animated.View>
        )}

        {/* Main Circular Trigger FAB */}
        <Pressable
          onPress={toggleFab}
          style={{
            backgroundColor: '#f59e0b',
            borderColor: '#1c1917',
          }}
          className="w-14 h-14 rounded-full border-2 items-center justify-center shadow-xl active:scale-95"
        >
          <Animated.View style={fabIconStyle}>
            <Ionicons name="add" size={32} color="#1c1917" />
          </Animated.View>
        </Pressable>
      </View>

      {/* Reading Themes Selection Modal */}
      <Modal visible={showThemeModal} transparent animationType="fade">
        <Pressable
          onPress={() => setShowThemeModal(false)}
          className="flex-1 bg-black/60 justify-end"
        >
          <Pressable
            style={{ backgroundColor: theme.cardBg }}
            className="p-6 rounded-t-3xl border-t-2 border-black/20"
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text style={{ color: theme.text }} className="text-xl font-bold">
                Reading Themes
              </Text>
              <Pressable onPress={() => setShowThemeModal(false)}>
                <Ionicons name="close-circle" size={26} color={theme.text} />
              </Pressable>
            </View>

            <View className="space-y-3 gap-3">
              {BOOK_THEMES.map((t) => {
                const isSelected = t.id === theme.id;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => {
                      setTheme(t);
                      setShowThemeModal(false);
                    }}
                    style={{
                      backgroundColor: t.bg,
                      borderColor: isSelected ? t.accent : t.border,
                      borderWidth: isSelected ? 2 : 1,
                    }}
                    className="flex-row items-center justify-between p-4 rounded-2xl"
                  >
                    <View className="flex-row items-center space-x-3 gap-3">
                      <View
                        style={{ backgroundColor: t.cardBg, borderColor: t.border }}
                        className="w-10 h-10 rounded-full border items-center justify-center shadow-xs"
                      >
                        <Text style={{ color: t.text }} className="text-sm font-serif font-bold">
                          Aa
                        </Text>
                      </View>
                      <Text style={{ color: t.text }} className="text-base font-bold">
                        {t.name}
                      </Text>
                    </View>

                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={26} color={t.accent} />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Table of Contents Modal */}
      <Modal visible={showTocModal} transparent animationType="slide">
        <Pressable
          onPress={() => setShowTocModal(false)}
          className="flex-1 bg-black/60 justify-end"
        >
          <Pressable
            style={{ backgroundColor: theme.cardBg }}
            className="p-6 rounded-t-3xl border-t-2 border-black/20 max-h-[80%]"
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text style={{ color: theme.text }} className="text-xl font-bold">
                Table of Contents
              </Text>
              <Pressable onPress={() => setShowTocModal(false)}>
                <Ionicons name="close-circle" size={26} color={theme.text} />
              </Pressable>
            </View>

            <ScrollView className="mb-4">
              {selectedBook.chapters.map((ch, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => jumpToPage(ch.startPage)}
                  style={{ borderColor: theme.border }}
                  className="py-4 border-b flex-row justify-between items-center"
                >
                  <Text style={{ color: theme.text }} className="text-base font-medium">
                    {ch.title}
                  </Text>
                  <Text style={{ color: theme.accent }} className="text-sm font-bold">
                    Page {ch.startPage}
                  </Text>
                </Pressable>
              ))}

              {bookmarks.length > 0 && (
                <View className="mt-6">
                  <Text style={{ color: theme.accent }} className="text-xs font-bold uppercase tracking-wider mb-2">
                    Saved Bookmarks
                  </Text>
                  {bookmarks.map((bmPage) => (
                    <Pressable
                      key={bmPage}
                      onPress={() => jumpToPage(bmPage)}
                      style={{ borderColor: theme.border }}
                      className="py-3 border-b flex-row justify-between items-center"
                    >
                      <Text style={{ color: theme.text }} className="text-sm font-medium">
                        Bookmark on Page {bmPage}
                      </Text>
                      <Ionicons name="bookmark" size={18} color={theme.accent} />
                    </Pressable>
                  ))}
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

// Sub-component to format book content with optional Drop-Cap initial on chapter start
function RenderPageContent({
  page,
  theme,
  fontSize,
}: {
  page: BookPage;
  theme: BookTheme;
  fontSize: number;
}) {
  const paragraphs = page.content.split('\n\n');

  return (
    <View className="space-y-4 gap-3">
      {paragraphs.map((paragraph, index) => {
        const isFirstParagraph = index === 0;

        if (page.isChapterStart && isFirstParagraph && paragraph.length > 0) {
          const firstLetter = paragraph.charAt(0);
          const restOfText = paragraph.slice(1);

          return (
            <View key={index} className="flex-row items-start">
              {/* Drop-Cap Initial */}
              <View
                style={{
                  backgroundColor: theme.dropCapBg,
                  borderColor: theme.border,
                }}
                className="mr-3 px-3 py-1 rounded-xl border-2 justify-center items-center"
              >
                <Text
                  style={{
                    color: theme.dropCapText,
                    fontSize: fontSize * 2.2,
                    lineHeight: fontSize * 2.5,
                  }}
                  className="font-serif font-bold"
                >
                  {firstLetter}
                </Text>
              </View>

              <Text
                style={{
                  color: theme.text,
                  fontSize: fontSize,
                  lineHeight: fontSize * 1.5,
                }}
                className="flex-1 font-serif leading-relaxed"
              >
                {restOfText}
              </Text>
            </View>
          );
        }

        return (
          <Text
            key={index}
            style={{
              color: theme.text,
              fontSize: fontSize,
              lineHeight: fontSize * 1.5,
            }}
            className="font-serif leading-relaxed"
          >
            {paragraph}
          </Text>
        );
      })}
    </View>
  );
}
