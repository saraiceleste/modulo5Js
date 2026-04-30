document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroConcierto");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const fechaEvento = form.fechaEvento.value;

    // 1. Validación básica: campos obligatorios
    if (!nombre) {
      alert("Por favor, ingresa tu nombre.");
      form.nombre.focus();
      return;
    }

    if (!email) {
      alert("Por favor, ingresa tu correo electrónico.");
      form.email.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      form.email.focus();
      return;
    }

    if (telefono && !/^\d{7,12}$/.test(telefono.replace(/[-\s()]/g, ""))) {
      alert("Por favor, ingresa un teléfono válido (7–12 dígitos).");
      form.telefono.focus();
      return;
    }

    if (!fechaEvento) {
      alert("Por favor, selecciona una fecha para el evento.");
      form.fechaEvento.focus();
      return;
    }

    // 2. VALIDACIÓN : nombre solo letras y espacios
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nombreRegex.test(nombre)) {
      alert("El nombre solo debe contener letras y espacios.");
      form.nombre.focus();
      return;
    }

    // 3. VALIDACIÓN : fecha no puede ser pasada
    const fechaSeleccionada = new Date(fechaEvento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      alert("No puedes elegir una fecha pasada para el concierto.");
      form.fechaEvento.focus();
      return;
    }

    // 4. Intereses y horario
    const intereses = [];
    const checkboxes = form.querySelectorAll('input[name="intereses"]:checked');
    checkboxes.forEach(box => intereses.push(box.value));

    if (intereses.length === 0) {
      alert("Por favor, selecciona al menos un género musical de interés.");
      return;
    }

    const horario = form.querySelector('input[name="horario"]:checked')?.value;
    if (!horario) {
      alert("Por favor, selecciona un horario preferido.");
      return;
    }

    // 5. VALIDACIÓN: tamaño del archivo de identificación (máx. 5 MB)
    const fileInput = form.identificacion;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSizeBytes) {
        alert("El archivo es demasiado grande. Máximo 5 MB.");
        form.identificacion.focus();
        return;
      }
    }

    const archivo = fileInput.files.length > 0 ? fileInput.files[0].name : "No se subió archivo";

    // Si todo está bien, mostrar resultado
    resultado.innerHTML = `
      <h2>✅ Registro exitoso</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono || "No proporcionado"}</p>
      <p><strong>Intereses:</strong> ${intereses.join(", ")}</p>
      <p><strong>Horario preferido:</strong> ${horario}</p>
      <p><strong>Fecha del concierto:</strong> ${fechaEvento}</p>
      <p><strong>Identificación:</strong> ${archivo}</p>
    `;
  });
});