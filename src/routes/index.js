const router = require('express').Router();
const Product = require('../models/Product');
const User = require('../models/User');
const City = require('../models/City');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    const list = products.reduce(
      (res, el, index) =>
        (res += `<li>${el.id} | ${el.name} - ${el.price} (${
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
    <label htmlFor="price">price</label>
    <input id="price" type="text" name="price"/>
    <button type="submit">Add</button>
    </form>`
    );
  } catch (error) {
    res.send(error);
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });
    await product.save();
    res.redirect('/api/products');
  } catch (error) {
    res.send(error.message);
  }
});

router.get('/products/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const list = product.reviews.reduce(
      (res, el) => (res += `<li>${el}</li>`),
      ''
    );
    res.send(`
      List of reviews for product with id: ${req.params.id}
      <ul>${list}</ul>
      `);
  } catch (error) {
    res.send(error);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(JSON.stringify(product));
  } catch (error) {
    res.send(error);
  }
});

router.get('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.send(JSON.stringify(product));
});

router.get('/users', async (req, res) => {
  const users = await User.find();
  const list = users.reduce(
    (res, el) =>
      (res += `<li>${el.id} | ${el.firstName} ${el.lastName} - ${
        el.email
      }</li>`),
    ''
  );
  res.send(`
  <h1>List of all users</h1>
  <ul>
  ${list}
  </ul>`);
});

router.get('/cities', async (req, res) => {
  const cities = await City.find();
  const list = cities.reduce(
    (res, el) => (res += `<li>${JSON.stringify(el)}</li>`),
    ''
  );
  res.send(`
  <h1>List of all cities</h1>
  <ul>
  ${list}
  </ul>`);
});

//Only reachable through postman
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.send(error);
  }
});

router.post('/cities', async (req, res) => {
  try {
    const city = new City({
      name: req.body.name,
      country: req.body.country,
      capital: req.body.capital,
      location: {
        lat: req.body.lat,
        long: req.body.long,
      },
    });
    await city.save();
    res.send(city);
  } catch (error) {
    res.send(error.message);
  }
});

router.put('/cities/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        country: req.body.country,
        capital: req.body.capital,
        location: {
          lat: req.body.lat,
          long: req.body.long,
        },
      },
      {upsert: true, new: true, setDefaultsOnInsert: true}
    );
    res.send(city);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete('/cities/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    res.status(200).send(city);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
