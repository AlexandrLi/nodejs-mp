const app = require('./app');
const mongoose = require('mongoose');

const Product = require('./models/Product');
const User = require('./models/User');

const usersData = require('./data/users.json');
const productsData = require('./data/products.json');

const port = process.env.PORT || 8080;

mongoose
  .connect(
    'mongodb+srv://node:root@node-mp-l6c8p.gcp.mongodb.net/node?retryWrites=true',
    {useNewUrlParser: true}
  )
  .then(async result => {
    const users = await User.find();
    if (users.length === 0) {
      User.insertMany(usersData);
      Product.insertMany(productsData);
    }
    app.listen(port, () => console.log(`App is listening on ${port}`));
  })
  .catch(err => {
    console.log(err);
  });
