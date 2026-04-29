let inventario = {
  libros: [
    {
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      genero: "Realismo mágico",
      disponible: true,
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      genero: "Distopía",
      disponible: true,
    },
  ],
};

function leerInventario(callback) {
  setTimeout(() => {
    callback(inventario);
  }, 500);
}

function escribirInventario(data, callback) {
  setTimeout(() => {
    inventario = data;
    callback("Inventario actualizado exitosamente.");
  }, 500);
}

function agregarLibro(nuevoLibro) {
  leerInventario((data) => {
    data.libros.push(nuevoLibro);
    escribirInventario(data, (msg) => console.log(`Acción: ${msg}`));
  });
}

function actualizarDisponibilidad(titulo, disponible) {
  leerInventario((data) => {
    let libro = data.libros.find((l) => l.titulo === titulo);
    if (libro) libro.disponible = disponible;
    escribirInventario(data, (msg) => console.log(`Acción: ${msg}`));
  });
}

function consultarInventario() {
  leerInventario((data) =>
    console.log("Inventario:", JSON.stringify(data, null, 2)),
  );
}

// Llamada para probar el inventario
consultarInventario();

// Llamada para probar una actualización
actualizarDisponibilidad("1984", false);

// Llamada para consultar de nuevo después de la actualización
setTimeout(consultarInventario, 1000);
