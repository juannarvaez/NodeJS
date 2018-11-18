const jwt = require('jsonwebtoken')

// ===============================
// Verificar Token
// ===============================


let verifyToken = (req, res, next) => {
    let token = req.get('token'); //Para obtener la informacion que vienen en del header, porque es una peticion get

    console.log('token autenticacion: ', token);

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'no pudo verificar',
                    err
                }
            })
        }

        req.usuario = decoded.usuario;
        // Hay que llamar el NEXT para asi ejecutar el resto del codigo que va despues de ejecutarse este middleware
        // si se hace un res.json() aqui, el res.json() del next no se ejecuta.
        next();
    })
}

// ===============================
// Verificar Admin Role
// ===============================

let verifyRole = (req, res, next) => {
    // req.usuario fue definido en el verifyToken, por eso podemos hacer uso de el aqui.
    let usuario = req.usuario;

    if (usuario.role === "ADMIN_ROLE") {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador',
                role: usuario
            }
        })
    }
}

module.exports = {
    verifyToken,
    verifyRole
}