document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("post-container");
    const filterItems = document.querySelectorAll(".filter-item");
    let noticiasData = [];

    // Función para mostrar noticias en la lista
    function renderNoticias(filtro) {
        if (!container) return;

        container.innerHTML = "";

        noticiasData
            .filter(noticia => filtro === "all" || noticia.filtro === filtro)
            .forEach(noticia => {
                let post = document.createElement("div");
                post.classList.add("post-box", noticia.filtro);

                if (noticia.url) {
                    post.setAttribute("data-url", noticia.url);
                }

                post.innerHTML = `
                    <img src="${noticia.imagen}" alt="${noticia.titulo}" class="post-img">
                    <h2 class="category">${noticia.categoria}</h2>
                    <a href="#" class="post-title">${noticia.titulo}</a>
                    <span class="post-date">${noticia.fecha}</span>
                    <p class="post-description">${noticia.descripcion}</p>
                `;

                post.addEventListener("click", function () {
                    if (noticia.categoria.toLowerCase() === "oportunidades") {
                        window.location.href = noticia.url; // Redirige en la misma pestaña
                    } else if (noticia.categoria.toLowerCase() === "articulos") {
                        window.location.href = `post-page.html?id=${encodeURIComponent(noticia.titulo)}`;
                    }
                });

                container.appendChild(post);
            });
    }

    // Función para mostrar una noticia en post-page.html
    function mostrarNoticia() {
        const params = new URLSearchParams(window.location.search);
        const noticiaId = params.get("id");

        if (!noticiaId) {
            document.getElementById("post-content").innerHTML = "<p>No se encontró la noticia.</p>";
            return;
        }

        fetch("../assets/json/noticias.json")
            .then(response => response.json())
            .then(data => {
                const noticia = data.find(n => n.titulo === decodeURIComponent(noticiaId));

                if (!noticia) {
                    document.getElementById("post-content").innerHTML = "<p>No se encontró la noticia.</p>";
                    return;
                }

                // Asignar valores a los elementos de post-page.html
                document.getElementById("post-title").textContent = noticia.titulo;
                document.getElementById("post-image").src = noticia.imagen;
                document.getElementById("post-image").alt = noticia.titulo;

                let contenidoHTML = `<span class="post-date">${noticia.fecha}</span>`;

                if (noticia.contenido) {
                    noticia.contenido.forEach(seccion => {
                        if (seccion.intro) contenidoHTML += `<p>${seccion.intro}</p>`;
                        if (seccion.subtitulo) contenidoHTML += `<h2>${seccion.subtitulo}</h2>`;
                        if (seccion.info) contenidoHTML += `<p>${seccion.info}</p>`;
                    });
                }

                document.getElementById("post-content").innerHTML = contenidoHTML;
            })
            .catch(error => console.error("Error cargando noticia:", error));
    }

    // Cargar noticias en la página principal (noticias.html)
    if (container) {
        fetch("../assets/json/noticias.json")
            .then(response => response.json())
            .then(data => {
                noticiasData = data;
                renderNoticias("all");
            })
            .catch(error => console.error("Error cargando noticias:", error));

        filterItems.forEach(item => {
            item.addEventListener("click", () => {
                document.querySelector(".active-filter")?.classList.remove("active-filter");
                item.classList.add("active-filter");

                let filtro = item.getAttribute("data-filter");
                renderNoticias(filtro);
            });
        });
    }

    // Cargar una noticia en post-page.html
    if (window.location.pathname.includes("post-page.html")) {
        mostrarNoticia();
    }
});