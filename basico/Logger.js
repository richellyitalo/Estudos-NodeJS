const EventEmitter = require('events');

// var url = 'http://richellyitalo.com';

class Logger extends EventEmitter {
  log(message) {
    console.log('envia request');
    console.log(message);

    this.emit('sentMessage', { id: 1, message: message });
  }
}

module.exports = Logger

// module.exports.log = log
// module.exports = log