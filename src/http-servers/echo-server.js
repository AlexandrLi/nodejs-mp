const http = require('http');

const echoServer = http.createServer();

echoServer.on('request', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log(req);
  req.pipe(res);
});

echoServer.listen(3003, () => {
  console.log('echoServer is listening on port 3003');
});
