import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'

import {sendEmailVerification, getAuth, signInWithPopup, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,  
    onAuthStateChanged, signInWithPopup, loginWithGoogle} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js'   
    import { GoogleAuthProvider,  } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"

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


login.addEventListener('click', (e) => {
    var email = document.getElementById('emaillog').value;
    var password = document.getElementById('passwordlog').value;

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        alert("Usuario logueado");
        console.log(cred.user)
    }).catch(error => {
        const errorCode = error.code;

        if(errorCode == 'auth/invalid-email')
            alert('El correo no es válido');
        else if(errorCode == 'auth/user-disabled')
            alert('El usuario ha sido deshabilitado');
        else if(errorCode == 'auth/user-not-found')
            alert('El usuario no existe');
        else if(errorCode == 'auth/wrong-password')
            alert('Contraseña incorrecta');

    })
})

cerrar.addEventListener('click', (e) => {
    auth.signOut().then(() =>{
        alert('Sesión cerrada');
    }).catch((error) => {
        alert('Error al cerrar sesión');
    });
})

auth.onAuthStateChanged(user => {
    if (user){
        console.log("Usuario activo");
        var email = user.emailVerified;
        if(email){  
            window.open("https://www.google.com/")

        }else{
            auth.signOut();
        }
    }else{
        console.log("Usuario inactivo");
    }
})
