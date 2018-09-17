const fs = require('fs');

let listadoToDo = [];

const cargarDB = () => {
    try {
        listadoToDo = require('../DB/data.json');
    } catch (err) {
        listadoToDo = [];
    }
};

const getListado = () => {
    cargarDB();
    return listadoToDo;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoToDo.findIndex(item => item.descripcion === descripcion);
    if (index >= 0) {
        listadoToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const crear = (descripcion) => {
    cargarDB();
    let toDo = {
        descripcion,
        completado: false
    };
    listadoToDo.push(toDo);
    guardarDB();
    return toDo;
};

const guardarDB = () => {
    let data = JSON.stringify(listadoToDo);
    fs.writeFile('DB/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar el archivo', err);
    })
};

const borrar = (descripcion) => {
    cargarDB();
    console.log("dentro del borrado: ", descripcion)
    let auxListado = listadoToDo.filter(item => item.descripcion !== descripcion);
    if (auxListado.length === listadoToDo.length) {
        return false;
    } else {
        listadoToDo = auxListado;
        guardarDB();
        return true;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};