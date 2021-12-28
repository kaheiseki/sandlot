import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAn334ADTDl1gYSpQDyzf6dFGgpUlA6Xns",
  authDomain: "sandlot-e5836.firebaseapp.com",
  projectId: "sandlot-e5836",
  storageBucket: "sandlot-e5836.appspot.com",
  messagingSenderId: "947698565979",
  appId: "1:947698565979:web:9e8097dd364c84f269907e",
  measurementId: "G-XEKC41LCER"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {db} ;