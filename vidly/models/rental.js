const mongoose = require('mongoose')
const Joi = require('joi')

// const { schema: customerSchema } = require('./customer')
// const { schema: movieSchema } = require('./movie')

const schema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
})

const Rental = mongoose.model('Rental', schema)

function validate(data) {
  const schema = {
    movieId: Joi.objectId().required(),
    customerId: Joi.objectId().required()
  }

  return Joi.validate(data, schema)
}

exports.Rental = Rental
exports.validate = validate
