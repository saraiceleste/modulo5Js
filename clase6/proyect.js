// --- Esquema de validación con Zod ---
const { z } = Zod; // Zod cargado vía CDN

const schema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// --- Función para limpiar errores ---
function limpiarErrores() {
  for (const id of ["nombre", "email", "password"]) {
    const el = document.getElementById(`error-${id}`);
    if (el) el.textContent = "";
  }
}

// --- Función para mostrar errores (Zod) ---
function mostrarErrores(errors) {
  limpiarErrores();

  for (const error of errors) {
    const path = error.path[0]; // nombre, email, password
    const msg  = error.message;
    const el   = document.getElementById(`error-${path}`);
    if (el) el.textContent = msg;
  }
}

// --- 4. Manejador de submit con fetch ---
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault(); // evita recargar

  limpiarErrores();

  const values = {
    nombre:   document.getElementById("nombre").value.trim(),
    email:    document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
  };

  // Validar con Zod
  try {
    const data = schema.parse(values);

    //  Enviar al servidor con fetch
    const response = await fetch("/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Respuesta del servidor:", result);
    alert("✅ Registro exitoso");

  } catch (err) {
    if (err instanceof z.ZodError) {
      // Errores de validación del esquema Zod
      mostrarErrores(err.errors);
    } else {
      // Errores de red / servidor
      console.error("Error de envío:", err);
      document.getElementById("error-nombre").textContent =
        "Error al enviar, revisa la conexión o intenta más tarde.";
      alert("❌ Error al enviar el formulario.");
    }
  }
});