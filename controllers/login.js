const { response, request } = require('express')

const loginRouter = require('express').Router
//const user = require() PENDIENTE IMPORTAR DE MODELS

loginRouter.post('./ ', async (req, res) => {
    const { email, password } = request.body
    console.log(email, password);
});

module.exports = loginRouter