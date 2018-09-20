const axios = require('axios');

const getLugarLatLng = async(direccion) => {

    let encodeURL = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`);

    let resp = await axios.get(encodeURL);

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para ${direccion}`)
    }

    let formated_Address = resp.data.results[0].formatted_address;
    let coors = resp.data.results[0].geometry.location;

    // console.log(JSON.stringify(resp.data, undefined, 2)); // JSON.stringify( data, remplazos, espaciado)

    return {
        direccion: formated_Address,
        lat: coors.lat,
        lng: coors.lng
    }
}


module.exports = {
    getLugarLatLng
}