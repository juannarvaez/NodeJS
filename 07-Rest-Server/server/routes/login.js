const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
// const _ = require('underscore')

app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({
        email: body.email
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error al encontrar un usuari de la BD',
                    err
                }
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
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            user: data,
            token
        })
    });
})

// Configuraciones de google

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload()
    console.log('NOMBRE: ', payload.name)
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google', async(req, res) => {
    let token = req.body.idtoken;

    let googleUser = await verify(token).catch(e => {
        return res.status(403).json({
            ok: false,
            err: {
                message: "Error al verificar el token de google",
                e
            }
        })
    })

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error del servidor',
                    err
                }
            })
        }

        if (usuarioDB) {
            if (!usuarioDB.google) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Debe usar su atentificacion normal',
                        err
                    }
                })
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }
        } else {
            // Si el usuario no existe en la base de datos
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';

            usuario.save((err, usuarioDB) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        err: {
                            message: "Error al guardar el usuario",
                            err
                        }
                    })
                }

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            })
        }
    })

});

module.exports = app;