const express = require('express')
const app = express()
const hbs = require('hbs')
require('./hbs/helpers') // Helpers: es una funcion que se dispara cada que HBS lo requiere.


const port = process.env.PORT || 3000 //Esto para que cuando se suba a Heroku tome la primera opcion

//un Midleware es una instruccion o un callback que se va a ejecutar siempre no importa que URL el cliente pida
//app.use es usada para esto
//Todo esto va a ser de dominio publico
app.use(express.static(__dirname + '/public')); //__dirname es la ruta que hay hasta ahora en esta carpeta en el host

//Express HBS engine para la creacion de paginas web
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');




app.get('/', (req, res) => {
    res.render('home', {
            nombre: 'Juan C. Narvaez',
        }) //Renderiza el home.hbs
});

app.get('/about', (req, res) => {
    res.render('about', {}) //Renderiza el about.hbs
});


// app.get('/', (req, res) => {
//     let salida = {
//         nombre: 'Juan C. Narvaez',
//         edad: 24,
//         url: req.url
//     }

//     res.send(salida);
// });

// app.get('/data', (req, res) => {
//     res.send('Hola Data');
// });

app.listen(port, () => {
    console.log("Escuchando peticiones en el puerto: ", port);
});