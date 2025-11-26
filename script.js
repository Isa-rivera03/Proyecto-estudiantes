
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];


function mostrarSeccion(nombre) {
 
  document.querySelectorAll(".tabs button").forEach(btn =>
    btn.classList.remove("active")
  );

 
  document.getElementById("btn-" + nombre).classList.add("active");

 
  document.querySelectorAll(".seccion").forEach(sec =>
    sec.style.display = "none"
  );


  document.getElementById(nombre).style.display = "block";

  if (nombre === "listar") {
    listarEstudiantes();
  }
}

function guardarLocal() {
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

async function cargarCarreras() {
  try {
    const response = await fetch("http://demo2137951.mockable.io/");
    const carreras = await response.json();

    const select = document.getElementById("carrera");
    select.innerHTML = '<option value="">-- Seleccione opción --</option>';

    carreras.forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      select.appendChild(option);
    });

  } catch (error) {
    alert("Error cargando carreras desde el servicio ❌");
  }
}

cargarCarreras();


document.getElementById("formCrear").addEventListener("submit", e => {
  e.preventDefault();

  const nuevo = {
    nombre: nombre.value,
    apellido: apellido.value,
    edad: Number(edad.value),
    carrera: carrera.value,
    estrato: Number(estrato.value)
  };

  estudiantes.push(nuevo);
  guardarLocal();
  alert("Estudiante agregado ✅");
  e.target.reset();
});


function listarEstudiantes() {
  const tabla = document.getElementById("tablaEstudiantes");
  tabla.innerHTML = "";

  estudiantes.forEach((est, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${index}</td>
        <td>${est.nombre}</td>
        <td>${est.apellido}</td>
        <td>${est.edad}</td>
        <td>${est.carrera}</td>
        <td>${est.estrato}</td>
      </tr>
    `;
  });
}
mostrarSeccion('crear');

function eliminarEstudiante() {
  const id = Number(document.getElementById("idEliminar").value);

  if (id >= 0 && id < estudiantes.length) {
    estudiantes.splice(id, 1);
    guardarLocal();
    listarEstudiantes();
    alert("Estudiante eliminado ✅");
  } else {
    alert("ID no válido ❌");
  }
}
function buscarEstudiante() {
  const id = Number(document.getElementById("idBuscar").value);

  if (id < 0 || id >= estudiantes.length) {
    alert("ID no encontrado ❌");
    return;
  }

  const est = estudiantes[id];

  
  document.getElementById("formActualizar").style.display = "block";

  
  
  document.getElementById("u_nombre").value = est.nombre;
  document.getElementById("u_apellido").value = est.apellido;
  document.getElementById("u_edad").value = est.edad;
  document.getElementById("u_carrera").value = est.carrera;
  document.getElementById("u_estrato").value = est.estrato;


  const select = document.getElementById("u_carrera");
  select.innerHTML = "";

  const selectCrear = document.getElementById("carrera");
  select.innerHTML = selectCrear.innerHTML; 

  select.value = est.carrera; function actualizarEstudiante() {
  const id = window.idActualizando;

  estudiantes[id] = {
    id: id,
    nombre: document.getElementById("u_nombre").value,
    apellido: document.getElementById("u_apellido").value,
    edad: Number(document.getElementById("u_edad").value),
    carrera: document.getElementById("u_carrera").value,
    estrato: Number(document.getElementById("u_estrato").value)
  };

  guardarLocal();
  alert("Estudiante actualizado correctamente ✅");

 
  document.getElementById("formActualizar").style.display = "none";
  document.getElementById("idBuscar").value = "";
}
  document.getElementById("u_estrato").value = est.estrato;

 
  window.idActualizando = id;
}
