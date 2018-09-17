const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 15
  },
  isGold: {
    type: Boolean,
    default: false
  }
});

const Customer = mongoose.model('Customer', schema);

function validate(data) {
  const schema = {
    name: joi.string().min(5).max(200).required(),
    phone: joi.string().min(9).max(15).required(),
    isGold: joi.boolean()
  };

  return joi.validate(data, schema);
}

exports.Customer = Customer;
exports.validate = validate;
exports.schema = schema;