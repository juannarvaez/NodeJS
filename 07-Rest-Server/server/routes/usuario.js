const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')

app.get('/usuario', function(req, res) {

    // Configuracion de paginacion
    let desde = req.query.desde || 0;
    desde = Number(desde)
    let limite = req.query.limite || 5
    limite = Number(limite)

    // Usuario.find({}, 'nombre email')  <---- Para filtrar los campos que queremos que retorne la base de datos
    Usuario.find({ estado: true })
        .skip(desde) // Para saltarse los primeros 5 registros
        .limit(limite) // Para unicamente obtener los primeros 5 registros
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios: data,
                    count: conteo
                })
            })

        })
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //bcrypt.hashSync(body.password, numero de vueltas que quiero aplicarle al hash)
        role: body.role
    })

    usuario.save((err, data) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: 'El nombre es necesario',
                error: err,
                datos: body
            })
        } else {
            // data.password = null;
            res.json({
                ok: true,
                usuario: data
            })
        }
    })
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'password', 'img', 'estado']);

    // delete body.password;       Forma manual de hacer lo de la instruccion _.pick( data , [ elementos que quiero mantener])
    // delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                id: id,
                data: data,
                body
            })
        }
    })
})

app.delete('/usuario/:id', function(req, res) { //Ya no se borran registros sino que se cambia el estado de la info
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, data) => {
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (data === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            })
        } else {
            res.json({
                ok: true,
                deleted_user: data
            })
        }
    })
})

module.exports = {
    app
}