const categorias = {
    "Entretenimiento": ["TEATRO", "CINE", "ZONA DE RECREACIÓN"],
    "Educación": ["UNIVERSIDADES", "INSTITUTOS"],
    "Turismo": ["HOTELES"],
    "Servicios": ["COMIDA"],
    "Cultura": ["BIBLIOTECA", "MUSEO"],
    "Salud": ["CLÍNICAS Y HOSPITALES"],
    "Comercio": ["CENTRO COMERCIAL"]
};

$(document).ready(function () {
    const $categoriaSelect = $("#Categoria");
    const $subCategoriaSelect = $("#SubCategoria");

    // Llenar el select de categorías
    Object.keys(categorias).forEach(cat => {
        $categoriaSelect.append(`<option value="${cat}">${cat}</option>`);
    });

    // Actualizar subcategorías al seleccionar una categoría
    $categoriaSelect.change(function () {
        const categoriaSeleccionada = $(this).val();
        $subCategoriaSelect.empty().append('<option value="">Selecciona una subcategoría</option>');

        if (categoriaSeleccionada) {
            categorias[categoriaSeleccionada].forEach(sub => {
                $subCategoriaSelect.append(`<option value="${sub}">${sub}</option>`);
            });
        }
    });
});

// Ocultar las instrucciones
function ocultarInstrucciones() {
    $(".instrucciones-filtro").fadeOut("slow");
}

// Buscar instituciones
function buscarInstitucion() {
    $.ajax({
        type: "GET",
        url: "../assets/json/lugares.json",
        dataType: "json",
        async: true,
        success: filtrarInstituciones,
        error: () => console.error("Error cargando el JSON")
    });
}

// Filtrar instituciones
function filtrarInstituciones(data) {
    const nombreIngresado = ($("#input-nombres").val() || "").toLowerCase();
    const categoriaSeleccionada = $("#Categoria").val() || "";
    const subCategoriaSeleccionada = $("#SubCategoria").val() || "";
    const $cardContainer = $("#card-container");

    $cardContainer.empty();

    if (!nombreIngresado && !categoriaSeleccionada && !subCategoriaSeleccionada) {
        return $cardContainer.html('<p class="NoNombre">Por favor, ingrese un nombre o seleccione una categoría.</p>');
    }

    const institucionesEncontradas = Object.values(data)
        .flat() // Convertir estructura en un solo array
        .filter(inst => inst.nombre && (
            (!nombreIngresado || inst.nombre.toLowerCase().includes(nombreIngresado)) &&
            (!categoriaSeleccionada || inst.categoria === categoriaSeleccionada) &&
            (!subCategoriaSeleccionada || inst.subcategoria === subCategoriaSeleccionada)
        ));

    if (institucionesEncontradas.length > 0) {
        mostrarInstituciones(institucionesEncontradas);
        ocultarInstrucciones();
    } else {
        $cardContainer.html('<p class="NoExiste">No se encontraron resultados.</p>');
    }

    $("#input-nombres").val("");
}

// Mostrar resultados
function mostrarInstituciones(instituciones) {
    const $cardContainer = $("#card-container");
    $cardContainer.empty();

    instituciones.forEach(inst => {
        const card = `
            <div class="card">
                ${inst.imagen ? `<img src="${inst.imagen}" alt="${inst.nombre}" class="card-img">` : ""}
                <h3>${inst.nombre}</h3>
                <p><strong>Dirección:</strong> ${inst.direccion || "No disponible"}</p>
                <p><strong>Sitio Web:</strong> ${inst["sitio web"] ? `<a href="${inst["sitio web"]}" target="_blank">${inst["sitio web"]}</a>` : "No disponible"}</p>
                <p><strong>Categoría:</strong> ${inst.categoria || "No disponible"}</p>
                <p><strong>Subcategoría:</strong> ${inst.subcategoria || "No disponible"}</p>
                <p><strong>Nivel de Acesibilidad:</strong> ${inst["Nivel de Acesibilidad"] || "No disponible"}</p>
                <p><strong>Detalles del lugar:</strong> ${inst["Detalles del lugar"] || "No disponible"}</p>
            </div>
        `;
        $cardContainer.append(card);
    });
}

