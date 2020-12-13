import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAyLMmtVpHWe3HNfdjFKNozOr2m23oZmeU",
    authDomain: "pointshare-fa064.firebaseapp.com",
    databaseURL: "https://pointshare-fa064.firebaseio.com",
    projectId: "pointshare-fa064",
    storageBucket: "pointshare-fa064.appspot.com",
    messagingSenderId: "148023891115",
    appId: "1:148023891115:web:1d301fffa895fa2a6ed3ee",
    measurementId: "G-5FLMXDRDL0"
};

const app = firebase.default.initializeApp(firebaseConfig);
app.analytics();

export default app;

export const db = app.firestore();