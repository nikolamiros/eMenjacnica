import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./app/screens/HomeScreen";
import ExchangeRateScreen from "./app/screens/ExchangeRateScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import useAuth from "./app/hooks/useAuth";
import ResultsScreen from "./app/screens/ResultsScreen";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { BellIcon } from "react-native-heroicons/outline";
import BackButtonHeader from "./app/components/BackButtonHeader";
import SelectActionScreen from "./app/screens/SelectActionScreen";
import SelectCurrencyscreen from "./app/screens/SelectCurrencyScreen";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import ExchangeOfficeScreen from "./app/screens/ExchangeOffice";
import { Provider } from "react-redux";
import { store } from "./app/redux/store/configureStore";
import RateSettingsScreen from "./app/screens/RateSettingsScreen";
import { Platform } from "react-native";
import NotificationsScreen from "./app/screens/NotificationsScreen";
import TransactionsScreen from "./app/screens/TransactionsScreen";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "rgba(255, 45, 85, 0.95)",
        backgroundColor: "rgba(255, 45, 85, 0.95)",
        width: "95%",
        height: 70,
        padding: 5,
        marginTop: 30,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 25,
        fontWeight: "400",
        textAlign: "center",
      }}
      text2Style={{
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center",
        color: "#FFFFFF",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  // tomatoToast: ({ text1: , props }) => (
  //   <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
  //     <Text>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // ),
};

function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ff2d54",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIconStyle: {
          width: 32, // Podešavanje širine ikonica
          height: 32, // Podešavanje visine ikonica
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarLabel: "Pretraga",
          headerTitle: "",
          //headerShown: false,
          headerStyle: {
            borderBottomWidth: 0, // Uklanja border ispod header-a
            elevation: 0, // Specifično za Android, uklanja senku ispod header-a
            shadowOpacity: 0, // Specifično za iOS, uklanja senku ispod header-a
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <View className="mr-4 flex-row">
                <BellIcon size={30} color="black" />
                <TouchableOpacity className="apsolute top-0 right-1">
                  <View className="w-1.5 h-1.5 bg-iosPink rounded-full" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ),
          // headerLeft: () => (
          //   <TouchableOpacity
          //   // onPress={() => {
          //   //   // Dodajte funkcionalnost za prikazivanje hamburger menija
          //   //   navigation.openDrawer();
          //   // }}
          //   >
          //     <View className="ml-4">
          //       <Bars3Icon size={32} color="black" />
          //     </View>
          //   </TouchableOpacity>
          // ),
          tabBarIcon: ({ color, size }) => (
            // <Feather name="home" size={size} color={color} />
            <Fontisto name="search" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="ExchangeRate"
        component={ExchangeRateScreen}
        options={({ navigation }) => ({
          tabBarLabel: "Kursna Lista",
          headerTitle: "",
          headerStyle: {
            borderBottomWidth: 0, // Uklanja border ispod header-a
            elevation: 0, // Specifično za Android, uklanja senku ispod header-a
            shadowOpacity: 0, // Specifično za iOS, uklanja senku ispod header-a
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <View className="mr-4 flex-row">
                <BellIcon size={30} color="black" />
                <TouchableOpacity className="apsolute top-0 right-1">
                  <View className="w-1.5 h-1.5 bg-iosPink rounded-full" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ),
          // headerLeft: () => (
          //   <TouchableOpacity
          //   // onPress={() => {
          //   //   // Dodajte funkcionalnost za prikazivanje hamburger menija
          //   //   navigation.openDrawer();
          //   // }}
          //   >
          //     <View className="ml-4">
          //       <Bars3Icon size={32} color="black" />
          //     </View>
          //   </TouchableOpacity>
          // ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="money-bill-alt" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => ({
          tabBarLabel: "Omiljene",
          headerTitle: "",
          headerStyle: {
            borderBottomWidth: 0, // Uklanja border ispod header-a
            elevation: 0, // Specifično za Android, uklanja senku ispod header-a
            shadowOpacity: 0, // Specifično za iOS, uklanja senku ispod header-a
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <View className="mr-4 flex-row">
                <BellIcon size={30} color="black" />
                <TouchableOpacity className="apsolute top-0 right-1">
                  <View className="w-1.5 h-1.5 bg-iosPink rounded-full" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ),
          // headerLeft: () => (
          //   <TouchableOpacity
          //   // onPress={() => {
          //   //   // Dodajte funkcionalnost za prikazivanje hamburger menija
          //   //   navigation.openDrawer();
          //   // }}
          //   >
          //     <View className="ml-4">
          //       <Bars3Icon size={32} color="black" />
          //     </View>
          //   </TouchableOpacity>
          // ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          tabBarLabel: "Profil",
          headerTitle: "",
          headerStyle: {
            borderBottomWidth: 0, // Uklanja border ispod header-a
            elevation: 0, // Specifično za Android, uklanja senku ispod header-a
            shadowOpacity: 0, // Specifično za iOS, uklanja senku ispod header-a
          },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <View className="mr-4 flex-row">
                <BellIcon size={30} color="black" />
                <TouchableOpacity className="apsolute top-0 right-1">
                  <View className="w-1.5 h-1.5 bg-iosPink rounded-full" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ),
          // headerLeft: () => (
          //   <TouchableOpacity
          //   // onPress={() => {
          //   //   // Dodajte funkcionalnost za prikazivanje hamburger menija
          //   //   navigation.openDrawer();
          //   // }}
          //   >
          //     <View className="ml-4">
          //       <Bars3Icon size={32} color="black" />
          //     </View>
          //   </TouchableOpacity>
          // ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { user } = useAuth();

  if (user) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeStack"
              component={HomeStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Results"
              options={{
                headerLeft: () => <BackButtonHeader />,
                headerTitle: "",
                headerShadowVisible: false,
                //headerTransparent: true,
              }}
              component={ResultsScreen}
            />
            <Stack.Screen
              name="Notifications"
              options={{
                headerLeft: () => <BackButtonHeader />,
                headerTitle: "",
                headerShadowVisible: false,
                //headerTransparent: true,
              }}
              component={NotificationsScreen}
            />
            <Stack.Screen
              name="Transactions"
              options={{
                headerLeft: () => <BackButtonHeader />,
                headerTitle: "",
                headerShadowVisible: false,
                //headerTransparent: true,
              }}
              component={TransactionsScreen}
            />
            <Stack.Screen
              name="ExchangeOffice"
              component={ExchangeOfficeScreen}
            />

            <Stack.Screen
              name="SelectAction"
              options={{
                presentation: "modal",
                ...(Platform.OS === "android"
                  ? { animation: "slide_from_bottom" }
                  : {}),
                headerShown: false,
              }}
            >
              {({ navigation }) => (
                <SelectActionScreen
                  onClose={() => navigation.goBack()} // Zatvaranje modala
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="SelectCurrency"
              options={{
                presentation: "modal",
                ...(Platform.OS === "android"
                  ? { animation: "slide_from_bottom" }
                  : {}),
                headerShown: false,
              }}
            >
              {({ navigation }) => (
                <SelectCurrencyscreen
                  onSelectCurrency={(selectedCurrency) => {
                    navigation.goBack(); // Zatvaranje modala
                  }}
                  onClose={() => navigation.goBack()} // Zatvaranje modala
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="RateSettings"
              options={{
                presentation: "modal",
                ...(Platform.OS === "android"
                  ? { animation: "slide_from_bottom" }
                  : {}),
                headerShown: false,
              }}
            >
              {({ navigation }) => (
                <RateSettingsScreen
                  onClose={() => navigation.goBack()} // Zatvaranje modala
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ animation: "none" }}
          >
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="SignUp"
              options={{ headerShown: false }}
              component={SignUpScreen}
            />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </Provider>
    );
  }
}
