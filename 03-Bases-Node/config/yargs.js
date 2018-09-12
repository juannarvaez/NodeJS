const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
}

const yargs = require('yargs')
    .command('listar', 'Imprimer en consola la tabla de multiplicar', opts)
    .command('crear', 'Crear un archivo de tabla de multiplicar', opts)
    .help()
    .argv;

module.exports = {
    yargs
}