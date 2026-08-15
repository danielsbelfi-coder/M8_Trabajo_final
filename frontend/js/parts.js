protegerPagina()

const params = new URLSearchParams(window.location.search)
const consoleId = params.get("id")

const listaPartes = document.getElementById("listaPartes")
const formParte = document.getElementById("formParte")
const btnLogout = document.getElementById("btnLogout")
const tituloConsola = document.getElementById("tituloConsola")

btnLogout.addEventListener("click", cerrarSesion)

if (!consoleId) {
    window.location.href = "dashboard.html"
}

async function cargarPartes() {
    try {
        const response = await fetch(`${API_URL}/consoles/${consoleId}/parts`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Error al cargar repuestos")
        }

        renderizarPartes(data.data)
    } catch (error) {
        mostrarError(error.message)
    }
}

function renderizarPartes(partes) {
    listaPartes.innerHtml = "";

    if (partes.length === 0) {
        listarPartes.innerHtml = `<p class="text-muted">Aún no hay repuestos registrados para esta consola.</p>`;
        return;
    }

    partes.forEach((parte) => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        const imagenSrc = parte.imageUrl
            ? `${API_URL}${parte.imagenUrl}`
            : "https://placehold.co/300x180?text=Sin+imagen";

        col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${imagenSrc}" class="card-img-top card-imagen" alt="${parte.nombre}">
        <div class="card-body">
          <h5 class="card-title">${parte.nombre}</h5>
          <p class="card-text">
            <span class="badge ${parte.condicion === 'Nuevo' ? 'bg-success' : 'bg-secondary'}">
              ${parte.condicion}
            </span>
          </p>
        </div>
      </div>
    `;

    listaPartes.appendChild(col)
    })
}

formParte.addEventListener("submit", async (e) => {
    e.preventDefault()

    const nombre = document.getElementById("nombre").value;
    const condicion = document.getElementById("condicion").value;
    const imagenInput = document.getElementById("imagen");

    const formData = new FormData();
    formData.append("nombre", nombre)
    formData.append("condicion", condicion)
    formData.append("consoleId", consoleId);

    if (imagenInput.files[0]) {
        formData.append("imagen", imagenInput.files[0])
    }

    try {
        const response = await fetch(`${API_URL}/parts`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${obtenerToken()}`,
            },
            body: formData,
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.error || "Error al crear el repuesto")
        }

        formParte.reset();
        bootstrap.Modal.getInstance(document.getElementById("modalParte")).hide()
        cargarPartes();

    } catch (error) {
        const errorModal = document.getElementById("errorModalParte");
        errorModal.textContent = error.message;
        errorModal.classList.remove("d-none")
        
    }
})

cargarPartes();