import { initializeApp,au } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"
import "firebase/firestore"


const firebaseApp = initializeApp({
  apiKey: "AIzaSyAn334ADTDl1gYSpQDyzf6dFGgpUlA6Xns",
  authDomain: "sandlot-e5836.firebaseapp.com",
  projectId: "sandlot-e5836",
  storageBucket: "sandlot-e5836.appspot.com",
  messagingSenderId: "947698565979",
  appId: "1:947698565979:web:9e8097dd364c84f269907e",
  measurementId: "G-XEKC41LCER"
});

const db = getFirestore();
const auth = getAuth();

export {db,auth};