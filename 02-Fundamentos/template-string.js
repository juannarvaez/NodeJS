let nombre = 'Deadpool';
let real = 'Wade Winston';

console.log(nombre + ' es ' + real);
console.log(`${1+2} ${nombre} es ${real}`);


function getNombre() {
    return `${nombre} es ${real}`;
}

console.log(`El nombre de : ${getNombre()}`);