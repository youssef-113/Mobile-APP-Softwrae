import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDeHodeKFMaV8I7khXkLYi8_QG13jruQoI",
  authDomain: "refaat-b863f.firebaseapp.com",
  projectId: "refaat-b863f",
  storageBucket: "refaat-b863f.firebasestorage.app",
  messagingSenderId: "244959402585",
  appId: "1:244959402585:web:dc9555ccb7011d0af36f48",
  measurementId: "G-RF642Z2C22"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export  {auth, db };