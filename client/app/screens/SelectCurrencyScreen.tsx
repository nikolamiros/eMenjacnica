import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  resetCurrency,
  setCurrency,
} from "../redux/slices/findExchangeRateSlice";
import { useAppDispatch } from "../redux/store/configureStore";

interface Currency {
  currency: string;
  flag: any;
  checked: boolean;
}

interface SelectCurrencyscreenProps {
  onClose: () => void;
  onSelectCurrency: (currency: string) => void;
}

const SelectCurrencyScreen: React.FC<SelectCurrencyscreenProps> = ({
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [currencies, setCurrencies] = useState<Currency[]>([
    {
      currency: "EUR",
      flag: require("../../assets/eur.jpg"),
      checked: false,
    },
    {
      currency: "USD",
      flag: require("../../assets/usd.jpg"),
      checked: false,
    },
    {
      currency: "CHF",
      flag: require("../../assets/chf.jpg"),
      checked: false,
    },
    {
      currency: "GBP",
      flag: require("../../assets/gbp.jpg"),
      checked: false,
    },
    {
      currency: "AUD",
      flag: require("../../assets/aud.jpg"),
      checked: false,
    },
  ]);

  const handleCurrencySelect = (index: number) => {
    const updatedCurrencies = currencies.map((item, i) => ({
      ...item,
      checked: i === index,
    }));
    setCurrencies(updatedCurrencies);
    dispatch(setCurrency({ currency: currencies[index].currency }));
    onClose();
  };

  const handleCurrencyClose = () => {
    dispatch(resetCurrency({}));
    onClose();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        <TouchableOpacity
          onPress={handleCurrencyClose}
          className="absolute top-2 right-2 z-10 pt-1 pr-1"
        >
          <AntDesign name="close" size={27} color="black" />
        </TouchableOpacity>
        <Text className="text-3xl font-extrabold ml-2 px-2 my-4 pt-5 pb-2">
          Odaberite valutu
        </Text>
        <View className="py-4 m-2">
          {currencies.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => handleCurrencySelect(index)}
              className="pt-1 pr-1"
            >
              <View className="flex-row items-center py-3 border-b px-2 border-gray-300">
                <View className="flex-row items-center w-3/4">
                  <Image
                    className="w-10 h-10 rounded-full mr-2"
                    source={item.flag}
                  />
                  <Text className="text-center text-xl">{item.currency}</Text>
                </View>
                <View className="flex-row items-center justify-end flex-grow pr-2">
                  {item.checked ? (
                    <AntDesign name="checkcircle" size={25} color="black" />
                  ) : (
                    <AntDesign name="checkcircleo" size={25} color="black" />
                  )}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
        {/* <TouchableOpacity
          onPress={onClose}
          className="absolute bottom-12 right-7 z-10 bg-gray-900 p-4 rounded-lg"
        > */}
        {/* <View className="flex-row justify-center items-center">
            <Text className="text-white text-lg pl-3 pr-3">Odaberite</Text>
          </View> */}
        {/* </TouchableOpacity> */}
      </View>
    </GestureHandlerRootView>
  );
};

export default SelectCurrencyScreen;
