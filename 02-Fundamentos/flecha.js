function sumar(a, b) {
    return a + b;
}

//funcion de flecha
let sumarFlecha = (a, b) => a + b;
// let sumarFlecha = (a, b) => {
//     return a + b
// };

//funccion de flecha 2
function saludar(nombre) {
    return `Hola ${nombre}`;
}
let saludarFlecha = nombre => `Hola ${nombre}`;


//funcion flecha dentro de objetos
let deadpool = {
    nombre: 'Wade',
    apellido: 'Windston',
    poder: 'Regeneracion',
    getNombre() {
        return `${this.nombre} ${this.apellido} - Poder: ${this.poder}`
    }
};

console.log(`${sumar(10,20)}`);
console.log(`${sumarFlecha(10,20)}`);