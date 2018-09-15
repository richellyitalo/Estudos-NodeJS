const Logger = require('./Logger');

const logger = new Logger();

logger.on('sentMessage', arg => {
  console.log('Mensagem enviado', arg);

  // Loop infinito
  // logger.log('Envie esta outra!');
});

logger.log('Envie esta mensagem!');