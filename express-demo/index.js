const express = require("express");
const config = require('config');
// const bodyParser = require("body-parser");
const Joi = require("joi");
const helmet = require('helmet')
const morgan = require('morgan')

const logger = require('./middlewares/logger');
const clients = require('./routes/clients')
const home = require('./routes/home')

const app = express();

const startDebugger = require('debug')('app:start');
const dbDebugger = require('debug')('app:db');

startDebugger('Iniciando aplicação...');
dbDebugger('Conectando ao banco...');

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);

app.set('view engine', 'pug');
app.set('views', './views');

// rotas
app.use('/api/clients', clients);
app.use('/', home);

// Environment
console.log(config.get('app_name'));
console.log('Mail pass: ', config.get('mail_pass'));

// proccess.env.NODE_DEV
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
if (app.get('env') === 'development') {
  console.log('Executando morgan!');
  app.use(morgan('tiny'));
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server na porta ${port}`));
