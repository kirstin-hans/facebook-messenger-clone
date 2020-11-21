import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA5ejSqoJMRrb9zXGlvFQK3vbobwRxMEbM",
  authDomain: "facebook-messenger-clone-98f1f.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-98f1f.firebaseio.com",
  projectId: "facebook-messenger-clone-98f1f",
  storageBucket: "facebook-messenger-clone-98f1f.appspot.com",
  messagingSenderId: "939234055874",
  appId: "1:939234055874:web:27809d6cb277c6d6af0d5b",
  measurementId: "G-65VHFHNDBF",
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

export { db };
