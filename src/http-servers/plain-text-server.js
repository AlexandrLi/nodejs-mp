const http = require('http');

const plainServer = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

plainServer.listen(3000, () =>
  console.log('plainServer is listening on port 3000')
);
