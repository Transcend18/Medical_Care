// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3JfEpb1VT0okTvgNAtzJuc2jsMLskxBg",
  authDomain: "medicapp-249e2.firebaseapp.com",
  databaseURL: "https://medicapp-249e2-default-rtdb.firebaseio.com",
  projectId: "medicapp-249e2",
  storageBucket: "medicapp-249e2.appspot.com",
  messagingSenderId: "230693498244",
  appId: "1:230693498244:web:27dbc6fa5bbced706d01d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)