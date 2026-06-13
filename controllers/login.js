const { response, request } = require("express");
const loginRouter = require("express").Router;
const bcrypt = require("bcrypt");
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
};

module.exports = loginRouter;
