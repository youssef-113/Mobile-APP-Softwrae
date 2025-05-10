import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBk-eEZr1QZMADQnsBa-nUtM6K7-i9b0HI",
  authDomain: "test2-de05e.firebaseapp.com",
  projectId: "test2-de05e",
  storageBucket: "test2-de05e.firebasestorage.app",
  messagingSenderId: "977805603225",
  appId: "1:977805603225:web:9b599f76854e8178a12308"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export  {auth, db };