// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-ODwC59DpG6bQsgv-ZiQTIsuACVCLcIY",
  authDomain: "fasd-fb7b1.firebaseapp.com",
  projectId: "fasd-fb7b1",
  storageBucket: "fasd-fb7b1.firebasestorage.app",
  messagingSenderId: "80540341363",
  appId: "1:80540341363:web:9692b9b912dc33d66c8606"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export  {auth, db };