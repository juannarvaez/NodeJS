// Helpers: es una funcion que se dispara cada que HBS lo requiere.
const hbs = require('hbs')

hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('capitalize', (texto) => {
    let words = texto.split(' ');
    words.forEach((word, idx) => {
        words[idx] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

    });
    return words.join(' ');
})