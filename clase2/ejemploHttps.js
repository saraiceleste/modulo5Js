const https = require("https");

https
  .get("https://api.example.com/datos", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log("Datos recibidos:", data);
    });
  })
  .on("error", (err) => {
    console.error("Error en la solicitud:", err);
  });
