const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
  login: {
    type: Boolean
  },
  city: {
    type: String,
    require: true
  },
  keyword: {
    type: String,
    require: true
  },
  product: {},
  more: {
    type: Array,
    require: true
  }
});

module.exports = mongoose.model('Products', Products);
