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

let getEmpleado = async(id) => {
    let empleadoDB = empleados.find(empleado => {
        return empleado.id === id
    });

    if (!empleadoDB) {
        throw new Error(`No existe el empleado con ID ${id} en la DB`);
    } else {
        return empleadoDB;
    }
}

let getSalario = (empleado) => {
    let salario = salarios.find(salario => salario.id === empleado.id);
    if (!salario) {
        throw new Error(`No se encontro un salario para el empleado ${empleado.nombre} con id ${empleado.id}`);
    } else {
        return {
            nombre: empleado.nombre,
            salario: salario.salario
        };
    }
}

let getInformacion = async(id) => {
    let empleado = await getEmpleado(id);
    let respo = await getSalario(empleado);
    return `${respo.nombre} tiene un salario de ${respo.salario}$`;
}

getInformacion(3).then(msj => {
    console.log(msj);
}).catch(e => {
    console.log(e);
});