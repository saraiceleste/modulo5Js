function saludar(nombre, callback) {
  console.log(`Hola, ${nombre}!`);
  callback();
}

function despedirse() {
  console.log("Adios!");
}

saludar("Pau", despedirse);
