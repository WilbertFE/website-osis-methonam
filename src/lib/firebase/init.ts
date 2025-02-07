import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: "osis-methonam.firebaseapp.com",
  projectId: "osis-methonam",
  storageBucket: "osis-methonam.firebasestorage.app",
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
