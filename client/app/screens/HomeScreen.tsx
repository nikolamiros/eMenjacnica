import {
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  FireIcon,
  MagnifyingGlassIcon,
  CurrencyEuroIcon,
  BanknotesIcon,
  ChevronDownIcon,
} from "react-native-heroicons/outline";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CardFavorite from "../components/CardFavorite";
import { useAppSelector } from "../redux/store/configureStore";
import { useAppDispatch } from "../redux/store/configureStore";
import * as Location from "expo-location";
import {
  getExchangeRates,
  setAmount,
  setLatitude,
  setLongitude,
  setIsLoadingExchangeRates,
} from "../redux/slices/findExchangeRateSlice";

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
  Notifications: undefined;
  Transactions: undefined;
};

const HomeScreen: React.FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const { actionName, currency } = useAppSelector(
    (state) => state.findExchangeRate
  );

  const handleAmountChange = (text: string) => {
    const newAmount = Number(text);
    dispatch(setAmount(newAmount));
  };

  const exchanges = [
    {
      name: "Menjačnica Atelje",
      distance: "764m",
      address: "Svetogorska 20, Beograd",
      rate: "117.50",
      imageUri: "https://.unsplash.com/random/500x500",
    },
    {
      name: "Menjačnica Dok",
      distance: "463m",
      address: "Pariske Komune 3, Beograd",
      rate: "117.50",
      imageUri: "https://source.unsplash.com/random/500x500",
    },
    {
      name: "Menjačnica Vip",
      distance: "200m",
      address: "Kralja Petra 1, Beograd",
      rate: "117.50",
      imageUri: "https://.unsplash.com/random/500x500",
    },
    {
      name: "Menjačnica Trange Frange",
      distance: "1237m",
      address: "Požeška 7, Beograd",
      rate: "117.50",
      imageUri: "https://source.unsplash.com/random/500x500",
    },
    {
      name: "Menjačnica Djoković",
      distance: "821m",
      address: "Milana Jovanovića 12, Beograd",
      rate: "117.50",
      imageUri: "https://source.unsplash.com/random/500x500",
    },
  ];

  async function handleFindExchangeRates() {
    Keyboard.dismiss();

    dispatch(setIsLoadingExchangeRates(true));

    navigate("Results");

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    dispatch(setLongitude(coords.longitude));
    dispatch(setLatitude(coords.latitude));

    dispatch(getExchangeRates());
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white flex-1">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View className="flex-1">
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View className="bg-white rounded-lg px-3 pt-4 mb-12">
                  <Text className="text-3xl font-extrabold text-gray-950 mb-3">
                    Pronađi najbolji kurs
                  </Text>

                  <View className="form space-y-2">
                    <TouchableOpacity onPress={() => navigate("SelectAction")}>
                      <View className="flex-row items-center space-x-2 block w-full p-3 text-base text-gray-900 border border-gray-700 rounded-lg bg-white mt-3">
                        <ArrowPathIcon size={21} color="#030712" />
                        <Text className="text-gray-950 font-semibold text-lg">
                          {actionName || "Odaberite akciju"}
                        </Text>
                        <View className="flex-row items-center justify-end flex-grow pr-2">
                          <ChevronDownIcon size={23} color="#000000" />
                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigate("SelectCurrency")}
                    >
                      <View className="flex-row items-center space-x-2 block w-full p-3 text-base text-gray-900 border border-gray-700 rounded-lg bg-white mt-3 mb-3">
                        <CurrencyEuroIcon size={25} color="#030712" />
                        <Text className="text-gray-950 font-semibold text-lg">
                          {currency || "Odaberite valutu"}
                        </Text>
                        <View className="flex-row items-center justify-end flex-grow pr-2">
                          <ChevronDownIcon size={23} color="#000000" />
                        </View>
                      </View>
                    </TouchableOpacity>

                    <View className="flex-row items-center space-x-2 block w-full p-3 text-base text-gray-900 border border-gray-700 rounded-lg bg-white mt-3 mb-3">
                      <BanknotesIcon size={25} color="#3f3f46" />
                      <TextInput
                        keyboardType="numeric"
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                        }}
                        placeholder="Unesite iznos"
                        placeholderTextColor="#030712"
                        returnKeyLabel="Gotovo"
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        className="w-full"
                        onChangeText={(text) => handleAmountChange(text)}
                      />
                    </View>

                    <View className="flex-1 justify-center items-center">
                      <TouchableOpacity
                        className="bg-iosPink py-3 rounded-lg w-full"
                        onPress={handleFindExchangeRates}
                      >
                        <View className="flex-row justify-center items-center">
                          <MagnifyingGlassIcon size={20} color="#fff" />
                          <Text className="text-white font-extrabold text-lg ml-1">
                            Pretraži
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* <View className="border-t border-gray-300 my-3"></View> */}
                <View className="pl-3 mb-9">
                  <View className="flex-row items-center mb-3 mt-3">
                    <FireIcon size={27} color="#030712" />
                    <Text className="text-3xl font-extrabold text-gray-950 ml-2">
                      Premium Menjačnice
                    </Text>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View
                      className="flex-row items-center shadow-md mx-1 mb-4 justify-center pt-2"
                      style={Platform.OS === "android" ? { elevation: 15 } : {}}
                    >
                      {exchanges.map((exchange, index) => (
                        <CardFavorite key={index} {...exchange} />
                      ))}
                    </View>
                  </ScrollView>
                </View>

                <View className="px-3 pb-3 mb-3">
                  <View className="flex-row items-center shadow-md mb-3">
                    <ArrowsRightLeftIcon size={27} color="#030712" />
                    <Text className="text-3xl font-extrabold text-gray-950 ml-2">
                      Transakcije
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between px-3 pl-2 pt-2 pb-3 bg-white rounded-lg overflow-hidden shadow-2xl m-2 border-b-2 border-gray-100">
                    <View className="flex-row items-center">
                      <View className="space-y-0 w-1/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          07
                        </Text>
                        <Text className="text-xl text-gray-950">apr</Text>
                      </View>
                      <View className="w-3/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          Menjačnica Atelje
                        </Text>
                        <Text className="text-base text-gray-950">
                          Prodaja valute: 1000 EUR
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between px-3 pl-2 pt-2 pb-3 bg-white rounded-lg overflow-hidden shadow-2xl m-2 border-b-2 border-gray-100">
                    <View className="flex-row items-center">
                      <View className="space-y-0 w-1/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          22
                        </Text>
                        <Text className="text-xl text-gray-950">mar</Text>
                      </View>
                      <View className="w-3/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          Menjačnica Atelje
                        </Text>
                        <Text className="text-base text-gray-950">
                          Otkup valute: 200 USD
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between px-3 pl-2 pt-2 pb-3 bg-white rounded-lg overflow-hidden shadow-2xl m-2 border-b-2 border-gray-100">
                    <View className="flex-row items-center">
                      <View className="space-y-0 w-1/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          11
                        </Text>
                        <Text className="text-xl text-gray-950">mar</Text>
                      </View>
                      <View className="w-3/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          Menjačnica Trange Frange
                        </Text>
                        <Text className="text-base text-gray-950">
                          Prodaja valute: 180 EUR
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between px-3 pl-2 pt-2 pb-3 bg-white rounded-lg overflow-hidden shadow-2xl m-2 border-b-2 border-gray-100">
                    <View className="flex-row items-center">
                      <View className="space-y-0 w-1/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          19
                        </Text>
                        <Text className="text-xl text-gray-950">feb</Text>
                      </View>
                      <View className="w-3/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          Menjačnica Vip
                        </Text>
                        <Text className="text-base text-gray-950">
                          Prodaja valute: 100 CHF
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between px-3 pl-2 pt-2 pb-3 bg-white rounded-lg overflow-hidden shadow-2xl m-2 border-b-2 border-gray-100">
                    <View className="flex-row items-center">
                      <View className="space-y-0 w-1/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          02
                        </Text>
                        <Text className="text-xl text-gray-950">feb</Text>
                      </View>
                      <View className="w-3/4">
                        <Text className="text-xl font-semibold text-gray-950">
                          Menjačnica Atelje
                        </Text>
                        <Text className="text-base text-gray-950">
                          Otkup valute: 700 EUR
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="flex-row items-center pl-2 pt-2"
                    onPress={() => navigate("Transactions")}
                  >
                    <Text className="uppercase text-rose-500 mr-1">
                      Pogledaj sve
                    </Text>
                    <ArrowRightIcon size={20} color="#ff2d54" />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
