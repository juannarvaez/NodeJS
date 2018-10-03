const http = require('http');

http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    let salida = {
        nombre: 'Juan C. Narvaez',
        edad: 24,
        url: req.url
    }
    res.write(JSON.stringify(salida));
    // res.write('Hola Mundo');
    res.end(); //Para definir que ya termino de crear la respuesta y asi se carge bien en el servidor
}).listen(8080);

console.log('Escuchando el puerto 8080');