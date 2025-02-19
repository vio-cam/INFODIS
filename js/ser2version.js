//para habilitar la ventana lateral
document.getElementById('openPanel').addEventListener('click', function() {
    document.getElementById('sidePanel').classList.add('active');
    document.body.classList.add('no-scroll'); // Evita que el fondo se desplace
});

document.getElementById('closePanel').addEventListener('click', function() {
    document.getElementById('sidePanel').classList.remove('active');
    document.body.classList.remove('no-scroll'); // Vuelve a permitir el scroll
});
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