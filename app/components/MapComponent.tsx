import React, { useState, useEffect, useRef } from "react";
import { View, Platform } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import { useAppSelector } from "../redux/store/configureStore";
import { MaterialIcons } from "@expo/vector-icons";

const MapComponent = ({
  exchangeOfficelLongitude,
  exchangeOfficelLatitude,
}: {
  exchangeOfficelLongitude: number;
  exchangeOfficelLatitude: number;
}) => {
  const { longitude, latitude } = useAppSelector(
    (state) => state.findExchangeRate
  );
  const mapRef = useRef<MapView>(null);

  const [mapReady, setMapReady] = useState(false); // Dodajte stanje za praćenje spremnosti mape

  useEffect(() => {
    if (
      !latitude ||
      !longitude ||
      !exchangeOfficelLatitude ||
      !exchangeOfficelLongitude
    )
      return;

    if (mapReady) {
      // Dodajte uslov da se fitToSuppliedMarkers pozove kada je mapa spremna
      if (mapRef.current) {
        mapRef.current.fitToSuppliedMarkers(
          ["currentLocation", "exchangeOffice"],
          {
            edgePadding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
          }
        );
      }
    }
  }, [
    latitude,
    longitude,
    exchangeOfficelLongitude,
    exchangeOfficelLatitude,
    mapReady,
  ]);

  return (
    <View className="flex-1 border-b border-gray-200">
      <MapView
        ref={mapRef}
        className="flex-1"
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={false}
        onMapReady={() => setMapReady(true)} // Postavite mapReady na true kada je mapa spremna
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          identifier="currentLocation"
        />
        <Marker
          coordinate={{
            latitude: exchangeOfficelLatitude,
            longitude: exchangeOfficelLongitude,
          }}
          identifier="exchangeOffice"
        />
      </MapView>
    </View>
  );
};

export default MapComponent;
