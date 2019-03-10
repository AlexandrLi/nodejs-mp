const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plugins = require('./plugins');

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  capital: {
    type: Boolean,
    required: true,
  },
  location: {
    lat: Number,
    long: Number,
  },
});

citySchema.plugin(plugins.timestamp);

module.exports = mongoose.model('City', citySchema);
