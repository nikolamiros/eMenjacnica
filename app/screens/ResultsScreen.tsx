import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import Card from "../components/Card";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";
import * as Progress from "react-native-progress";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
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
  RateSettings: undefined;
};

const ResultsScreen = () => {
  const dispatch = useAppDispatch();
  const { exchangeRates, isLoadingExchangeRates, sortPreference } =
    useAppSelector((state) => state.findExchangeRate);

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log("isLoadingExchangeRates", isLoadingExchangeRates);
  }, []);

  const sortedAndFilteredExchangeRates = useMemo(() => {
    let filteredRates = exchangeRates;

    if (searchText) {
      filteredRates = filteredRates.filter((rate) =>
        rate.exchangeOfficeName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortPreference === "distance") {
      // Kreiranje kopije niza pre sortiranja
      return [...filteredRates].sort((a, b) => a.distance - b.distance);
    }

    return filteredRates;
  }, [exchangeRates, sortPreference, searchText]);

  if (isLoadingExchangeRates) {
    // Prikazuje se spiner dok se komponenta učitava
    return (
      <View className="flex-1 justify-center bg-white items-center">
        <Progress.CircleSnail
          size={55}
          color={["#ff2d54", "#ff2d54", "#ff2d54"]}
        />
        <Text className="mt-3">
          Pronalazimo najbolje kurseve u vašoj blizini...
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white flex-1">
        <StatusBar barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <Text className="text-3xl font-extrabold text-gray-950 mb-3 px-3 pt-4">
              Najbolji Kursevi
            </Text>
            <View className="p-3 flex-row items-center">
              <View className="flex-row items-center p-3 bg-white rounded-full border border-gray-300 w-5/6 mr-3">
                <MagnifyingGlassIcon size={15} color="#64748b" />
                <TextInput
                  className="flex-1 ml-1"
                  placeholder="Pretraži"
                  placeholderTextColor="#64748b"
                  onChangeText={setSearchText}
                  onSubmitEditing={Keyboard.dismiss}
                  value={searchText}
                />
              </View>
              <TouchableOpacity
                className="rounded-full border p-3 border-gray-300"
                onPress={() => navigate("RateSettings")}
              >
                <AdjustmentsVerticalIcon
                  size={20}
                  color="#64748b"
                  className="mr-2"
                />
              </TouchableOpacity>
            </View>
            <ScrollView className="bg-white">
              {sortedAndFilteredExchangeRates.map((exchangeRate, index) => (
                <View className="shadow-md mt-1" key={index}>
                  <Card
                    title={exchangeRate.exchangeOfficeName}
                    description={`${exchangeRate.exchangeOfficeAddress}, ${exchangeRate.exchangeOfficeCity}`}
                    distance={` ${exchangeRate.distance} m`}
                    price={Number(exchangeRate.rate)}
                    longitude={exchangeRate.longitude}
                    latitude={exchangeRate.latitude}
                  />
                  <Card
                    title={exchangeRate.exchangeOfficeName}
                    description={`${exchangeRate.exchangeOfficeAddress}, ${exchangeRate.exchangeOfficeCity}`}
                    distance={` ${exchangeRate.distance} m`}
                    price={Number(exchangeRate.rate)}
                    longitude={exchangeRate.longitude}
                    latitude={exchangeRate.latitude}
                  />
                  <Card
                    title={exchangeRate.exchangeOfficeName}
                    description={`${exchangeRate.exchangeOfficeAddress}, ${exchangeRate.exchangeOfficeCity}`}
                    distance={` ${exchangeRate.distance} m`}
                    price={Number(exchangeRate.rate)}
                    longitude={exchangeRate.longitude}
                    latitude={exchangeRate.latitude}
                  />
                  <Card
                    title={exchangeRate.exchangeOfficeName}
                    description={`${exchangeRate.exchangeOfficeAddress}, ${exchangeRate.exchangeOfficeCity}`}
                    distance={` ${exchangeRate.distance} m`}
                    price={Number(exchangeRate.rate)}
                    longitude={exchangeRate.longitude}
                    latitude={exchangeRate.latitude}
                  />
                  <Card
                    title={exchangeRate.exchangeOfficeName}
                    description={`${exchangeRate.exchangeOfficeAddress}, ${exchangeRate.exchangeOfficeCity}`}
                    distance={` ${exchangeRate.distance} m`}
                    price={Number(exchangeRate.rate)}
                    longitude={exchangeRate.longitude}
                    latitude={exchangeRate.latitude}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ResultsScreen;
