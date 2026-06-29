import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Saved() {
    return (
        <View className="flex-1 bg-background">
            <SafeAreaView edges={['top']} className="flex-1">
                <Header heading="BookMark" />
            </SafeAreaView>
            <Footer highlight="bookmark" />
        </View>
    )
}