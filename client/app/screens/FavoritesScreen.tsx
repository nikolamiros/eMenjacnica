import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";

const FavoriteScreen = () => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1">
        <View className="bg-white rounded-lg px-3 pt-4 mb-12">
          <Text className="text-3xl font-extrabold text-gray-950 mb-3">
            Omiljene
          </Text>
        </View>
        <View className="bg-white rounded-lg overflow-hidden shadow-md flex-1 justify-center items-center mt-3">
          <Text className="text-xl font-semibold text-gray-950 mb-20">
            Trenutno nemate omiljene menjačnice!
          </Text>
        </View>
      </View>
      {/* Card */}
      {/* <View className="m-4 p-4 bg-white rounded-lg shadow-md">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-800">
              Menjacnica Atelje
            </Text>
            <Text className="text-gray-500">Transakcija</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-800">$5,634.12</Text>
            <Text className="text-sm text-gray-500">Stanje računa</Text>
          </View>
        </View>
        <View className="mt-4 p-4 bg-rose-100 rounded-lg">
          <Text className="text-sm text-rose-500">Prethodne transakcije</Text>
        </View>
      </View> */}
      {/* Header */}
      {/* <View className="bg-purple-600 p-4 rounded-b-3xl">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity>
            <Text className="text-white font-bold">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">13.45</Text>
          <TouchableOpacity>
            <Text className="text-white font-bold">...</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          <Text className="text-white text-lg">Budget</Text>
          <Text className="text-white text-3xl font-bold">$ 3000</Text>
          <TouchableOpacity>
            <Text className="text-white text-opacity-60 text-sm underline">
              Change Budget
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-evenly mt-4">
          <TouchableOpacity className="bg-white py-2 px-4 rounded-full shadow-md">
            <Text className="text-purple-600 font-bold">Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white py-2 px-4 rounded-full shadow-md">
            <Text className="text-purple-600 font-bold">Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white py-2 px-4 rounded-full shadow-md">
            <Text className="text-purple-600 font-bold">Daily</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default FavoriteScreen;
