const express = require('express');
const router = express.Router();

const clients = [
  {
    id: 1,
    name: "Jão"
  },
  {
    id: 2,
    name: "Mary"
  },
  {
    id: 3,
    name: "Francisco"
  }
];

router.get("/", (req, res) => {
  res.send(clients);
});

// get a client
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const client = clients.find(c => c.id === id);

  if (!client) return res.status(404).send(`Cliente #${id} não foi encontrado!`);

  res.send(client);
});

router.get("/:year/:month/:day?", (req, res) => {
  res.send(req.query);
  res.send(req.params);
});

// post a client
router.post("/", (req, res) => {
  const { error }= validateClient(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const client = {
    id: clients.length + 1,
    name: req.body.name
  };

  clients.push(client);

  res.send(client);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;