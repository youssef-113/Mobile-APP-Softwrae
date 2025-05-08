// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNCaekJRTdm2RQ144GcWfEsFd-h4OVRDA",
  authDomain: "reds-f7f10.firebaseapp.com",
  projectId: "reds-f7f10",
  storageBucket: "reds-f7f10.firebasestorage.app",
  messagingSenderId: "546471659349",
  appId: "1:546471659349:web:d8a9dacfd40a905ef1d1dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export  {auth, db };