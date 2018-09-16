const mongoose = require('mongoose');
const joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const GenreModel = mongoose.model('Genre', genreSchema);

function validateGenre(data) {
  const schema = {
    name: joi.string().required()
  };

  return joi.validate(data, schema);
}

exports.Genre = GenreModel;
exports.validate = validateGenre;