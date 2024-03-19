const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const hbs = require('hbs')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();
require('express-async-errors');

// Create a new Express application.
var app = express();

// view engine setup (Handlebars)
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('views','./views');

// register handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

// Use application-level middleware for common functionality, including parsing, and session handling.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'unique-secret', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));

// include Stripe publishable key in session
app.use(function(req, res, next) {
  res.locals.STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY
  res.locals.layout = false;
  next();
});
app.options('*', cors())
app.use(bodyParser.json());
// load controllers & routes
app.use(require('./controllers'));

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.render('pages/error', { error: err});
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Getting served on port ' + PORT);
  }
});
