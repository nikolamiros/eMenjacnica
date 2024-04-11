import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  ArrowRightOnRectangleIcon,
  BellAlertIcon,
  BellIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  CogIcon,
  LanguageIcon,
  PencilIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  ExchangeRate: undefined;
  Favorites: undefined;
  Profile: undefined;
  Results: undefined;
  SelectAction: undefined;
  SelectCurrency: undefined;
};

const ProfileScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("user");
    navigate("Login");
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1">
        <ScrollView>
          <View className="bg-white rounded-lg px-3 pt-4 mb-12">
            <Text className="text-3xl font-extrabold text-gray-950 mb-3">
              Profil
            </Text>
            <View className="flex-row items-center justify-between mb-5 mt-3">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: "https://source.unsplash.com/random/500x500" }}
                  className="w-24 h-24 rounded-full mr-3"
                />
                <View>
                  <Text className="text-gray-950 font-semibold text-xl mb-1">
                    Nikola Mirosavljevic
                  </Text>
                  <View className="flex-row items-center justify-between mb-5">
                    <TouchableOpacity className="bg-iosPink px-5 py-2 rounded-lg flex-row items-center space-x-2">
                      <PencilSquareIcon size={20} color="#fafafa" />
                      <Text className="text-neutral-50 font-bold">
                        Ažuriraj profil
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View className="bg-white rounded-lg shadow-md p-5">
              <Text className="text-gray-950 font-semibold text-lg mb-4">
                O meni
              </Text>
              <Text className="text-gray-700 mb-1">
                Email: nikola.miros85@gmail.com
              </Text>
              <Text className="text-gray-700">Telefon: +381 65 3250800</Text>
            </View>
            <View className="bg-white rounded-lg shadow-md p-5 mt-5">
              <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-400 py-3">
                <View className="flex-row items-center space-x-2">
                  <BellIcon size={20} color="#030712" />
                  <Text className="text-gray-950 font-semibold text-base">
                    Obaveštenja
                  </Text>
                </View>
                <ChevronRightIcon size={20} color="#f87171" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-400 py-3">
                <View className="flex-row items-center space-x-2">
                  <ChatBubbleBottomCenterIcon size={20} color="#030712" />
                  <Text className="text-gray-950 font-semibold text-base">
                    Poruke
                  </Text>
                </View>
                <ChevronRightIcon size={20} color="#f87171" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-400 py-3">
                <View className="flex-row items-center space-x-2">
                  <LanguageIcon size={20} color="#030712" />
                  <Text className="text-gray-950 font-semibold text-base">
                    Jezik
                  </Text>
                </View>
                <ChevronRightIcon size={20} color="#f87171" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-400 py-3">
                <View className="flex-row items-center space-x-2">
                  <QuestionMarkCircleIcon size={20} color="#030712" />
                  <Text className="text-gray-950 font-semibold text-base">
                    Pomoć
                  </Text>
                </View>
                <ChevronRightIcon size={20} color="#f87171" />
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center justify-between border-b border-gray-400 py-3"
                onPress={handleLogout}
              >
                <View className="flex-row items-center space-x-2">
                  <ArrowRightOnRectangleIcon size={20} color="#030712" />
                  <Text className="text-gray-950 font-semibold text-base">
                    Odjavi se
                  </Text>
                </View>
                <ChevronRightIcon size={20} color="#f87171" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;
