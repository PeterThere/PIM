// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcoSDtl4IbyrK-7gUuMJuN0N5Jkg_qqwY",
  authDomain: "bankmeup-edae5.firebaseapp.com",
  projectId: "bankmeup-edae5",
  storageBucket: "bankmeup-edae5.appspot.com",
  messagingSenderId: "845286238247",
  appId: "1:845286238247:web:527bd342c48f20fab7c602",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
