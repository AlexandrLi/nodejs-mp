const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plugins = require('./plugins');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    validate: value => value > 0,
  },
  reviews: Array,
});

productSchema.plugin(plugins.timestamp);

module.exports = mongoose.model('Product', productSchema);
