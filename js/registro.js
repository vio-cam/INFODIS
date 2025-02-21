import { auth } from "../js/config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const emailInput = document.getElementById("emailreg");
const passwordInput = document.getElementById("passwordreg");
const registerButton = document.getElementById("registro");

registerButton.addEventListener("click", async (e) => {
    e.preventDefault(); 

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado:", userCredential.user);
        window.location.href = "../html/login.html";
    } catch (error) {
        console.error("Error en el registro:", error.message);
        alert("Error: " + error.message);
    }
});
