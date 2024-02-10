import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors({ origin: true }));

interface Currency {
  currencyName: string;
  buyRateAbove: number;
  buyRateUnder: number;
  sellRateAbove: number;
  sellRateUnder: number;
}

interface ExchangeOfficeData {
  currencies: Currency[];
  location: {
    latitude: number;
    longitude: number;
  };
  exchangeOfficeName: string;
  exchangeOfficeAddress: string;
  exchangeOfficeCity: string;
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 1000); // Return distance in meters
}

app.post("/calculateExchange", async (req, res) => {
  try {
    const { action, currency, amount, latitude, longitude } = req.body;
    const exchangeOfficesCollectionRef = admin
      .firestore()
      .collection("exchangeOffices");
    const querySnapshot = await exchangeOfficesCollectionRef.get();

    const exchangeOffices: any[] = [];

    querySnapshot.forEach((doc) => {
      const exchangeOfficeData = doc.data() as ExchangeOfficeData;
      const { latitude: officeLat, longitude: officeLon } =
        exchangeOfficeData.location;
      const distance = calculateDistance(
        latitude,
        longitude,
        officeLat,
        officeLon
      );

      if (distance <= 1000) {
        // Only include exchange offices within 1km
        const currencyData = exchangeOfficeData.currencies.find(
          (c: Currency) =>
            c.currencyName.toLowerCase() === currency.toLowerCase()
        );

        if (currencyData) {
          const rate =
            action === "buy"
              ? amount >= 1000
                ? currencyData.buyRateAbove
                : currencyData.buyRateUnder
              : amount >= 1000
              ? currencyData.sellRateAbove
              : currencyData.sellRateUnder;

          exchangeOffices.push({
            distance,
            rate,
            exchangeOfficeName: exchangeOfficeData.exchangeOfficeName,
            exchangeOfficeAddress: exchangeOfficeData.exchangeOfficeAddress,
            exchangeOfficeCity: exchangeOfficeData.exchangeOfficeCity,
            latitude: officeLat,
            longitude: officeLon,
          });
        }
      }
    });

    if (action === "buy") {
      exchangeOffices.sort((a, b) => a.rate - b.rate); // Sort by lowest rate for buying
    } else {
      exchangeOffices.sort((a, b) => b.rate - a.rate); // Sort by highest rate for selling
    }

    if (exchangeOffices.length > 0) {
      res.status(200).json(exchangeOffices);
    } else {
      res.status(404).json({ error: "No matching exchange offices found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

exports.app = functions.https.onRequest(app);
