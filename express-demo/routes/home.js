const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("Página inicial");
  res.render("index", {
    title: "Express DEMO",
    message: "Primeiro template aqui!"
  });
});

module.exports = router