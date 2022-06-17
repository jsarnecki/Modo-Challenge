if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
// const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
// const initializePassport = require('./passport-config');
const jwt = require("jsonwebtoken");

const { getUserByEmail, getUserById } = require('../database');

// initializePassport(
//   passport, 
//   getUserByEmail,
//   getUserById
// );

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// Allows usage from forms via req from post methods

// app.use(express.static(path.join(__dirname, '../', 'style')));

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// app.use(passport.initialize());
// app.use(passport.session());
// Keeps the session running

app.get('/', (req, res) => {
  // If not logged in, render login page

  res.render('login.ejs', {
    name: "test",
  });
});

app.get('/vehicles', authenticateToken, (req, res) => {
  res.render('index.ejs');
});

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/vehicles',
//   failureRedirect: '/',
//   failureFlash: true
// }));

app.post('/login', (req, res) => {
  // Authenticate user

  const username = req.body.username
  const user = { name: user }

  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, nex) { //Middleware

}

app.listen(3009, () => {
  console.log("Listening on 3009");
});