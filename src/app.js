const app = require('express')();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const router = require('./routes');
const City = require('./models/City');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  req.parsedCookies = req.cookies;
  console.log(req.parsedCookies);
  next();
});
app.use((req, res, next) => {
  req.parsedQuery = req.query;
  console.log(req.parsedQuery);
  next();
});
app.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    res.send(randomCity);
  } catch (error) {
    console.log(error);
  }
});
app.use('/api', router);
app.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;
