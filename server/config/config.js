// Puerto
process.env.PORT = process.env.PORT || 3000;


// Entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Bases de datos
let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe'
// } else {
urlDB = 'mongodb://admin:cafe-admin7@ds223763.mlab.com:23763/cafe'
    // }

process.env.URLDB = urlDB;