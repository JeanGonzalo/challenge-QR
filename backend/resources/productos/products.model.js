const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: [true, 'El producto debe tener un título']
  },
  price: {
    type: Number,
    min: 0,
    required: [true, 'El producto debe tener un precio']
  },
  currency: {
    type: String,
    maxlength: 3,
    minlength: 3,
    required: [true, 'El producto debe tener una moneda']
  },
  owner: {
    type: String,
    required: [true, 'El producto debe tener un propietario']
  },
});

module.exports = mongoose.model('producto', productoSchema);