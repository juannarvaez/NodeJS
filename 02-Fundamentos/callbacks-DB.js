let empleados = [{
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Sandra'
    },
    {
        id: 3,
        nombre: 'Juan'
    }
];

let salarios = [{
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 5000
    }
];


let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find(empleado => {
        return empleado.id === id
    });

    if (!empleadoDB) {
        callback(`No existe el empleado con ID ${id} en la DB`);
    } else {
        callback(null, empleadoDB)
    }
}

let getSalario = (empleado, callback) => {
    let salario = salarios.find(salario => {
        return salario.id === empleado
    });

    let empleadoData = empleados.find(e => {
        return e.id === empleado;
    })

    if (!salario && empleadoData) {
        callback(`No se encontro un salario para el empleado ${empleadoData.nombre} con id ${empleadoData.id}`);
    } else if (!empleadoData) {
        callback(`No se encontro un empleado`);
    } else {
        callback(null, {
            nombre: empleadoData.nombre,
            salario: salario.salario
        });
    }
}

getSalario(2, (err, obj) => {
    if (err) {
        console.log(err);
    } else {
        console.log(obj);
    }
});

// getEmpleado(1, (err, empleado) => {
//     if (err) {
//         return console.log(err);
//     } else {
//         console.log(empleado);
//     }
// });