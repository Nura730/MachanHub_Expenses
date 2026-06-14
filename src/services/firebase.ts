import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlEKUoyuWlUIQwEPEHNaa1ruzbdXX7aF4",
  authDomain: "machanhub-expenses-dd374.firebaseapp.com",
  projectId: "machanhub-expenses-dd374",
  storageBucket: "machanhub-expenses-dd374.firebasestorage.app",
  messagingSenderId: "581014674513",
  appId: "1:581014674513:web:551d33aa07a9a891a5ec70",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;