require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Handlebars = require('handlebars');
const session = require('express-session');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

const models = require('./db/models');
const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  helpers: {
    if_eq: function (a, b, opts) {
      if (a === b) {
        return opts.fn(this);
      }
      return opts.inverse(this);
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(function authenticateToken(req, res, next) {
  const token = req.cookies.mpJWT;

  if (token) {
    jwt.verify(token, 'AUTH-SECRET', (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('/login');
      }
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.user) {
    models.User.findByPk(req.user.id)
      .then((currentUser) => {
        res.locals.currentUser = currentUser;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next();
  }
});

app.use(cookieParser('SECRET'));
const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 60);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { expires: expiryDate },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(function (req, res, next) {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});
require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);
require('./controllers/auth')(app, models);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!');
});
