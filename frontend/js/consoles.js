protegerPagina()

const listaConsolas = document.getElementById("listaConsolas")
const formConsola = document.getElementById("formConsola")
const btnLogout = document.getElementById("btnLogout")

btnLogout.addEventListener("click", cerrarSesion)

async function cargarConsolas() {
    try {
        const response = await fetch(`${API_URL}/consoles`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al cargar consolas");
        }

        renderizarConsolas(data.data);

    } catch (error) {
        mostrarError(error.message)
    }    
}

function renderizarConsolas(consolas) {
    listaConsolas.innerHTML = "";

    if (consolas.length === 0){
            listaConsolas.innerHTML = `<p class="text-muted">Aún no hay consolas registradas.</p>`;
        return;
    }

    consolas.forEach((consola) => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
        <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${consola.fabricante} ${consola.modelo}</h5>
          <p class="card-text text-muted">Generación: ${consola.generacion ?? "N/D"}</p>
          <a href="console-detail.html?id=${consola.id}" class="btn btn-outline-primary btn-sm">
            Ver repuestos
          </a>
        </div>
      </div>
    `;

    listaConsolas.appendChild(col);
    })
}

formConsola.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fabricante = document.getElementById("fabricante").value;
    const modelo = document.getElementById("modelo").value;
    const generacion = document.getElementById("generacion").value;

    try {
        const response = await fetch(`${API_URL}/consoles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${obtenerToken()}` 
            },
            body: JSON.stringify({ fabricante, modelo, generacion: generacion || null})
        })

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || "Error al crear consola")
        }

        formConsola.reset();
        bootstrap.Modal.getInstance(document.getElementById("modalConsola")).hide();
        cargarConsolas();

    } catch (error) {
        const errorModal = document.getElementById("errorModalConsola");
        errorModal.textContent = error.message;
        errorModal.classList.remove("d-none");        
    }
});

cargarConsolas()