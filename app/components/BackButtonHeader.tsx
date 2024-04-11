import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from "react-native";

const BackButtonHeader = () => {
  const navigation = useNavigation();

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-row items-center">
        <TouchableOpacity
          className="flex-row"
          style={{ marginLeft: -15, marginRight: 10 }}
          onPress={handleBackButton}
        >
          <ChevronLeftIcon size={27} color="#ff2d54" />
          <Text className="text-lg text-rose-500 ">Nazad</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default BackButtonHeader;
