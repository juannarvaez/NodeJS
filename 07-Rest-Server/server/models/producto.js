const mongoose = require('mongoose')

let Schema = mongoose.Schema;

var productSchema = new Schema({
    nombre: { type: String, require: [true, 'El nombre es necesario'] },
    precioUni: { type: Number, require: [true, 'El precio de unidad es necesario'] },
    descripcion: { type: String, require: false },
    disponible: { type: Boolean, require: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', require: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Producto', productSchema);