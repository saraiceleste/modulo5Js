fetch('https://api.example.com/data')

  .then(response => response.json())

  .then(data => console.log(data))

  .catch(error => console.error('Error:', error));

/* En este ejemplo, fetch realiza una solicitud a una URL. Si la solicitud es exitosa, se procesa la respuesta como JSON, y se imprime el resultado en la consola. Si ocurre un error, se captura y se imprime.

*/