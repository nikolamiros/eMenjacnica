import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";

const NotificationsScreen = () => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1">
        <View className="bg-white rounded-lg px-3 pt-4 mb-12">
          <Text className="text-3xl font-extrabold text-gray-950 mb-3">
            Obaveštenja
          </Text>
        </View>
        <View className="bg-white rounded-lg overflow-hidden shadow-md flex-1 justify-center items-center mt-3">
          <Text className="text-xl font-semibold text-gray-950 mb-20">
            Trenutno nemate novih obaveštenja!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
