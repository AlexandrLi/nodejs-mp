const http = require('http');

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [{color: 'blue'}, {size: 'XL'}],
};

const json_server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(product));
  res.end();
});

json_server.listen(3002, () =>
  console.log('json-server is listening on port 3002')
);
