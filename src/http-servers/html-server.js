const http = require('http');
const fs = require('fs');

const readableStream = fs.createReadStream('./src/http-servers/index.html', {
  encoding: 'utf8',
});

const htmlServer = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  // const data = fs.readFileSync('./src/http-servers/index.html', 'utf-8');
  // res.write(data.replace('{message}', 'Real message'));
  // res.end();
  readableStream.pipe(res);
});

htmlServer.listen(3001, () =>
  console.log('htmlServer is listening on port 3001')
);
