fetch('https://api.example.com')

  .then(response => console.log('Solicitud exitosa'))

  .catch(error => console.error('Hubo un problema:', error));
/* fetch devuelve una promesa que se resuelve cuando la solicitud completa su curso. Esto hace que sea ideal para manejar operaciones asíncronas.*/