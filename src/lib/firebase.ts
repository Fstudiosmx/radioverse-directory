// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your Firebase project's configuration here
const firebaseConfig = {
  apiKey: "AIzaSyD00pKs8PBZ0OD9sm75PoZGVsw5eQgI4Us",
  authDomain: "radioverse-d7737.firebaseapp.com",
  projectId: "radioverse-d7737",
  storageBucket: "radioverse-d7737.appspot.com",
  messagingSenderId: "778899997627",
  appId: "1:778899997627:web:8c5b8d2e5b8d2e5b8d2e5b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
