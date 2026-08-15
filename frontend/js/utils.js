function guardarToken(token) {
    localStorage.setItem("token", token)
}

function obtenerToken() {
    return localStorage.getItem("token")
}

function cerrarSesion() {
    localStorage.removeItem("token");
    window.location.href = "index.html"
}

function protegerPagina() {
    const token = obtenerToken();
    if (!token) {
        window.location.href = "index.html"
    }
}

function mostrarError(mensaje, contenedorId = "errorAlert") {
    const contenedor = document.getElementById(contenedorId)
    if (contenedor) {
        contenedor.textContent = mensaje;
        contenedor.classList.remove("d-none")
    }
}

function ocultarError(contenedorId = "errorAlert") {
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
        contenedor.classList.add("d-none");
    }
}