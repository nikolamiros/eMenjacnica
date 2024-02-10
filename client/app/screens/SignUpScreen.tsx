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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
};

interface UserData {
  email: string;
  role: string;
}

const SignUpScreen: React.FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("exchangeCustomer");

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Korisnik", value: "exchangeCustomer" },
    { label: "Menjačnica", value: "exchangeOfficer" },
  ]);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        const userData = {
          email: email,
          role: role,
        };

        const docRef = await addDoc(collection(db, "users"), userData);

        console.log("Korisnik uspešno kreiran sa ID-om: ", docRef.id);
      } catch (err: any) {
        console.log("Došlo je do greške: ", err.message);
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
            <Text className="text-3xl font-bold text-gray-700 my-4 mt-16">
              Kreiraj nalog!
            </Text>
            <View className="form space-y-2">
              <View className="mb-5 pt-2 z-40">
                <DropDownPicker
                  open={open}
                  value={role}
                  items={items}
                  setOpen={setOpen}
                  setValue={setRole}
                  setItems={setItems}
                  listMode="SCROLLVIEW"
                />
              </View>
              <View className="flex-row items-center space-x-2 block w-full p-4 text-base text-gray-900 border border-gray-500 rounded-lg bg-white mt-3 mb-3">
                <TextInput
                  style={{
                    fontSize: 16,
                  }}
                  placeholder="Email"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  autoCapitalize="none"
                  placeholderTextColor="#9ca3af"
                  onSubmitEditing={Keyboard.dismiss}
                  className="w-full"
                />
              </View>
              <View className="flex-row items-center space-x-2 block w-full p-4 text-base text-gray-900 border border-gray-500 rounded-lg bg-white mb-9">
                <TextInput
                  style={{
                    fontSize: 16,
                  }}
                  secureTextEntry={true}
                  placeholder="Lozinka"
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  placeholderTextColor="#9ca3af"
                  onSubmitEditing={Keyboard.dismiss}
                  className="w-full"
                />
              </View>

              <TouchableOpacity
                className="bg-iosPink py-2 rounded-lg"
                onPress={handleSubmit}
              >
                <Text className="text-xl font-bold text-center text-white">
                  Registruj se
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-7 mb-5">
              <Text className="text-xl text-gray-700 font-bold text-center py-5">
                ili se registruj preko
              </Text>
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
              <Text className="text-gray-600">Već imaš nalog? Uloguj se</Text>
              <TouchableOpacity onPress={() => navigate("Login")}>
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

export default SignUpScreen;
