import { auth, db } from "../js/config.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

//elementos del formulario
const emailInput = document.getElementById("email");
const nombresInput = document.getElementById("nombres");
const apellidosInput = document.getElementById("apellidos");
const documentoInput = document.getElementById("tipoDocumento");
const identidadInput = document.getElementById("numeroIdentidad");
const paisInput = document.getElementById("paisNacimiento");
const estadoCivilInput = document.getElementById("estadoCivil");
const generoInput = document.getElementById("genero"); 
const numeroInput = document.getElementById("numero");
const nacimientoInput = document.getElementById("nacimiento");
const paisResidenciaInput = document.getElementById("pais");
const discapacidadInput = document.getElementById("discapacidad");
const cvLinkInput = document.getElementById("cvLink");
const editarBtn = document.getElementById("editar");
const guardarBtn = document.getElementById("guardar");
const logoutBtn = document.getElementById("logout");

function toggleEditable(editable) {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach(input => {
        if (input.id !== "email") {
            input.disabled = !editable;
        }
    });
    guardarBtn.disabled = !editable;
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        emailInput.value = user.email; 

        const userDocRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const datos = userDoc.data();
            nombresInput.value = datos.nombres || "";
            apellidosInput.value = datos.apellidos || "";
            documentoInput.value = datos.tipoDocumento || "";
            identidadInput.value = datos.numIdentidad || "";
            generoInput.value = datos.genero || "";
            paisInput.value = datos.paisNacimiento || "";
            estadoCivilInput.value = datos.estadoCivil || "";
            numeroInput.value = datos.numero || "";
            nacimientoInput.value = datos.nacimiento || "";
            paisResidenciaInput.value = datos.pais || "";
            discapacidadInput.value = datos.discapacidad || "";
            cvLinkInput.value = datos.cvLink || ""; 
        }
    } else {
        window.location.href = "../html/login.html"; 
    }
});


editarBtn.addEventListener("click", () => {
    toggleEditable(true);
});

guardarBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert("No estás autenticado.");
        return;
    }

    const userDocRef = doc(db, "usuarios", user.uid);
    try {
        await setDoc(userDocRef, {
            nombres: nombresInput.value,
            apellidos: apellidosInput.value,
            tipoDocumento: documentoInput.value,
            numIdentidad: identidadInput.value,
            genero: generoInput.value,
            paisNacimiento: paisInput.value,
            estadoCivil: estadoCivilInput.value,
            numero: numeroInput.value,
            nacimiento: nacimientoInput.value,
            pais: paisResidenciaInput.value,
            discapacidad: discapacidadInput.value,
            cvLink: cvLinkInput.value
        });

        alert("Datos guardados exitosamente.");
        toggleEditable(false); 
    } catch (error) {
        console.error("Error al guardar datos:", error);
        alert("Error: " + error.message);
    }
});

logoutBtn.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.href = "../html/login.html"; 
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
});
