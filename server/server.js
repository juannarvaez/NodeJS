require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')

//Para leer data que vienen del cliente en archivos tipo json
app.use(bodyParser.urlencoded({ extended: false })) // "use" son middlewares 
app.use(bodyParser.json())

// Configuracion global de las rutas
app.use(require('./routes/index'))

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos: Online')
    }
}); //to conect with the cafe mongoDB

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto:", process.env.PORT)
})