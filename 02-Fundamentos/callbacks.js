setTimeout(() => {
    console.log('Hola mundo');
}, 3000);

let getUsuarioById = (id, callback) => {
    let usuario = {
        nombre: 'Juan C. Narvaez',
        id: id
    }

    if (id === 20) {
        callback(`El usuario ${id}, no existe en la BD`, null);
    } else {
        callback(null, usuario);
    }
}

getUsuarioById(20, (err, usuario) => {
    if (err) {
        return console.log(err);
    }
    console.log('Usuario de base de datos', usuario)
});