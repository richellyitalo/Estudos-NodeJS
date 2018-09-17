const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(404).send('Gênero não encontrado');
  }

  const { title, numberInStock, dailyRentalRate } = req.body;

  const movie = new Movie({
    title,
    numberInStock,
    dailyRentalRate,
    // genre: new Genre({name: genre.name})
    genre: {
      _id: genre._id,
      name: genre.name
    }
  });

  const result = await movie.save();
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(404).send('Gênero não encontrado');
  }

  const { title, numberInStock, dailyRentalRate } = req.body;

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title,
    numberInStock,
    dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  }, { new: true });

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const result = await Movie.findByIdAndRemove(req.params.id);

  res.send(result);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send('Registro não encontrado');
  }
  
  res.send(movie);
})

module.exports = router;