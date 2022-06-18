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

app.use(express.static(('public')));

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

  res.render('login.ejs');
});

app.get('/vehicles', (req, res) => {
  // Query vehicle info to load into here and send thru the render

  res.render('index.ejs', {
    name: "test",
  });
});


app.post('/login', (req, res) => {
  // Authenticate user
  // Use email to find in user in database
  console.log("req.email:", req.body.email);
  
  getUserByEmail(req.body.email)
      .then((user) => {
        // user returns the user object

        console.log("Here is your user:", user);

        if (!user) {
          console.log("User not valid");
          return res.send("Email not valid");
        }

        console.log("Here I am, this is user:", user);

        if (bcrypt.compareSync(req.body.password, user.password)) {
          
          console.log("password matched");

          // const username = req.body.email
          // const user = { name: user }

          // jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          // res.json({ accessToken: accessToken });

          res.redirect('/vehicles');
        } else {
          return res.send("Password not valid");

        }
      })
      .catch((e) => {
        console.log("Caught error:", e);
        return res.sendStatus(403);
    });



});

function authenticateToken(req, res, next) { //Middleware
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //Bearer token
  if (token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); //Token is no longer valid
    }
    req.user = user;
    next(); // Moves on to the route this middleware authenticated
  })
};

app.listen(3009, () => {
  console.log("Listening on 3009");
});