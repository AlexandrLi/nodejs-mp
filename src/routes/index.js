const router = require('express').Router();

router.get('/products', (req, res) => {
  res.send(
    `<h1>List of all products</h1>
    <hr/>
    <form action="/api/products" method="POST">
    <label htmlFor="name">name</label>
    <input id="name" type="text" name="name"/>
    <label htmlFor="description">description</label>
    <input id="description" type="text" name="description"/>
    <button type="submit">Add</button>
    </form>`
  );
});

router.post('/products', (req, res) => {
  const product = req.body;
  res.send(JSON.stringify(product));
});

router.get('/products/:id/reviews', (req, res) => {
  res.send(`List of reviews for product with id: ${req.params.id}`);
});

router.get('/products/:id', (req, res) => {
  res.send(`Product with id: ${req.params.id}`);
});

router.get('/users', (req, res) => {
  res.send('List of all users');
});

module.exports = router;
