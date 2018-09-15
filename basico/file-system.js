const fs = require('fs')

// const files = fs.readdirSync('c:/windows/system32');
// console.log(files);

fs.readdir('.ddd', function (err, files) {
  if (err) console.log('Erro', err);
  else console.log(files);
})
