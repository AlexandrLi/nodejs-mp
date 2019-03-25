const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('../helpers/validator');
const plugins = require('./plugins');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: value => validator.isEmail(value),
  },
});

userSchema.plugin(plugins.timestamp);

module.exports = mongoose.model('User', userSchema);
