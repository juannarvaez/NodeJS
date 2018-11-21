const express = require('express');

const { verifyToken } = require('../middlewares/autenticacion');


let app = express();
let Producto = require('../models/producto');


app.get('/productos', verifyToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Error servidor',
                        err
                    }
                })
            }

            if (!data) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No hay productos',
                        err
                    }
                })
            }

            res.json({
                ok: true,
                productos: data
            })
        })
});


app.get('/productos/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Error servidor',
                        err
                    }
                })
            }

            if (!data) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `No hay producto asociado a ese ID: ${id}`,
                        err
                    }
                })
            }

            res.json({
                ok: true,
                producto: data
            })
        })
});


app.get('/productos/buscar/:termino', verifyToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i'); //i: insencible a las mayusculas y minusculas

    Producto.find({ nombre: regex })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Error servidor',
                        err
                    }
                })
            }

            if (!data) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `No hay producto asociado a esa referencia`,
                        err
                    }
                })
            }

            res.json({
                ok: true,
                producto: data
            })
        })
})

app.post('/productos', verifyToken, (req, res) => {
    let body = req.body;
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria
    });

    producto.save((err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error servidor',
                    err
                }
            })
        }

        res.status(201).json({
            ok: true,
            producto: data
        })
    })
});

app.put('/productos/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error servidor',
                    err
                }
            })
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe',
                    err
                }
            })
        }

        data.nombre = body.nombre;
        data.precioUni = body.precioUni;
        data.descripcion = body.descripcion;
        data.categoria = body.categoria;
        data.disponible = body.disponible;

        data.save((err, dataSave) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Error servidor',
                        err
                    }
                })
            }

            res.status(201).json({
                ok: true,
                producto: dataSave
            })
        })
    })
});

app.delete('/productos/:id', verifyToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error servidor',
                    err
                }
            })
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe',
                    err
                }
            })
        }

        data.disponible = false;
        data.save((err, dataDeleted) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Error servidor',
                        err
                    }
                })
            }

            res.json({
                ok: true,
                productoBorrado: dataDeleted
            })
        })

    })
});

module.exports = app;