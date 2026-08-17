import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import PageTransition from "components/PageTransition";
import BookReader from "components/BookReader";
import PdfUploadDashboard from "components/PdfUploadDashboard";
import { BookItem } from "data/sampleBooks";

export default function Star() {
    const [viewMode, setViewMode] = useState<'dashboard' | 'reader'>('dashboard');
    const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleSelectBook = (book: BookItem) => {
        setSelectedBook(book);
        setViewMode('reader');
    };

    const handleBackToDashboard = () => {
        setViewMode('dashboard');
        setIsFullScreen(false);
    };

    return (
        <View className="flex-1 bg-background">
            <PageTransition key={viewMode}>
                <SafeAreaView edges={isFullScreen ? [] : ['top']} className="flex-1">
                    {!isFullScreen && (
                        <Header
                            heading={
                                viewMode === 'dashboard'
                                    ? "PDF Upload & Library"
                                    : (selectedBook?.title || "PDF Reader")
                            }
                        />
                    )}

                    {viewMode === 'dashboard' ? (
                        <PdfUploadDashboard onSelectBook={handleSelectBook} />
                    ) : (
                        <BookReader
                            activeBook={selectedBook || undefined}
                            onBackToDashboard={handleBackToDashboard}
                            isFullScreen={isFullScreen}
                            onToggleFullScreen={() => setIsFullScreen((prev) => !prev)}
                        />
                    )}
                </SafeAreaView>
            </PageTransition>
            {!isFullScreen && <Footer highlight="star" />}
        </View>
    );
}