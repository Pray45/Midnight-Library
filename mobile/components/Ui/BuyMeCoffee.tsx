import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function BuyMeCoffee() {
    return (
        <View className="flex w-full items-center justify-center border-2"
            style={{ backgroundColor: 'rgb(255, 190, 0)', height: 200 }}
        >
            <Text className= "text-4xl font-bold">Read Anytime. Anywhere.</Text>
            <Text className="text-lg">Discover, Read, and Listen to Your Favorite Books.</Text>
            <Pressable className="mt-4 border border-black bg-white w-2/3 flex items-center justify-center py-2.5">
                <Text className="text-black text-3xl ">Buy me a coffee</Text>
            </Pressable>
            <Pressable className="mt-2">
                <Text className="text-black text-sm border-b-2 ">Maybe Later</Text>
            </Pressable>
        </View>
    )
}