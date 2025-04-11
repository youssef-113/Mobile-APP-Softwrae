// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeH_MdvS4BF7wnrFZVIumU-VaokIgkdYU",
  authDomain: "projecttest-a2dd4.firebaseapp.com",
  projectId: "projecttest-a2dd4",
  storageBucket: "projecttest-a2dd4.firebasestorage.app",
  messagingSenderId: "359486000616",
  appId: "1:359486000616:web:20fb7ebe950f48700a285d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;