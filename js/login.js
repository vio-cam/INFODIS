import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { app } from "../js/config.js"; 
const auth = getAuth(app); 

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form"); 

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const email = document.getElementById("emaillog").value;
        const password = document.getElementById("passwordlog").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario aceptado:", userCredential.user);
            window.location.href = "../html/cv.html"; 
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            alert("Error: " + error.message); 
        }
    });
});


