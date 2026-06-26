let opiniones = [];

const regex = /^(?:\+?56)?9\d{8}$/; 

function validarCelularChileno(telefono) {
    return regex.test(telefono);
}

function registrarOpinion() {
    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const correo = document.getElementById("correo")?.value.trim() || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";
    const producto = document.getElementById("producto")?.value || "";
    const opinion = document.getElementById("opinion")?.value.trim() || "";
    const mensaje = document.getElementById("mensaje");

    if (!nombre || !correo || !telefono || !producto || !opinion) {
        if (mensaje) {
            mensaje.innerHTML = "Debe completar todo el formulario";
            mensaje.style.backgroundColor = 'rgba(105,0,0,0.3)';
        }
        return;
    }


    if (validarCelularChileno(telefono.value)){
        if (mensaje) {
            mensaje.innerHTML = "Ingresa solo números en tu teléfono";
            mensaje.className = "Error";
            mensaje.style.backgroundColor = 'rgba(105,0,0,0.3)';
        }
        return;
    }
    if (!correo.includes("@")) {
        if (mensaje) {
            mensaje.innerHTML = "Correo inválido";
            mensaje.className = "Error";
            mensaje.style.backgroundColor = 'rgba(105,0,0,0.3)';
        }
        return;
    }

    const opinionEnviada = {
        nombre,
        producto,
        fecha: new Date().toLocaleDateString("es-ES")
    };

    opiniones.push(opinionEnviada);

    if (mensaje) {
        mensaje.innerHTML = "Opinión enviada exitosamente";
        mensaje.className = "Exito";
        mensaje.style.backgroundColor = 'rgba(0,105,0,0.3)';
    }

    mostrarOpinion();
    limpiarFormulario();
}

function mostrarOpinion() {
    const tabla = document.getElementById("tablaOpiniones");

    if (!tabla) {
        return;
    }

    tabla.innerHTML = "";

    opiniones.forEach((opinion) => {
        tabla.innerHTML += `
            <tr>
                <td>${opinion.nombre}</td>
                <td>${opinion.producto}</td>
                <td>${opinion.fecha}</td>
            </tr>
        `;
    });
}

function limpiarFormulario() {
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const producto = document.getElementById("producto");
    const opinion = document.getElementById("opinion");

    if (nombre) nombre.value = "";
    if (correo) correo.value = "";
    if (telefono) telefono.value = "";
    if (producto) producto.selectedIndex = 0;
    if (opinion) opinion.value = "☕";
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        registrarOpinion,
        mostrarOpinion,
        limpiarFormulario,
        opiniones
    };
}