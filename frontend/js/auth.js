const loginForm = document.getElementById("loginForm")

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        ocultarError();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al iniciar sesión")
            }

            guardarToken(data.token);
            window.location.href = "dashboard.html";

        } catch (error) {
            mostrarError(error.message)
        }
    })
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        ocultarError();

        const alias = document.getElementById("alias").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ alias, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al registarse");
            };

            const succestAlert = document.getElementById("successAlert")
            succestAlert.textContent = "Cuenta creada correctamente. Redirigiendo..."
            succestAlert.classList.remove("d-none");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500)

        } catch (error) {
            mostrarError(error.message);
        }

    });
}