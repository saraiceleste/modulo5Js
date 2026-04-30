fetch('https://api.example.com/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Ana',
    mensaje: 'Hola, me interesa su servicio'
  })
})
  .then(response => response.json())
  .then(data => console.log('Formulario enviado:', data))
  .catch(error => console.error('Error al enviar el formulario:', error));

/*enviar daatos de formulario a unservidor*/