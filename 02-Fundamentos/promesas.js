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

let getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado => {
            return empleado.id === id
        });

        if (!empleadoDB) {
            reject(`No existe el empleado con ID ${id} en la DB`);
        } else {
            resolve(empleadoDB);
        }
    });
}

let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {
        let salario = salarios.find(salario => salario.id === empleado.id);

        if (!salario) {
            reject(`No se encontro un salario para el empleado ${empleado.nombre} con id ${empleado.id}`);
        } else {
            // ASI LO LLAME DOS VECES SOLO SE DISPARA 1 VEZ   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            resolve({
                nombre: empleado.nombre,
                salario: salario.salario
            });
            resolve({
                nombre: empleado.nombre,
                salario: salario.salario
            });
            resolve({
                nombre: empleado.nombre,
                salario: salario.salario
            });
        }
    })
}

// PROMESAS ANIDADAS
getEmpleado(3).then(empleado => {
    console.log('Empleado en base de datos: ', empleado);

    getSalario(empleado).then(salario => {
        console.log(salario);
    }, (err) => {
        console.log("Error: ", err);
    });

}, (err) => {
    console.log(err);
});

// PROMESAS EN CADENA
getEmpleado(2).then(empleado => {
    return getSalario(empleado);
}).then(response => {
    console.log(response);
}).catch(err => {
    console.log(err);
});