import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import PageTransition from 'components/PageTransition'

export default function Saved() {
    return (
        <View className="flex-1 bg-background">
            <PageTransition>
                <SafeAreaView edges={['top']} className="flex-1">
                    <Header heading="BookMark" />
                </SafeAreaView>
            </PageTransition>
            <Footer highlight="bookmark" />
        </View>
    )
}