if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./passport-config');

initializePassport(
  passport, 
  // PULL EMAIL FROM DATABASE
);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// Allows usage from forms via req from post methods

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  // If not logged in, render login page

  res.render('login.ejs', {name: "test"});
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.listen(3009, () => {
  console.log("Listening on 3009");
});