const {
    crearArchivo,
    listar
} = require('./multiplicar/multiplicar');
const yargs = require('./config/yargs').yargs;
const colors = require('colors');

// console.log(module);
// console.log(process);
// console.log(process.argv);

// console.log(argv);
// let argv = process.argv;
// let parametro = argv[2].split('=')[1];

console.log(yargs.base);

let commando = yargs._[0];
let base = yargs.base;
let limite = yargs.limite;

switch (commando) {
    case 'listar':
        listar(base, limite)
            .then(response => console.log(response))
            .catch(err => console.log(`Error: ${err}`));
        break;
    case 'crear':
        crearArchivo(base, limite)
            .then(archivo => console.log(`The file ${colors.green(archivo)} has been saved!`))
            .catch(err => console.log(`Error: ${err}`));
        break;
    default:
        console.log('Comando no reconocido');
}