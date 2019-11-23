const Product = require('./products.model');

function create(product) {
  return new Product(product).save();
}

function getProducts() {
  return Product.find({});
}

async function get(id) {
  return await Product.findById(id);
}

async function update(id, product) {
  return await Product.findOneAndUpdate({ _id: id }, { ...product }, { new: true })
}

function remove(id) {
  return Product.findOneAndDelete(id);
}

module.exports = {
  create,
  getProducts,
  get,
  update,
  remove
}