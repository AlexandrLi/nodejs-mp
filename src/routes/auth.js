const jwt = require('jsonwebtoken');
const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const SECRET = 'veryhardsecret';
const appUserName = 'admin';
const appUserPwd = 'root';

passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === appUserName && password === appUserPwd) {
      done(null, {username, password});
    } else {
      done(null, false);
    }
  })
);
passport.use(
  new FacebookStrategy(
    {
      clientID: '2281550368575444',
      clientSecret: '5111072e894b79c612273a442fb5b51c',
      callbackURL: 'http://localhost:8080/auth/facebook/callback',
    },
    function(accessToken, refreshToken, profile, done) {
      console.log({accessToken});
      console.log({refreshToken});
      console.log({profile});
      done(null, {username: 'admin'});
    }
  )
);
passport.use(
  new TwitterStrategy(
    {
      consumerKey: 'tIOFk9OW1SGib0Z75k0WoOvcK',
      consumerSecret: 'GJBjkDjdPH075qUmZKy3FVVNKf1yyg6VbBFvcJ777JbZB6pjMW',
      callbackURL: 'http://localhost:8080/auth/twitter/callback',
    },
    function(token, tokenSecret, profile, done) {
      console.log({token});
      console.log({tokenSecret});
      console.log({profile});
      done(null, {username: 'admin'});
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '905889534402-vouq6kh0d0eg8dd4ce0geco19sl0e7o2.apps.googleusercontent.com',
      clientSecret: '1lL40JReIOgE5RaUkYvqwB3Y',
      callbackURL: 'http://localhost:8080/auth/google/callback',
    },
    function(accessToken, refreshToken, profile, done) {
      console.log({accessToken});
      console.log({refreshToken});
      console.log({profile});
      done(null, {username: 'admin'});
    }
  )
);

router.post('/auth', (req, res) => {
  const {username, password} = req.body;
  if (username === appUserName && password === appUserPwd) {
    const token = jwt.sign({username: appUserName}, SECRET, {expiresIn: 20});
    res.send({
      code: 200,
      message: 'OK',
      data: {user: {email: null, username: username}},
      token,
    });
  } else {
    res.status(404).send({code: 404, message: 'Not found', data: null});
  }
});

router.get('/login', (req, res) => {
  res.send(
    `<h1>Login page</h1>
  <hr/>
  <form action="/login" method="POST">
  <label htmlFor="username">Username</label>
  <input id="username" type="text" name="username"/>
  <label htmlFor="password">Password</label>
  <input id="password" type="password" name="password"/>
  <button type="submit">Login</button>
  </form>
  <hr/>
  <a href="/auth/facebook">Login with Facebook</a>
  <a href="/auth/twitter">Sign in with Twitter</a>
  <a href="/auth/google">Sign In with Google</a>`
  );
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api2/products',
    failureRedirect: '/login',
    session: false,
  })
);

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api2/products',
    failureRedirect: '/login',
    session: false,
  })
);

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/api2/products',
    failureRedirect: '/login',
    session: false,
  })
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api2/products',
    failureRedirect: '/login',
    session: false,
  })
);

module.exports = {SECRET, router, passport};
