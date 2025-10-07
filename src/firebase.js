// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCWxTZNM2u2k6Q3ejmCY6hwIvVHoB22bSQ",
  authDomain: "studyapart.firebaseapp.com",
  projectId: "studyapart",
  storageBucket: "studyapart.firebasestorage.app",
  messagingSenderId: "358098207317",
  appId: "1:358098207317:web:756cfbb99ecb34ec400adc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);