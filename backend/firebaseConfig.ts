import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth"; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAMMx-8pwJbaGkkpFQxma85jKlEJ_aEQ6I",
  authDomain: "resippy-1bc93.firebaseapp.com",
  projectId: "resippy-1bc93",
  storageBucket: "resippy-1bc93.firebasestorage.app",
  messagingSenderId: "753201383378",
  appId: "1:753201383378:web:7e18bdb7be39f630552a0b",
  measurementId: "G-QE15PYXHKK"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
  })

export { auth }
module.exports = { auth: auth }

