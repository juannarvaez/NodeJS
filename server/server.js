require('./config/config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false })) // "use" son middlewares 
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json('get usuario') //Para enviar los datos en formato json
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario',
            error: 'Error'
        })
    } else {
        res.json({
            persona: body
        })
    }
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id: id
    })
})



app.delete('/usuario', function(req, res) { //Ya no se borran registros sino que se cambia el estado de la info
    res.json('delete usuario')
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto:", process.env.PORT)
})