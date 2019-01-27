const http = require('http');
const fs = require('fs');

const readableStream = fs.createReadStream('./src/http-servers/index.html', {
  encoding: 'utf8',
});

const html_server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  // const data = fs.readFileSync('./src/http-servers/index.html', 'utf-8');
  // res.write(data.replace('{message}', 'Real message'));
  // res.end();
  readableStream.pipe(res);
});

html_server.listen(3001, () =>
  console.log('html-server is listening on port 3001')
);
