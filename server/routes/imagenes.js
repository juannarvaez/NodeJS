const expres = require('express');
const fs = require('fs');
const path = require('path');
const { verifyTokenURL } = require('../middlewares/autenticacion')

let app = expres();

app.get('/imagen/:tipo/:img', verifyTokenURL, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        let noImgPath = path.resolve(__dirname, '../assets/image-not-found.png');
        res.sendFile(noImgPath);
    }
})


module.exports = app;