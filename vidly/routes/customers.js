const express = require('express');
const { Customer, validate } = require('../models/customer');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const { name, phone, isGold } = req.body;
  const genre = new Customer({
    name,
    phone,
    isGold
  });
  const result = await genre.save();

  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  const genre = await Customer.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    }
  }, { new: true });
  if (!genre) {
    return res.status(404).send('Registro não encontrado');
  }
  
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Customer.findById(req.params.id);
  if (!genre) {
    return res.status(404).send('Registro não encontrado');
  }
  
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Customer.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send('Registro não encontrado.');
  }

  res.send(genre);
})

module.exports = router;
