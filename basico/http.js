const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Home');
  }

  if (req.url === '/cursos') {
    res.write('Cursos');
    res.write(JSON.stringify([1, 2, 3]));
  }

  res.end();
});

// server.on('connection', socket => {
//   console.log('alguém conectou');
// })

server.listen(3000); 

console.log('Conectado ao primeiro server.');