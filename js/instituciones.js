function buscarInstitucion() {
    $.ajax({
        type: "GET",
        url: "../assets/json/instituciones.json",
        datatype: "json",
        async: true,
        success: function (data) {
            filtrarInstituciones(data);
        }
    });
  }
  const provincias = {
    "lima region": [ "Huaral",  "Yauyos", "Lima"],
    "callao": ["Callao"],
    "amazonas": ["Chachapoyas", "Bagua", "Bongará"]
  };
  
  const distritos = {
    // Lima Región
    "huaral": ["Huaral", "Atavillos Alto", "Atavillos Bajo", "Aucallama", "Chancay", "Ihuari", "Lampian", "Pacaraos", "San Miguel de Acos", "Santa Cruz de Andamarca", "Sumbilca", "Veintisiete de Noviembre"],
    "yauyos": ["Yauyos", "Alis", "Allauca", "Ayauca", "Azángaro", "Cacra", "Carania", "Catahuasi", "Chocos", "Cochas", "Colonia", "Hongos", "Huampara", "Huancaya", "Huangáscar", "Huantán", "Huañec", "Laraos", "Lincha", "Madean", "Miraflores", "Omas", "Putinza", "Quinches", "Quinocay", "San Joaquín", "San Pedro de Pilas", "Tanta", "Tauripampa", "Tomas", "Tupe", "Viñac", "Vitis"],
    "lima": ["Cercado de Lima", "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurín", "Magdalena del Mar", "Miraflores", "Pachacámac", "Pucusana", "Pueblo Libre", "Puente Piedra", "Punta Hermosa", "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santa Anita", "Santa María del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa María del Triunfo"],
  
    // Callao
    "callao": ["Callao", "Bellavista", "Carmen de la Legua", "La Perla", "La Punta", "Ventanilla", "Mi Perú"],
  
    // Amazonas
    "chachapoyas": ["Chachapoyas", "Asunción", "Balsas", "Cheto", "Chiliquin", "Chuquibamba", "Granada", "Huancas", "La Jalca", "Leimebamba", "Levanto", "Magdalena", "Mariscal Castilla", "Molinopampa", "Montevideo", "Olleros", "Quinjalca", "San Francisco de Daguas", "San Isidro de Maino", "Soloco", "Sonche"],
    "bagua": ["Bagua", "Aramango", "Copallin", "El Parco", "Imaza", "La Peca"],
    "bongará": ["Jumbilla", "Chisquilla", "Churuja", "Corosha", "Cuispes", "Florida", "Jazan", "Recta", "San Carlos", "Shipasbamba", "Valera", "Yambrasbamba"]
  };
  
  
  function filtrarInstituciones(data) {
    //declaramos la variable y capturamos el valor ingresado por teclado del usuario
    //dicho valor lo cambiaremos a minusculas 
    let nombreIngresado = $("#input-nombres").val().toLowerCase();
    let tipoSeleccionado =  $("#tipo").val().toLowerCase(); 
    let departamentoSeleccionado =  $("#departamento").val().toLowerCase(); 
    let provinciaSeleccionado =  $("#provincia").val().toLowerCase(); 
    let distritoSeleccionado =  $("#distrito").val().toLowerCase(); 
    console.log(nombreIngresado);
    
    let $cardContainer = $("#card-container");//se guardara las cards
    $cardContainer.empty(); // Limpia los resultados previos
  
    if (nombreIngresado === "" && tipoSeleccionado === "" && departamentoSeleccionado === "") {
      $cardContainer.html('<p class="NoNombre">Por favor, ingrese un nombre o seleccione una categoría..</p>');
      return;
    } 
    let institucionesEncontradas = [];
  
    if (tipoSeleccionado) {
      // Si el usuario seleccionó un tipo de institución, filtramos solo esa categoría
      if (data[tipoSeleccionado]) {
          institucionesEncontradas = data[tipoSeleccionado].filter(inst =>
              (nombreIngresado === "" || inst.nombre.toLowerCase().includes(nombreIngresado)) &&
              (departamentoSeleccionado === "" || inst.departamento.toLowerCase() === departamentoSeleccionado) &&
              (provinciaSeleccionado === "" || inst.provincia.toLowerCase() === provinciaSeleccionado) &&
              (distritoSeleccionado === "" || inst.distrito.toLowerCase() === distritoSeleccionado)  // Comparación ajustada
          );
          console.log("Provincia seleccionada:", provinciaSeleccionado);
  console.log("Distritos disponibles:", distritos[provinciaSeleccionado]);
      }
    } else {
      // Si no seleccionó un tipo, buscamos en todas las categorías
      Object.values(data).forEach(categoria => {
          categoria.forEach(inst => {
              if (
                  (nombreIngresado === "" || inst.nombre.toLowerCase().includes(nombreIngresado)) &&
                  (departamentoSeleccionado === "" || inst.departamento.toLowerCase() === departamentoSeleccionado) &&
                  (provinciaSeleccionado === "" || inst.provincia.toLowerCase() === provinciaSeleccionado) &&
                  (distritoSeleccionado === "" || inst.distrito.toLowerCase() === distritoSeleccionado) // Comparación ajustada
              ) {
                  institucionesEncontradas.push(inst);
              }
          });
      });
    }
  
    if (institucionesEncontradas.length > 0) {
          mostrarInstituciones(institucionesEncontradas);
    } else {
          $cardContainer.html('<p class="NoExiste">No existe en nuestra base de datos.</p>');
    }
  
     // Limpiar el input después de la búsqueda
     $("#input-nombres").val("");
    
  }
  
  function mostrarInstituciones(instituciones) {
    let $cardContainer = $("#card-container");
    $cardContainer.empty();
  
    instituciones.forEach(inst => {
        let card = `
            <div class="card">
                <h3>${inst.nombre}</h3>
                <p><strong>Teléfono:</strong> ${inst.telefono}</p>
                <p><strong>Dirección:</strong> ${inst.direccion}</p>
                <p><strong>Correo:</strong> ${inst.correo}</p>
                <p><strong>Sitio Web:</strong> <a href="${inst["sitio web"]}" target="_blank">${inst["sitio web"]}</a></p>
                <p><strong>Área de atención:</strong> ${inst["area de atencion"]}</p>
                <p><strong>Departamento:</strong> ${inst.departamento}</p>
                <p><strong>Provincia:</strong> ${inst.provincia}</p>
                <p><strong>Distrito:</strong> ${inst.distrito}</p>
                <p><strong>Fecha de registro:</strong> ${inst["fecha de registro"]}</p>
                <p><strong>Última actualización:</strong> ${inst["ultima actualizacion"]}</p>
            </div>
        `;
  
        $cardContainer.append(card);
    });
    
  }
  
  // Ocultar instrucciones cuando se presiona el botón de búsqueda
  document.querySelector('button[onclick="buscarInstitucion()"]').addEventListener('click', function() {
      var instrucciones = document.querySelector('.instrucciones-filtro');
      if (instrucciones) {
          instrucciones.style.display = 'none'; 
      }
  });
  
  $(document).ready(function () {
    $("#departamento").change(function () {
        let departamentoSeleccionado = $(this).val().toLowerCase(); // Convertir a minúscula
        let provinciaSelect = $("#provincia");
        let distritoSelect = $("#distrito");
  
        provinciaSelect.empty().append('<option value="">Selecciona una provincia</option>');
        distritoSelect.empty().append('<option value="">Selecciona un distrito</option>');
  
        if (departamentoSeleccionado && provincias[departamentoSeleccionado]) {
            provincias[departamentoSeleccionado].forEach(provincia => {
                provinciaSelect.append(`<option value="${provincia.toLowerCase()}">${provincia}</option>`);
            });
        }
    });
  
    $("#provincia").change(function () {
      let provinciaSeleccionada = $(this).val().toLowerCase();
      let distritoSelect = $("#distrito");
  
      distritoSelect.empty().append('<option value="">Selecciona un distrito</option>');
  
      // Verifica si la provincia tiene distritos asociados
      if (provinciaSeleccionada && distritos.hasOwnProperty(provinciaSeleccionada)) {
          distritos[provinciaSeleccionada].forEach(distrito => {
              distritoSelect.append(`<option value="${distrito.toLowerCase()}">${distrito}</option>`);
          });
      } else {
          console.warn("No se encontraron distritos para la provincia seleccionada:", provinciaSeleccionada);
      }
  });
  
  });
  
  