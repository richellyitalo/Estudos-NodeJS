const express = require('express');
const { Genre, validate } = require('../models/genre');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const genre = new Genre(req.body);
  const result = await genre.save();

  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name
    }
  }, { new: true });
  if (!genre) {
    return res.status(404).send('Registro não encontrado');
  }
  
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send('Registro não encontrado');
  }
  
  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send('Registro não encontrado.');
  }

  res.send(genre);
})

module.exports = router;
