const axios = require('axios');

const getClima = async(lat, lng) => {

    let encodeURL = encodeURI(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&unit=metric&appid=7d42fd2756e418e2e1d77cd7c566df53`);
    let response = await axios.get(encodeURL);

    return response.data.main.temp;

}

module.exports = {
    getClima
}