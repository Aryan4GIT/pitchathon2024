// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth to initialize Firebase Authentication
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw_EGMtWjk_fzkbv09gO3SaW3zXQuvh5c",
  authDomain: "sihclient.firebaseapp.com",
  projectId: "sihclient",
  storageBucket: "sihclient.appspot.com",
  messagingSenderId: "482808233736",
  appId: "1:482808233736:web:5dcb3d1bc849c4e0f076bd",
  measurementId: "G-KSVYSB97H9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)



