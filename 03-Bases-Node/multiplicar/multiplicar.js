// Requireds
const fs = require('fs');
// const fs = require('express'); // No viene por defecto. Es un paquete que se instala y que posteriormente se usa
// const fs = require('./fs'); // Esta forma es para archivos
const colors = require('colors');


let crearArchivo = (base, limite = 10) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject(`${base} is not a Number.`);
            return;
        }

        let text = '';

        for (let i = 0; i <= limite; i++) {
            text += `${base} x ${i} = ${base*i}\n`;
        }

        fs.writeFile(`tablas/tabla-${base}-al-${limite}.txt`, text, (err) => {
            if (err)
                reject(err)
            else
                resolve(`tabla-${base}-al-${limite}.txt`)
        });
    })
}

let listar = (base, limite = 10) => {
    return new Promise((resolve, reject) => {
        if (!Number(base) || !Number(limite)) {
            reject(`some parameter(s) is not a Number.`);
            return;
        }
        let text = '=====================\n'.green;
        text += 'Tabla de Multiplicar\n'.green;
        text += '=====================\n'.green;
        for (let i = 0; i <= limite; i++) {
            text += `${base} x ${i} = ${base*i}\n`;
        }
        resolve(text);
    })
}

module.exports = {
    crearArchivo,
    listar
}