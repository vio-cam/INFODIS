// Importamos Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4jD36L8KESG__RpjTxbueQ_mjbv3gVPs",
    authDomain: "grupofundades-34d5b.firebaseapp.com",
    projectId: "grupofundades-34d5b",
    storageBucket: "grupofundades-34d5b.firebasestorage.app",
    messagingSenderId: "1057054291150",
    appId: "1:1057054291150:web:3b92f243fb08364b320c9f"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // autenticacion
export const db = getFirestore(app); // firestore
