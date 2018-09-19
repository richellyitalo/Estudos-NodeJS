const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
// Rotas
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');

const app = express();

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: Chave privada do Jwt não definida.');
  process.exit(1);
}

// Conexão
mongoose.connect('mongodb://localhost/vidly')
// mongoose.connect('mongodb://cco.ponteon.com.br:49017/estudos_vidly')
  .then(() => console.log('Database conectado'))
  .catch(err => {
    console.log('Não foi possível conectar ao Database', err.message)
    process.exit(1);
  });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use(['/api/rentals'], authMiddleware);

app.use(home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server ativo\nPorta: ${port}`));
