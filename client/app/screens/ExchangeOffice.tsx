import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ClockIcon,
  HeartIcon as HeartIconOutline,
  MapPinIcon,
  QrCodeIcon,
} from "react-native-heroicons/outline";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import MapComponent from "../components/MapComponent";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppSelector } from "../redux/store/configureStore";
import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus,
} from "expo-barcode-scanner";
import { Platform } from "react-native";

const ExchangeOfficeScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { amount, actionName, currency } = useAppSelector(
    (state) => state.findExchangeRate
  );

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [showNewButton, setShowNewButton] = useState(false);
  const [seconds, setSeconds] = useState(30 * 60); // 30 minuta u sekundama
  const [timeString, setTimeString] = useState("30:00"); // Format vremena
  const [timer, setTimer] = useState<number | null>(null);
  const [qrScanned, setQrScanned] = useState(false);

  const isIOS = Platform.OS === "ios";

  useEffect(() => {
    // Kad se komponenta unmountuje, zaustavite tajmer
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  useEffect(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    setTimeString(
      `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`
    );
  }, [seconds]);

  const navigation = useNavigation();
  const {
    params: { title, description, price, distance, longitude, latitude },
  } = useRoute() as {
    params: {
      title: string;
      description: string;
      imageUri: string;
      price: number;
      distance: number;
      longitude: number;
      latitude: number;
    };
  };

  useEffect(() => {
    console.log("Price in Card is: ", price);
  }, [price]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const startTimer = () => {
    return setInterval(() => {
      setSeconds((currentSeconds) => {
        if (currentSeconds > 0) {
          return currentSeconds - 1;
        } else {
          clearInterval(timer as number); // Koristite 'as number' da bi se pretpostavilo da je timer tipa 'number'
          return 0;
        }
      });
    }, 1000) as unknown as number; // Ovako konvertujete povratni tip u 'number'
  };

  const handleChange = () => {
    setShowNewButton(true);

    const newSeconds = 30 * 60;
    setSeconds(newSeconds);

    if (timer !== null) {
      clearInterval(timer);
    }

    const newTimer = startTimer();
    setTimer(newTimer);
  };

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

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    setScannerVisible(false);
    setQrScanned(true); // Dodajte ovu liniju

    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }

    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    // Obradite podatke QR koda
  };

  if (scannerVisible) {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View
        style={{
          width: "80%",
          aspectRatio: 1,
          overflow: "hidden",
          borderRadius: 10,
          marginBottom: 40,
          flex: 1,
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1 }}
        />
        {scanned && (
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text>Tapnite za ponovno skeniranje</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setScannerVisible(false)}>
          <Text>Zatvori kameru</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}> */}
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-white">
        <View className="flex-1 ">
          <MapComponent
            exchangeOfficelLongitude={longitude}
            exchangeOfficelLatitude={latitude}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className={`absolute ${
              isIOS ? "top-12" : "top-5"
            } left-3 p-2 border border-gray-200 bg-white rounded-full shadow-md`}
          >
            <ArrowLeftIcon size={25} color="#ff2d54" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFavoriteClick}
            className={`absolute ${
              isIOS ? "top-12" : "top-5"
            } right-3 p-2 bg-white border border-gray-200 rounded-full shadow-md`}
          >
            {isFavorite ? (
              <HeartIconSolid size={25} color="#ff2d54" />
            ) : (
              <HeartIconOutline size={25} color="#ff2d54" />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1">
          <View className="pt-5 px-2 w-full">
            <Text className="text-3xl font-extrabold text-gray-950">
              {title}
            </Text>

            <View className="flex-row items-center">
              <MapPinIcon size={20} color="#ff2d54" />
              <Text className="text-gray-600 text-base">{distance} • </Text>
              <Text className="text-gray-600 text-base">{description} </Text>
            </View>
            <View className="flex-1 justify-center items-center mt-5 mb-7">
              {showNewButton ? (
                <TouchableOpacity
                  className="py-3 bg-iosPink rounded-lg w-full"
                  onPress={() => setScannerVisible(true)}
                >
                  <View className="flex-row justify-center items-center">
                    <QrCodeIcon size={20} color="#fff" />
                    <Text className="text-white font-bold text-lg ml-1">
                      Skeniraj QR kod
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-iosPink py-3 rounded-lg w-full"
                  onPress={() => handleChange()}
                >
                  <View className="flex-row justify-center items-center">
                    <ArrowPathIcon size={20} color="#fff" />
                    <Text className="text-white font-bold text-lg ml-1">
                      Promeni
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View className="p-4 bg-white rounded-lg border border-gray-100 shadow-md">
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-lg mb-1 font-bold text-gray-800">
                    Kurs: {price.toFixed(2)}
                  </Text>
                  {actionName === "Prodaj valutu" && (
                    <Text className="text-gray-500">
                      Prodajete {amount} {currency}
                    </Text>
                  )}
                  {actionName === "Kupi valutu" && (
                    <Text className="text-gray-500">
                      Kupujete {amount} {currency}
                    </Text>
                  )}
                </View>
                <View className="items-end">
                  <Text className="text-lg font-bold text-gray-800">
                    {new Intl.NumberFormat("sr-RS", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                    }).format(amount * price)}{" "}
                    RSD
                  </Text>
                  {actionName === "Prodaj valutu" && (
                    <Text className="text-sm text-gray-500">
                      Iznos koji dobijate
                    </Text>
                  )}
                  {actionName === "Kupi valutu" && (
                    <Text className="text-sm text-gray-500">
                      Iznos koji plaćate
                    </Text>
                  )}
                </View>
              </View>
              <View className="mt-4 p-4 bg-gray-100 rounded-lg">
                {qrScanned ? (
                  <Text className="text-sm text-gray-800">
                    Vaša transakcija u {title} je evidentirana.
                  </Text>
                ) : showNewButton ? (
                  <View>
                    <View className="flex-row justify-center items-center">
                      <ClockIcon size={25} color="black" />
                      <Text className="text-2xl text-center ml-1 font-bold text-gray-800">
                        {timeString}
                      </Text>
                    </View>
                    <Text className="text-sm text-gray-800">
                      Skenirajte QR kod koji se nalazi u {title} kako bi Vaša
                      transakcija bila uspešno evidentirana.
                    </Text>
                  </View>
                ) : (
                  <Text className="text-sm text-gray-800">
                    Klikom na dugme Promeni, prihvatate ponuđeni kurs. {title}{" "}
                    Vam garantuje kurs 30 minuta. Posle obavljene transakcije
                    skenirajte QR kod.
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* </SafeAreaView> */}
    </GestureHandlerRootView>
  );
};

export default ExchangeOfficeScreen;
