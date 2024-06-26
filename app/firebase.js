// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt48qvLpqugkvgemqirbBVtiQ7t9HrPPM",
  authDomain: "team-original-app-d39d9.firebaseapp.com",
  projectId: "team-original-app-d39d9",
  storageBucket: "team-original-app-d39d9.appspot.com",
  messagingSenderId: "233585789453",
  appId: "1:233585789453:web:b89814d1a10156faa9a344",
  measurementId: "G-QR6Q54BSTG",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
