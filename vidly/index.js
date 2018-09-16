const express = require('express');
const mongoose = require('mongoose');
// Rotas
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

const app = express();

// Conexão
mongoose.connect('mongodb://localhost/estudos-genres')
  .then(() => console.log('Database conectado'))
  .catch(err => console.log('Não foi possível conectar ao Database', err.message));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use(home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server ativo\nPorta: ${port}`));
