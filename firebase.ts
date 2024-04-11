import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5GSP8xu-GrxUnz7HOkidakeUh9hxRAKI",
  authDomain: "emenjacnica-c9c67.firebaseapp.com",
  projectId: "emenjacnica-c9c67",
  storageBucket: "emenjacnica-c9c67.appspot.com",
  messagingSenderId: "186887435866",
  appId: "1:186887435866:web:e0e8f4edc1971a38630a63",
  measurementId: "G-3QXJ7HPR29",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
