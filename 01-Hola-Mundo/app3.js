console.log('inicio del programas');

setTimeout(function(){
    console.log('Primer Timeout');
}, 3000);


setTimeout(function(){
    console.log('Timeout 2');
}, 0);

setTimeout(function(){
    console.log('Timeout 3');
}, 0);

console.log('Fin del programa')