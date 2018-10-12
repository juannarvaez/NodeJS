const express = require('express')
const app = express()

app.use(require('./usuario').app); //Esto para importar y usar dentro de el objeto app la logica que vienen en el require, aqui se encuentra la API REST del usuario
app.use(require('./login'));

module.exports = app;