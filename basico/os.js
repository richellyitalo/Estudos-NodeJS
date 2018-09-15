const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Memória total: ' + totalMemory);

console.log(`Memória total: ${totalMemory}`);
console.log(`Memória livre: ${freeMemory}`);