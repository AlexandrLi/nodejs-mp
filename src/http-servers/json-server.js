const http = require('http');

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [{color: 'blue'}, {size: 'XL'}],
};

const jsonServer = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(product));
  res.end();
});

jsonServer.listen(3002, () =>
  console.log('jsonServer is listening on port 3002')
);
