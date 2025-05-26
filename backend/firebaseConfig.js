// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence, onAuthStateChanged } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMMx-8pwJbaGkkpFQxma85jKlEJ_aEQ6I",
  authDomain: "resippy-1bc93.firebaseapp.com",
  projectId: "resippy-1bc93",
  storageBucket: "resippy-1bc93.firebasestorage.app",
  messagingSenderId: "753201383378",
  appId: "1:753201383378:web:7e18bdb7be39f630552a0b",
  measurementId: "G-QE15PYXHKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

// const auth = getAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//   })

const auth = getAuth(app);

//admin setup
//var admin = require("firebase-admin");
//
//var serviceAccount = require("./resippy-1bc93-firebase-adminsdk-fbsvc-85c81c7948.json");
//
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

export { auth }
module.exports = { auth: auth }
