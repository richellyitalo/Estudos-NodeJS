const logger = (req, res, next) => {
  console.log("Salvando log...");
  next();
};

module.exports = logger;
