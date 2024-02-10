import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppDispatch } from "../redux/store/configureStore";
import {
  resetActionName,
  setAction,
  setActionName,
} from "../redux/slices/findExchangeRateSlice";

interface Actions {
  action: string;
  name: string;
  checked: boolean;
}

interface SelectActionsProps {
  onClose: () => void;
}

const SelectActionScreen: React.FC<SelectActionsProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [buyOrSell, setbuyOrSell] = useState<Actions[]>([
    {
      action: "sell",
      name: "Prodaj valutu",
      checked: false,
    },
    {
      action: "buy",
      name: "Kupi valutu",
      checked: false,
    },
  ]);

  const handleActionNameSelect = (index: number) => {
    const updatedActions = buyOrSell.map((item, i) => ({
      ...item,
      checked: i === index,
    }));
    setbuyOrSell(updatedActions);
    dispatch(setAction({ action: buyOrSell[index].action }));
    dispatch(setActionName({ name: buyOrSell[index].name }));
    onClose();
  };

  const handleActionNameClose = () => {
    dispatch(resetActionName({}));
    onClose();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        <TouchableOpacity
          onPress={handleActionNameClose}
          className="absolute top-2 right-2 z-10 pt-1 pr-1"
        >
          <AntDesign name="close" size={27} color="black" />
        </TouchableOpacity>
        <Text className="text-3xl font-extrabold ml-2 px-2 my-4 pt-5 pb-5">
          Odaberite akciju
        </Text>
        <View className="py-4 m-2">
          {buyOrSell.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => handleActionNameSelect(index)}
              className="pt-1 pr-1"
            >
              <View className="flex-row justify-between items-center px-2 mb-3 py-3 border-b border-gray-300">
                <View className="flex-row items-center w-3/4">
                  <Text className="text-center text-xl">{item.name}</Text>
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

export default SelectActionScreen;
