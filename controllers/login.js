const { response, request } = require("express");
const loginRouter = require("express").Router;
const bcrypt = require("bcrypt"); //bcrypt es una biblioteca de JavaScript que se utiliza para cifrar contraseñas de forma segura. Proporciona una función de hash que toma una contraseña y un número de salt rounds (que determina la complejidad del hash) y devuelve un hash seguro de la contraseña. Además, bcrypt también proporciona una función de comparación que permite verificar si una contraseña ingresada coincide con el hash almacenado en la base de datos. Esto es útil para autenticar a los usuarios sin almacenar sus contraseñas en texto plano, lo que mejora la seguridad de la aplicación.
const jwt = require("jsonwebtoken"); //JWT (JSON Web Token) es un estándar abierto que se utiliza para transmitir información de forma segura entre dos partes, generalmente un cliente y un servidor. En el contexto de la autenticación, JWT se utiliza para generar tokens de acceso que contienen información sobre el usuario autenticado. Estos tokens se pueden enviar al cliente después de que el usuario haya iniciado sesión correctamente, y luego el cliente puede incluir este token en las solicitudes posteriores para acceder a recursos protegidos en el servidor. El servidor puede verificar la validez del token y autorizar o denegar el acceso según corresponda.
//const user = require() PENDIENTE IMPORTAR DE MODELS

loginRouter.post("./ ", async (req, res) => {
  const { email, password } = request.body;
  // console.log(email, password);
  const userExist = await user.findOne({ email });
  //   console.log(userExist);
  if (!userExist) {
    return response.status(400).json({ error: "Usuario no encontrado" });
  }
  if (userExist.verified)
    return response.status(400).json({ error: "email no verificado" });

  const saltRounds = 10; //salt rounds es el número de veces que se aplica el algoritmo de hash para proteger la contraseña. Cuanto mayor sea el número, más seguro será el hash, pero también llevará más tiempo generar el hash. En general, se recomienda usar al menos 10 salt rounds para una buena seguridad.
  const itsCorrect = await bcrypt.compare(password, userExist.password);
//   console.log(itsCorrect);
if (!itsCorrect) {
    return response.status(400).json({ error: "Contraseña incorrecta" });

const userForToken = {
    id: userExist.id,
};
const token = jwt.sign(userForToken, process.env.ACCSESS_TOKEN_SECRET, 
  { expiresIn: "1d" 

  });
  // console.log(token); 

  response.cookie("accessToken", accessToken, {
    expires: "1d", 
    secure: process.env.NODE_ENV === "production", //SI ESTAMOS EN PRODUCCIÓN, LA COOKIE SOLO SE ENVIARÁ A TRAVÉS DE CONEXIONES SEGURAS (HTTPS)
    httpOnly: true, //NO SE PUEDE ACCEDER A LA COOKIE DESDE EL LADO DEL CLIENTE, SOLO SE PUEDE ENVIAR EN LAS PETICIONES AL SERVIDOR
  });

  return response.sendStatus(200);

};


module.exports = loginRouter;
