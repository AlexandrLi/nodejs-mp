const http = require('http');

const plain_server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

plain_server.listen(3000, () =>
  console.log('plain-text-server is listening on port 3000')
);
