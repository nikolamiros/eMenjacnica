import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { HeartIcon, MapPinIcon } from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import Toast from "react-native-toast-message";

interface CardFavoriteProps {
  imageUri: string;
  name: string;
  distance: string;
  address: string;
  rate: string;
}

// interface CardFavoriteProps {
//   title: string;
//   description: string;
//   imageUri: string;
// }

const CardFavorite: React.FC<CardFavoriteProps> = ({
  imageUri,
  name,
  distance,
  address,
  rate,
}) => {
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      showToastIsFavorite();
    } else {
      showToastIsNotFavorite();
    }
  };

  const showToastIsFavorite = () => {
    Toast.show({
      type: "success",
      text2: "Dodata u omiljene menjačnice",
      position: "bottom",
      visibilityTime: 3000,
    });
  };

  const showToastIsNotFavorite = () => {
    Toast.show({
      type: "success",
      text2: "Izbačena iz omiljenih menjačnica",
      position: "bottom",
      visibilityTime: 3000,
    });
  };

  const [imageSource, setImageSource] = useState({ uri: imageUri });

  const handleImageError = () => {
    // Postavite podrazumevanu sliku ako učitavanje slike ne uspe
    setImageSource(require("../../assets/images/pig.jpg"));
  };

  return (
    <View className="w-80 relative">
      <Pressable
      // onPress={() => {
      //   navigation.navigate("ExchangeOffice");
      // }}
      >
        <View className="bg-white rounded-lg overflow-hidden border border-gray-100 m-2">
          <Image
            style={{ width: "100%", height: 140, resizeMode: "cover" }}
            source={imageSource}
            onError={handleImageError}
          />
          {/* <View className="p-7 bg-rose-200"></View> */}
          <View className="px-4 py-2 bg-white">
            <Text className="text-xl font-semibold">{name}</Text>
            <View className="flex-row items-center">
              <MapPinIcon size={20} color="#ff2d54" />
              <Text className="text-sm">{distance} • </Text>
              <Text className="text-sm">{address}</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-lg font-semibold">Kurs: {rate}</Text>
              <View className="absolute right-0">
                <Pressable onPress={handleFavoriteClick}>
                  {isFavorite ? (
                    <HeartIconSolid size={30} color="#ff2d54" />
                  ) : (
                    <HeartIcon size={30} color="#ff2d54" />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CardFavorite;
