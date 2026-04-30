fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error en la solicitud:', error));

/*Aunque fetch es poderoso, no lanza errores automáticamente si la respuesta tiene un código de estado como 404 o 500. Es importante verificar manualmente el estado de la respuesta.*/