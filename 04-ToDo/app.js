const yargs = require('./config/yargs').yargs;
const toDo = require('./todo/todo');
const colors = require('colors');

// console.log(yargs);

let comando = yargs._[0];
// console.log(comando);

switch (comando) {
    case 'listar':
        let listado = toDo.getListado();
        for (let tarea of listado) {
            console.log(colors.green("++++++++++++++++++++++++++++++++"));
            console.log(tarea.descripcion);
            console.log("Estado: " + tarea.completado);
            console.log(colors.green("++++++++++++++++++++++++++++++++"));
        }
        console.log(`Mostrar todas las tareas por hacer`);
        break;
    case 'crear':
        let tarea = toDo.crear(yargs.descripcion);
        console.log(`Crear por hacer`, tarea);
        break;
    case 'actualizar':
        let actualizado = toDo.actualizar(yargs.descripcion, yargs.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        console.log(yargs);
        let borrado = toDo.borrar(yargs.descripcion);
        console.log(borrado);
        break;
    default:
        console.log(`Comando no es reconocido`);
}