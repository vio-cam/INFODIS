import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4jD36L8KESG__RpjTxbueQ_mjbv3gVPs",
    authDomain: "grupofundades-34d5b.firebaseapp.com",
    projectId: "grupofundades-34d5b",
    storageBucket: "grupofundades-34d5b.firebasestorage.app",
    messagingSenderId: "1057054291150",
    appId: "1:1057054291150:web:3b92f243fb08364b320c9f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, query, orderBy, onSnapshot };