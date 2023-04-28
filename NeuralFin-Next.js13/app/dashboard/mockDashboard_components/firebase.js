// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH8wxV1gy8-AFgui1ChuK63aajqojnNDs",
  authDomain: "neuralfin-3fece.firebaseapp.com",
  projectId: "neuralfin-3fece",
  storageBucket: "neuralfin-3fece.appspot.com",
  messagingSenderId: "856328698547",
  appId: "1:856328698547:web:27a0144562fcb62d0a8ec6",
  measurementId: "G-FTM4P3SCP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };