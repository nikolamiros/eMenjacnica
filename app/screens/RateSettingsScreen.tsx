import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";
import {
  setSortPreference,
  setSortSettings,
} from "../redux/slices/findExchangeRateSlice";

interface RateSettingsProps {
  onClose: () => void;
}

const RateSettingsScreen: React.FC<RateSettingsProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const sortPreference = useAppSelector(
    (state) => state.findExchangeRate.sortPreference
  );
  const sortSettings = useAppSelector(
    (state) => state.findExchangeRate.sortSettings
  );

  const [showBestRate, setShowBestRate] = useState(sortPreference === "rate");
  const [showDistance, setShowDistance] = useState(
    sortPreference === "distance"
  );
  const [showOpenOnly, setShowOpenOnly] = useState(sortSettings.openOnly);

  const toggleSwitchBestRate = () => {
    const newStatus = !showBestRate;
    setShowBestRate(newStatus);
    if (newStatus) {
      setShowDistance(false);
      dispatch(setSortPreference("rate"));
    } else if (!showDistance) {
      // Ako se isključuje showBestRate i showDistance nije uključen, podrazumevano uključite showDistance
      setShowDistance(true);
      dispatch(setSortPreference("distance"));
    }
  };

  const toggleSwitchDistance = () => {
    const newStatus = !showDistance;
    setShowDistance(newStatus);
    if (newStatus) {
      setShowBestRate(false);
      dispatch(setSortPreference("distance"));
    } else if (!showBestRate) {
      // Ako se isključuje showDistance i showBestRate nije uključen, podrazumevano uključite showBestRate
      setShowBestRate(true);
      dispatch(setSortPreference("rate"));
    }
  };

  const toggleSwitchOpen = () => {
    dispatch(
      setSortSettings({ ...sortSettings, openOnly: !sortSettings.openOnly })
    );
    setShowOpenOnly((previousState: boolean) => !previousState);
  };

  const handleActionNameClose = () => {
    onClose();
  };

  const applySettings = () => {
    const sortPreferenceValue = showDistance ? "distance" : "rate";
    dispatch(setSortPreference(sortPreferenceValue));
    dispatch(setSortSettings({ ...sortSettings, openOnly: showOpenOnly }));
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
          Filteri
        </Text>

        <View className="py-4 m-2">
          <View className="flex-row justify-between items-center px-2 mb-3 py-3 border-b border-gray-300">
            <Text className="text-xl">Prikaži po najboljem kursu</Text>
            <Switch
              trackColor={{ false: "#a3a3a3", true: "#030712" }}
              thumbColor={showBestRate ? "#f9fafb" : "#f9fafb"}
              ios_backgroundColor="#a3a3a3"
              onValueChange={toggleSwitchBestRate}
              value={showBestRate}
            />
          </View>

          <View className="flex-row justify-between items-center px-2 mb-3 py-3 border-b border-gray-300">
            <Text className="text-xl">Prikaži po udaljenosti</Text>
            <Switch
              trackColor={{ false: "#a3a3a3", true: "#030712" }}
              thumbColor={showDistance ? "#f9fafb" : "#f9fafb"}
              ios_backgroundColor="#a3a3a3"
              onValueChange={toggleSwitchDistance}
              value={showDistance}
            />
          </View>

          <View className="flex-row justify-between items-center px-2 mb-5 py-3 border-b border-gray-300">
            <Text className="text-xl">Prikaži samo otvorene</Text>
            <Switch
              trackColor={{ false: "#a3a3a3", true: "#030712" }}
              thumbColor={showOpenOnly ? "#f9fafb" : "#f9fafb"}
              ios_backgroundColor="#a3a3a3"
              onValueChange={toggleSwitchOpen}
              value={showOpenOnly}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={applySettings}
          className="absolute bottom-12 right-7 z-10 bg-gray-900 p-4 rounded-lg"
        >
          <View className="flex-row justify-center items-center">
            <Text className="text-white text-lg pl-3 pr-3">Primeni</Text>
          </View>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default RateSettingsScreen;
