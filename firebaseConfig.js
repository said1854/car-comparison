import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_APP_MESSAGING_SENDER_ID,
} from "@env";

import { initializeApp } from "firebase/app";
import { initializeAuth, reactNativeLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "car-comparing.firebaseapp.com",
  projectId: "car-comparing",
  storageBucket: "car-comparing.appspot.com",
  messagingSenderId: FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: reactNativeLocalPersistence,
});
