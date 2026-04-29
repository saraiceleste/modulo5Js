const estudiante = {
  nombre: "Ana",

  edad: 22,

  esEstudiante: true,

  materias: ["Historia", "Inglés", "Literatura"],
};

const jsonString = JSON.stringify(estudiante);

console.log(jsonString);
