if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const { getUserByEmail, getVehicleInfo } = require('../../database');

const app = express();
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// Allows usage from forms via req from post methods

app.use(express.static(('public')));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

let error = null;
// For flash error messages

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login.ejs', {
    message: error
    // For flash error message if assigned, else is null
  });
  error = null;
});

app.get('/vehicles', authenticateToken, (req, res) => {

  getVehicleInfo()
    .then((vehicles) => {
      // Retrieves vehicle data as array of objects
      res.render('index.ejs', {
        vehicles
      });
    })
    .catch((err) => {
      console.log("Caught error:", err);
      return res.sendStatus(403).json(err);
    });

});

app.post('/login', (req, res) => {

  getUserByEmail(req.body.email)
    .then((user) => {

      if (!user) {
        // If no user email was found in database
        error = "Invalid email";
        // Flash error message
        res.redirect('/login');
      }
      
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // Bcrypt compare sync the hashed password in the db with password input
        
        const email = req.body.email;
        const user = { name: email };
        // Saves just email as user to sign onto json web token
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        // Creates token with token secret saved in .env

        res.cookie("access-token", accessToken, {
          // Saves the created token in a cookie
          maxAge: 86400000, // 24hrs
          httpOnly: true
          // HttpOnly prevent client-side scripts from accessing the data
        });

        res.redirect('/vehicles');

      } else {
        // If password compare is invalid
        error = "Invalid password";
        // Flash error message
        res.redirect('/login');
      }
    })
    .catch((err) => {
      console.log("Caught error:", err);
      return res.sendStatus(403).json(err);
  });

});

function authenticateToken(req, res, next) { 
// Middleware to authenticate the token within the cookie
  const token = req.cookies["access-token"];

  if (!token) {
    // If token does not exist, throw 401 error
    return res.status(401).json("Authentication invalid"); 
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Using token secret from .env, verifies the authenticity
    if (err) {
      // Token is no longer valid
      return res.status(401).json(err); //Token is no longer valid
    }
    req.authenticated = true;
    // Moves on to the route this middleware authenticated
    return next(); 
  });
};

app.listen(3009, () => {
  console.log("Listening on 3009");
});