const planetas = require('./planetas');
// Aquí mostraremos la información de los planetas

planetas.forEach(planeta => {
  console.log(`¡Planeta ${planeta.nombre} descubierto!`);
  console.log(`Descripción: ${planeta.descripcion}`);
  console.log(`Descubierto en: ${planeta.descubiertoEn}`);
  console.log(`Dato curioso: ${planeta.datoCurioso}`);
});

function buscarPlaneta(nombrePlaneta) {
  const planetaEncontrado = planetas.find(
    (planeta) => planeta.nombre.toLowerCase() === nombrePlaneta.toLowerCase()
  );

  if (planetaEncontrado) {
    console.log(`\n🔍 Resultado de búsqueda para "${nombrePlaneta}":`);
    console.log(`-> ${planetaEncontrado.descripcion}`);
  } else {
    console.log(`\n❌ El planeta "${nombrePlaneta}" no está en nuestra base de datos.`);
  }
}

buscarPlaneta("Titán");   // Caso donde sí existe
buscarPlaneta("Melmac");   // Caso donde no existe