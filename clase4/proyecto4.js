// Configuración del restaurante
const mesasDisponibles = 5;

// 1. Verificar disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    if (mesasSolicitadas <= mesasDisponibles) {
      resolve(`Reserva confirmada: ${mesasSolicitadas} mesa(s) reservada(s).`);
    } else {
      reject(
        `No hay suficientes mesas disponibles. Disponibles: ${mesasDisponibles}.`,
      );
    }
  });
}

// 2. Simular envío de confirmación por correo
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    const exito = Math.random() > 0.3; // 70% de éxito, 30% de error

    if (exito) {
      resolve(`Correo de confirmación enviado a ${nombreCliente}`);
    } else {
      reject("Error al enviar el correo de confirmación");
    }
  });
}

// 3. Función principal: hacer reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    // Verificar disponibilidad
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    console.log(disponibilidad);

    // Si hay mesas, intentar enviar correo
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacion);

    console.log("✅ Reserva realizada exitosamente.\n");
  } catch (error) {
    console.log("❌ Error en la reserva:", error);
    console.log("\n");
  }
}

// 4. Pruebas

hacerReserva("Ana", 3); // número menor o igual a mesasDisponibles
hacerReserva("Luis", 8); // número mayor que mesasDisponibles
hacerReserva("Carlos", 4); // otra prueba normal (correo puede fallar o no)
