const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: "Direccion de la ciudad para obtener el clima",
        demand: true
    }
}).argv;
// lugar.getLugarLatLng(argv.direccion).then(response => console.log(response)).catch(err => console.log(err));
// clima.getClima(3.9005079, -76.30218889999999).then(response => console.log(response)).catch(err => console.log(err));

let getInfo = async() => {
    try {
        let coors = await lugar.getLugarLatLng(argv.direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);
        return `El clima en ${coors.direccion} es de ${temp}`
    } catch (e) {
        return `No se pudo determinar el clima en ${argv.direccion}`
    }
}

getInfo(argv.direccion).then(msj => console.log(msj)).catch(e => console.log(e));