// Puerto
process.env.PORT = process.env.PORT || 3000;


// Entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Caducidad del token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// SEDD de autentificacion
process.env.SEED = process.env.SEED || 'Alyssa-secret';

// Bases de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI_DB
}
process.env.URLDB = urlDB;