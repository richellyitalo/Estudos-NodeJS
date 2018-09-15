const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");

const app = express();

// Middlewares, eu acho
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const clients = [
  {
    id: 1,
    name: "Jão"
  },
  {
    id: 2,
    name: "Mary"
  }
];

app.get("/", (req, res) => {
  res.send("Página inicial");
});

app.get("/api/clients", (req, res) => {
  res.send(clients);
});

// get a client
app.get("/api/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const client = clients.find(c => c.id === id);

  if (!client) return res.status(404).send(`Cliente #${id} não foi encontrado!`);

  res.send(client);
});

app.get("/api/clients/:year/:month/:day?", (req, res) => {
  res.send(req.query);
  res.send(req.params);
});

// post a client
app.post("/api/clients", (req, res) => {
  const { error }= validateClient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const client = {
    id: clients.length + 1,
    name: req.body.name
  };

  clients.push(client);

  res.send(client);
});

app.put('/api/clients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const client = clients.find(c => c.id === id);
  if (!client) return res.status(404).send(`Cliente #${id} não foi encontrado!`);

  const { error } = validateClient(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  client.name = req.body.name;
  res.send(client);
});

app.delete('/api/clients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const client = clients.find(c => c.id === id);
  if (!client) return res.status(404).send(`Cliente #${id} não foi encontrado!`);

  const index = clients.indexOf(client);
  clients.splice(index, 1);

  res.send(client);
});

validateClient = (data) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(data, schema);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server na porta ${port}`));
