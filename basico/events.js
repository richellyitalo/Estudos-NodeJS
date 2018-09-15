const EventEmitter = require('events');
const event = new EventEmitter();

// Registra
event.on('sendMessage', arg => {
  if (arg)
    console.log('Argumentos', arg);
  else
    console.log('Sem argumentos');
});

// Dispara
event.emit('sendMessage', { id: 1, name: 'Jão' });