
//formulario
document.querySelector("form").addEventListener("submit", function(event) {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let dni = document.getElementById("dni").value;
    let telefono = document.getElementById("tel").value;
    let mensaje = document.getElementById("mensaje").value;

    if (nombre === "" || email === "" || dni === "" || telefono === "" || mensaje === "" ) {
        alert("Por favor, completa todos los campos.");
        event.preventDefault(); // Para evitar el envio si hay errores
    }
});