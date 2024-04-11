import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
};

const LoginScreen: React.FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        await AsyncStorage.setItem("user", JSON.stringify(response.user));
      } catch (err: any) {
        console.log("got error: ", err.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
          <View className="w-5/6">
            <View className="flex-1 justify-center items-center mb-9">
              <Image
                source={require("../../assets/eMenjacnica-logo.png")}
                className="w-1/2 scale-150"
                resizeMode="contain"
              />
            </View>
            <Text className="text-3xl font-bold text-gray-950 my-4 mt-16">
              Dobro došli!
            </Text>
            <View className="form space-y-2">
              <View className="flex-row items-center space-x-2 block w-full p-4 text-base text-gray-900 border border-gray-700 rounded-lg bg-white mt-3 mb-3">
                <TextInput
                  style={{
                    fontSize: 16,
                  }}
                  placeholder="Email"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  autoCapitalize="none"
                  placeholderTextColor="#030712"
                  onSubmitEditing={Keyboard.dismiss}
                  className="w-full"
                />
              </View>
              <View className="flex-row items-center space-x-2 block w-full p-4 text-base text-gray-900 border border-gray-700 rounded-lg bg-white mb-9">
                <TextInput
                  style={{
                    fontSize: 16,
                  }}
                  secureTextEntry={true}
                  placeholder="Lozinka"
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  placeholderTextColor="#030712"
                  onSubmitEditing={Keyboard.dismiss}
                  className="w-full"
                />
              </View>
              <TouchableOpacity
                className="bg-iosPink py-2 rounded-lg mb-10"
                onPress={handleSubmit}
              >
                <Text className="text-xl font-bold text-center text-white">
                  Uloguj se
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-5 mb-5">
              <TouchableOpacity>
                <Text className="text-center text-rose-500 font-semibold">
                  Zaboravili ste lozinku?
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center space-x-12">
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image
                  source={require("../../assets/icons/google.png")}
                  className="w-10 h-10"
                />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image
                  source={require("../../assets/icons/apple.png")}
                  className="w-10 h-10"
                />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image
                  source={require("../../assets/icons/facebook.png")}
                  className="w-10 h-10"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-center mt-7">
              <Text className="text-gray-600">Nemaš nalog? Kreiraj ga</Text>
              <TouchableOpacity onPress={() => navigate("SignUp")}>
                <Text className="text-rose-500 underline"> OVDE</Text>
              </TouchableOpacity>
              <Text className="text-gray-600">.</Text>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
