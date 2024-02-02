// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAU6CDUevhdso_KSmb5WHzuxBhxwPuDzNg",

  authDomain: "commfluence-8a3dc.firebaseapp.com",

  projectId: "commfluence-8a3dc",

  storageBucket: "commfluence-8a3dc.appspot.com",

  messagingSenderId: "258142449841",

  appId: "1:258142449841:web:2221615911ef368336f290",

  measurementId: "G-RCTNZKJV3N"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };