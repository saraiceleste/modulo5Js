setTimeout(() => {
  console.log("Primera tarea completada");

  setTimeout(() => {
    console.log("Segunda tarea completada");

    setTimeout(() => {
      console.log("Tercera tarea completada");
    }, 1000);
  }, 1000);
}, 1000);
