const express = require('express')
const { verifyToken, verifyRole } = require('../middlewares/autenticacion')

let app = express();
let Categoria = require('../models/categoria')

app.get('/categoria', (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario') //para traer la informacion del usuario, sin esta instruccion solo aparece el id, (busca en la tabla de usuarios)
        // .populate('usuario', 'nomnbre email') // para especificar que campos traer
        .exec((err, data) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Categorias no encontradas en la BD',
                        err
                    }
                })
            }

            return res.json({
                ok: true,
                categorias: data,
            })
        })
})

app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, data) => {
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
                    message: 'Id no encontrado',
                    err
                }
            })
        }

        return res.json({
            ok: true,
            categoria: data
        })
    })
})

app.post('/categoria', verifyToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No se pudo grabar la categoria',
                    err
                }
            })
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo crear la categoria.'
                }
            })
        }

        return res.json({
            ok: true,
            categoria: data
        })
    })
})

app.put('/categoria/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;

    let descripcionCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descripcionCategoria, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No se pudo actualizar la categoria',
                    err
                }
            })
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo actualizar la categoria.'
                }
            })
        }

        return res.json({
            ok: true,
            categoria: data,
            body
        })
    })
})

app.delete('/categoria/:id', [verifyToken, verifyRole], (req, res) => {
    // Eliminar fisicamente, no logicamente 
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No se pudo eliminar la categoria',
                    err
                }
            })
        } else if (!data) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Categoria no encontrada'
                }
            })
        }

        return res.json({
            ok: true,
            message: 'categoria borrada'
        })
    })
})

module.exports = app;