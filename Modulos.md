# Módulos
# Maneiras de exportar os módulos
```
// logger.js
function log(message) { console.log(message) };
module.exports = log;
// ou 
module.exports.log = log;
```
Importando
```
// app.js
const log = require('./logger');
// se module.exports = log
// log('Mensagem');
// se module.exports.log = log
// log.log('Mensagem');