const router = require('express').Router();
const Sequelize = require('sequelize');
const models = require('../models');

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:6543/node'
);
const Product = sequelize.import('../models/product.js');
sequelize.sync();

router.get('/products', async (req, res) => {
  const products = await Product.findAll();
  const list = products.reduce(
    (res, el) =>
      (res += `<li>${el.id} | ${el.name} - ${el.price || 'N/A'} (${
        el.description
      })</li>`),
    ''
  );
  res.send(
    `
    <h1>List of all products</h1>
    <ul>
    ${list}
    </ul>
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

router.post('/products', async (req, res) => {
  const product = req.body;
  await Product.insertOrUpdate(product);
  res.redirect('/api/products');
});

router.get('/products/:id/reviews', async (req, res) => {
  const reviews = await Product.findByPk(req.params.id);
  console.log(reviews);

  res.send(`List of reviews for product with id: ${req.params.id}`);
});

router.get('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.send(JSON.stringify(product));
});

router.get('/users', async (req, res) => {
  const users = await models.User.findAll();
  const list = users.reduce(
    (res, el) =>
      (res += `<li>${el.id} | ${el.firstName} ${el.lastName} - ${
        el.email
      }</li>`),
    ''
  );
  res.send(`
  <h1>List of all products</h1>
  <ul>
  ${list}
  </ul>`);
});

module.exports = router;
