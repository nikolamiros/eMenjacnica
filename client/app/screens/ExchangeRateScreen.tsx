import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";

const ExchangeRateScreen = () => {
  const items = [
    {
      valuta: "EUR",
      kupovni: "117.00",
      srednji: "117.30",
      prodajni: "118.50",
      flag: require("../../assets/eur.jpg"),
    },
    {
      valuta: "USD",
      kupovni: "99.50",
      srednji: "100.30",
      prodajni: "101.50",
      flag: require("../../assets/usd.jpg"),
    },
    {
      valuta: "CHF",
      kupovni: "119.50",
      srednji: "120.30",
      prodajni: "120.80",
      flag: require("../../assets/chf.jpg"),
    },
    {
      valuta: "GBP",
      kupovni: "150.10",
      srednji: "150.70",
      prodajni: "151.80",
      flag: require("../../assets/gbp.jpg"),
    },
    {
      valuta: "AUD",
      kupovni: "75.10",
      srednji: "78.30",
      prodajni: "80.80",
      flag: require("../../assets/aud.jpg"),
    },
  ];

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1">
        <ScrollView className="bg-white">
          <View className="flex-1 bg-white rounded-lg shadow-md px-3 pt-4 pb-3 mb-12">
            <Text className="text-3xl font-extrabold text-gray-950 mb-3">
              Kursna Lista
            </Text>
            <View className="flex-row bg-gray-100 py-2 mt-3">
              <Text className="w-1/4 text-center font-semibold text-base">
                Valuta
              </Text>
              <Text className="w-1/4 text-center font-semibold text-base">
                Kupovni
              </Text>
              <Text className="w-1/4 text-center font-semibold text-base">
                Srednji
              </Text>
              <Text className="w-1/4 text-center font-semibold text-base">
                Prodajni
              </Text>
            </View>
            {items.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center py-3 border-b border-gray-300"
              >
                <View className="flex-row justify-center items-center w-1/4">
                  <Image
                    className="w-8 h-8 rounded-full mr-2"
                    source={item.flag}
                  />
                  <Text className="text-center text-base">{item.valuta}</Text>
                </View>
                <Text className="w-1/4 text-center text-base">
                  {item.kupovni}
                </Text>
                <Text className="w-1/4 text-center text-base">
                  {item.srednji}
                </Text>
                <Text className="w-1/4 text-center text-base">
                  {item.prodajni}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExchangeRateScreen;
