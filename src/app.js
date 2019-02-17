const app = require('express')();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const appRouter = require('./routes');
const authRouter = require('./routes/auth').router;
const passport = require('./routes/auth').passport;
const {verifyToken} = require('./middlewares');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'secret'}));
app.use(passport.initialize());
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
app.use('/api', verifyToken, appRouter);
app.use('/api2', appRouter);
app.use(authRouter);
app.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;
