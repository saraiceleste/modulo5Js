const API_URL = "https://rickandmortyapi.com/api/character";

const dataContainer = document.getElementById("data-container");

// 1. Función con fetch
async function loadWithFetch() {
  dataContainer.innerHTML = "Cargando...";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    showCharacters(data.results);
  } catch (error) {
    dataContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// 2. Función con Axios
async function loadWithAxios() {
  dataContainer.innerHTML = "Cargando con Axios...";

  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    showCharacters(data.results);
  } catch (error) {
    dataContainer.innerHTML = `<p>Error con Axios: ${error.message}</p>`;
  }
}

// 3. Función para mostrar personajes
function showCharacters(characters) {
  dataContainer.innerHTML = characters
    .map(
      (char) => `
      <div style="margin: 10px; border: 1px solid #0e7528; padding: 10px; display: inline-block;">
        <img src="${char.image}" alt="${char.name}" width="100" />
        <p><strong>${char.name}</strong></p>
        <p>Status: ${char.status}</p>
      </div>
    `,
    )
    .join("");
}

// 4. Asignar botones a las funciones
document.getElementById("btn-fetch").addEventListener("click", loadWithFetch);
document.getElementById("btn-axios").addEventListener("click", loadWithAxios);
