// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSUFPZkn3t6MHJImrKbMm8Aik3gSNLaeg",
  authDomain: "genflix-ac196.firebaseapp.com",
  projectId: "genflix-ac196",
  storageBucket: "genflix-ac196.appspot.com",
  messagingSenderId: "272826107732",
  appId: "1:272826107732:web:aa3ca6cc83ba4e0117eac1",
  measurementId: "G-9517NRKXT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();