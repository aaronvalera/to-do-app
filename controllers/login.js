const loginRouter = require("express").Router(); //importa y ejecuta el método Router de Express para crear un módulo de rutas aislado para el login.
const bcrypt = require("bcrypt"); //importa la librería Bcrypt para realizar la comparación segura de contraseñas mediante hashing.
const jwt = require("jsonwebtoken"); //importa la librería JsonWebToken para generar tokens de acceso firmados digitalmente.
const User = require("../models/user.js"); // (Pendiente) Importará el modelo de datos de Mongoose para interactuar con la colección de usuarios en MongoDB.

loginRouter.post("/", async (req, res) => {
  //se define una ruta HTTP POST en la raíz del módulo. Usa 'async' porque adentro ejecutará tareas asíncronas (promesas).
  const { email, password } = req.body; //desestructura el cuerpo de la petición (req.body) para extraer directamente el correo y la contraseña enviados por el cliente.
  try {
    // intentamos ejecutar el flujo normal del login. si alguna línea aquí adentro falla, el código no rompe el servidor, sino que salta directo al catch
    const userExist = await User.findOne({ email }); // busca de forma asíncrona en la base de datos un único usuario que coincida con el email recibido.
    if (!userExist) {
      // si la base de datos no devolvió ningún registro (userExist es null), significa que el correo no está registrado.
      return res.status(400).json({ error: "User not found." }); //estado 400 (Bad Request)
    }
    if (!userExist.verified) {
      // si la propiedad 'verified' del usuario es falsa (el usuario no ha verificado su cuenta).
      return res.status(400).json({ error: "Email not verified." });
    }
    const itsCorrect = await bcrypt.compare(password, userExist.passwordHash); // cambia .password por .passwordHash para que coincida exactamente con tu base de datos.
    if (!itsCorrect) {
      // si las passwords no coinciden
      return res.status(400).json({ error: "Incorrect password." });
    }
    const userForToken = {
      // crea el objeto con los datos del usuario (en este caso el ID) que queremos meter dentro del token.
      id: userExist.id, //guardamos el ID único porque es el dato que usará el servidorpara identificar quién es este usuario.
    };
    const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
      // jwt.sign junta los datos del usuario con nuestra clave secreta para generar el token firmado.
      expiresIn: "1d", //definimos cuando expira el token
    });
    res.cookie("accessToken", token, { // guarda el token generado dentro de una cookie en el navegador del cliente.
      maxAge: 24 * 60 * 60 * 1000, // define la duración de la cookie (1 día).
      secure: process.env.NODE_ENV === "production", // si está en producción, la cookie solo se transmite mediante conexiones seguras HTTPS.
      httpOnly: true // pprotege la cookie prohibiendo que sea accesible mediante scripts de JavaScript en el frontend (evita ataques XSS).
    });
    return res.sendStatus(200); // responde exitosamente con un estado 200, notificando al frontend que el login fue correcto.
  } catch (error) {
    // captura cualquier fallo inesperado del servidor o de la base de datos.
    return res.status(500).json({ error: "Internal server error."}); // Responde con un estado 500 para no romper la aplicación.
  }
});

module.exports = loginRouter; // Exporta el enrutador para que pueda ser importado y usado por la aplicación principal (app.js / index.js).
