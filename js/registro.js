
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'

import {sendEmailVerification, getAuth, signInWithPopup, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,  
    onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyD-dMSEicsuDX5J2OpeQKQHjoTyfrpzIW4",
  authDomain: "hackaton-d3eab.firebaseapp.com",
  databaseURL: "https://hackaton-d3eab-default-rtdb.firebaseio.com",
  projectId: "hackaton-d3eab",
  storageBucket: "hackaton-d3eab.firebasestorage.app",
  messagingSenderId: "445047460698",
  appId: "1:445047460698:web:99991b23149304540ad963",
  measurementId: "G-KRWTPL64K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

registro.addEventListener('click', (e) =>{
  var email = document.getElementById('emailreg').value;
  var password = document.getElementById('passwordreg').value; 

  createUserWithEmailAndPassword(auth, email, password).then(cred =>{
    alert("usuario creado");
    sendEmailVerification(auth.currentUser).then(() => {
      alert('Se ha enviado un correo de verificación')
    })
  }).catch(error => {
    const errorCode = error.code;
    if(errorCode == 'auth/email-already-in-use')
      alert('El correo ya está en uso')
    else if(errorCode == 'auth/invalid-email')
      alert('El correo no es válido')
    else if(errorCode == 'auth/weak-password')
      alert('La contraseña debe tener al menos 6 caracteres')

  });
});
