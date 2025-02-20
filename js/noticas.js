import { db, collection, addDoc, query, orderBy, onSnapshot } from "../js/config.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("post-container");
    const filterItems = document.querySelectorAll(".filter-item");

    let noticiasData = [];

    // Cargar y mostrar noticias
    async function cargarNoticias() {
        try {
            const response = await fetch("../assets/json/noticias.json");
            noticiasData = await response.json();
            renderNoticias("all");
        } catch (error) {
            console.error("Error cargando noticias:", error);
        }
    }

    function renderNoticias(filtro) {
        if (!container) return;
        container.innerHTML = "";

        noticiasData
            .filter(noticia => filtro === "all" || noticia.filtro === filtro)
            .forEach(noticia => {
                const post = document.createElement("div");
                post.classList.add("post-box", noticia.filtro);
                if (noticia.url) post.setAttribute("data-url", noticia.url);

                post.innerHTML = `
                    <img src="${noticia.imagen}" alt="${noticia.titulo}" class="post-img">
                    <h2 class="category">${noticia.categoria}</h2>
                    <a href="post-page.html?id=${encodeURIComponent(noticia.titulo)}" class="post-title">${noticia.titulo}</a>
                    <span class="post-date">${noticia.fecha}</span>
                    <p class="post-description">${noticia.descripcion}</p>
                `;

                container.appendChild(post);
            });

        activarOportunidades();
    }

    function activarOportunidades() {
        document.querySelectorAll(".post-box.oportunidades").forEach(post => {
            post.addEventListener("click", () => {
                const url = post.getAttribute("data-url");
                if (url) window.open(url, "_blank");
            });
        });
    }

    // Cargar una noticia en post-page.html
    async function mostrarNoticia() {
        const params = new URLSearchParams(window.location.search);
        const noticiaId = params.get("id");
        const postContent = document.getElementById("post-content");

        if (!noticiaId || !postContent) {
            postContent.innerHTML = "<p>No se encontró la noticia.</p>";
            return;
        }

        try {
            const response = await fetch("../assets/json/noticias.json");
            const data = await response.json();
            const noticia = data.find(n => n.titulo === decodeURIComponent(noticiaId));

            if (!noticia) {
                postContent.innerHTML = "<p>No se encontró la noticia.</p>";
                return;
            }

            document.getElementById("post-title").textContent = noticia.titulo;
            document.getElementById("post-image").src = noticia.imagen;
            document.getElementById("post-image").alt = noticia.titulo;

            let contenidoHTML = `<span class="post-date">${noticia.fecha}</span>`;
            noticia.contenido?.forEach(seccion => {
                contenidoHTML += `
                    ${seccion.intro ? `<p>${seccion.intro}</p>` : ""}
                    ${seccion.subtitulo ? `<h2>${seccion.subtitulo}</h2>` : ""}
                    ${seccion.info ? `<p>${seccion.info}</p>` : ""}
                    ${seccion.subtitulo2 ? `<h3>${seccion.subtitulo2}</h3>` : ""}
                    ${seccion.info2 ? `<p>${seccion.info2}</p>` : ""}
                `;
            });

            postContent.innerHTML = contenidoHTML;
            cargarComentarios(noticia.titulo);
        } catch (error) {
            console.error("Error cargando noticia:", error);
        }
    }

    // Cargar comentarios desde Firestore
    function cargarComentarios(idArticulo) {
        const comentariosContainer = document.getElementById("comentarios");
        comentariosContainer.innerHTML = "<p>Cargando comentarios...</p>";

        const comentariosRef = collection(db, "Comentarios", idArticulo, "comentarios");
        const q = query(comentariosRef, orderBy("fecha", "desc"));

        onSnapshot(q, (snapshot) => {
            comentariosContainer.innerHTML = snapshot.empty
                ? "<p>No hay comentarios aún. Sé el primero en comentar.</p>"
                : snapshot.docs.map(doc => {
                    const { nombre, mensaje, fecha } = doc.data();
                    return `
                        <div class="comentario">
                            <strong>${nombre}</strong>
                            <p>${mensaje}</p>
                            <span class="fecha">${new Date(fecha.toMillis()).toLocaleString()}</span>
                        </div>
                    `;
                }).join("");
        });
    }

    // Enviar nuevo comentario
    document.getElementById("formComentario")?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const idArticulo = params.get("id");
        const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
        const mensajeComentario = document.getElementById("mensajeComentario").value.trim();

        if (!idArticulo || !nombreUsuario || !mensajeComentario) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const comentariosRef = collection(db, "Comentarios", idArticulo, "comentarios");
            await addDoc(comentariosRef, {
                nombre: nombreUsuario,
                mensaje: mensajeComentario,
                fecha: new Date()
            });

            document.getElementById("formComentario").reset();
        } catch (error) {
            console.error("Error al agregar comentario:", error);
            alert("Hubo un error al enviar tu comentario.");
        }
    });

    // Eventos de filtrado de noticias
    filterItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".active-filter")?.classList.remove("active-filter");
            item.classList.add("active-filter");
            renderNoticias(item.getAttribute("data-filter"));
        });
    });

    // Detectar en qué página estamos
    if (container) cargarNoticias();
    if (window.location.pathname.includes("post-page.html")) mostrarNoticia();
});
