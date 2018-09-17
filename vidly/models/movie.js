const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre')

const schema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    trim: true,
    maxlength: 255,
    required: true
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    required: true
  }
});

const Movie = mongoose.model('Movie', schema);

function validate(data) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.obejctId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  };

  return Joi.validate(data, schema);
}

exports.Movie = Movie;
exports.validate = validate;
exports.schema = schema;