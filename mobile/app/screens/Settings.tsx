import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Footer from 'components/Footer'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useAuthStore } from 'zustand/authStore'
import PageTransition from 'components/PageTransition'

export default function Settings() {

    const logout = useAuthStore((state) => state.logout)

    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)");
    }

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/(tabs)");
        }
    }

    return (
        <View className="flex-1 bg-background">
            <PageTransition>
                <SafeAreaView edges={['top']} className="flex-1">
                    <View className="w-full flex-row items-center border-2">
                        <Pressable onPress={handleBack} className="border-r-2 w-1/6 flex items-center justify-center h-16">
                            <Ionicons name="arrow-back-outline" size={30} color="black" />
                        </Pressable>
                        <View className="w-4/5 flex-row items-center justify-center">
                            <Text className="text-2xl font-bold">Settings</Text>
                        </View>
                    </View>
                    <View className="flex-1 items-center justify-between ">
                        <View className="w-full">
                            <Text className="text-lg font-bold px-4 py-6 border-b-2 border-t-2 w-full ">Authors</Text>
                            <Text className="text-lg font-bold px-4 py-6 border-b-2 w-full ">listen own PDF</Text>
                            <Text className="text-lg font-bold px-4 py-6 border-b-2 w-full ">App Language</Text>
                            <Text className="text-lg font-bold px-4 py-6 border-b-2 w-full ">Notification</Text>
                            <Text className="text-lg font-bold px-4 py-6 border-b-2 w-full ">Privacy Policy</Text>
                            <Text className="text-lg font-bold px-4 py-6 border-b-2 w-full ">Terms of Service</Text>
                            <Text className="text-lg font-bold px-4 py-6 border-b-2 w-full ">Github</Text>
                        </View>
                        <View className="w-full mx-4 my-6 border-b-2c">
                            <Pressable
                                onPress={handleLogout}
                                className={`w-full h-16 bg-org border-2 flex-row items-center justify-center gap-4`}>
                                <Text className="text-black text-2xl font-bold">Log out</Text>
                            </Pressable>
                        </View>
                    </View>
                </SafeAreaView>
            </PageTransition>
            <Footer highlight="home" />
        </View>
    )
}