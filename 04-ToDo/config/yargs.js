let descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const yargs = require('yargs')
    .command(
        'crear', 'Crear un elemento por hacer', {
            descripcion
        }
    ).command(
        'actualizar', 'Actualzia el estado completado de una tarea', {
            descripcion,
            completado: {
                default: true,
                alias: 'c',
                desc: 'Marca como completado o pendiente la tarea'
            }
        }
    ).command(
        'borrar', 'Borrar un elemento de la lista', {
            descripcion: {
                demand: true,
                alias: 'd',
                desc: 'Descripcion de borrar un elemento'
            }
        }
    )
    .help()
    .argv;

module.exports = {
    yargs
};