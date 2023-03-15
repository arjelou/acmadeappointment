import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkCqBhBg1EDJVeQMOgKrFR0eIFBsWdX5Q",
  authDomain: "acmadescheduler.firebaseapp.com",
  projectId: "acmadescheduler",
  storageBucket: "acmadescheduler.appspot.com",
  messagingSenderId: "75673840872",
  appId: "1:75673840872:web:ef91b78e9d47b416a46d5d",
  measurementId: "G-H5GJ1XMFCX"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);