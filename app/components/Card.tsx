import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronRightIcon, MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";

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
  ExchangeOffice: {
    title: string;
    description: string;
    price: number;
    distance: string;
    longitude: number;
    latitude: number;
  };
};

const Card = ({
  title,
  description,
  price,
  distance,
  longitude,
  latitude,
}: {
  title: string;
  description: string;
  price: number;
  distance: string;
  longitude: number;
  latitude: number;
}) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigate("ExchangeOffice", {
      title,
      description,
      price,
      distance,
      longitude,
      latitude,
    });
  };

  useEffect(() => {
    console.log("Price in Card is: ", price);
  }, [price]);

  return (
    <Pressable
      className="flex-row justify-between items-center p-3 border-b border-gray-300"
      onPress={handlePress}
    >
      <View>
        <View className="flex-row items-center">
          <Text className="text-xl font-normal text-gray-800">{title}</Text>
          <Text className="text-base text-gray-500"> • </Text>
          <StarIcon size={15} color="#ffcc00" />
          <Text className="text-sm text-gray-500"> 4.7</Text>
          <Text className="text-sm text-gray-400"> (477) </Text>
        </View>
        <View className="flex-row items-center">
          <MapPinIcon size={18} color="#ff2d54" />
          <Text className="text-gray-500 text-base">{distance} • </Text>
          <Text className="text-gray-500 text-base">{description} </Text>
        </View>

        <View className="flex-row items-center">
          <Text className="text-lg text-gray-800 font-normal mr-3">
            Kurs: {price}
          </Text>
          <View
            className="w-2 h-2 rounded-full mr-1"
            style={{ backgroundColor: "#34c759" }}
          />
          <Text className="text-base text-gray-500">Otvoreno</Text>
        </View>
      </View>
      <ChevronRightIcon size={23} color="#f87171" />
    </Pressable>
  );
};

export default Card;
