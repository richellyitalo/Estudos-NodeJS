const config = require('config');
const Joi = require('joi');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('E-mail ou senha inválidos.');

  const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

  if (!passwordIsValid) return res.status(400).send('Password inválido.');

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

  res.send(token);
});

function validate(data) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(data, schema);
}

module.exports = router;