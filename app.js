const express = require('express');
const methodOverride = require('method-override');
const app = express();
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const models = require('./db/models');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.engine(
  'handlebars',
  exphbs.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine', 'handlebars');

require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!');
});
