const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const _ = require('underscore')

app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) no encontrado"
                }
            })
        }

        if (!bcrypt.compareSync(body.password, data.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: "Contraseña no es correcta"
                }
            })
        }

        // Payload, DEFINICION DEL TOKEN
        let token = jwt.sign({
            usuario: data
        }, 'Alyssa-secret', { expiresIn: 60 * 60 * 24 * 30 });

        res.json({
            ok: true,
            user: data,
            token
        })
    });
})


module.exports = app;