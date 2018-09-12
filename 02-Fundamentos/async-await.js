let getNombre = async() => {
    if (false) {
        throw new Error('No existe un nombre para ese Usuario'); //Error disparado por fallo en esta linea de codigo
    };
    return 'Juan C. Narvaez'
};

getNombre().then(nombre => {
    console.log(nombre);
}).catch(e => {
    console.log(`Error: ${e}`);
});


// Es la forma extendida de la parte de arriba, ahorramos todo esto usando ASYNC
let getNombreSinAsync = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('timeout Juan C. Narvaez');
        }, 3000);
    });
}

getNombreSinAsync().then(nombre => {
    console.log(nombre);
}).catch(e => {
    console.log(`Error: ${e}`);
});

// AWAIT hace que algo asyncrono se espere como si fuera sincrono!!!
let saludo = async() => {
    let nombre = await getNombre(); //
    return `Hola ${nombre}`
}

saludo().then(msj => {
    console.log(msj)
})