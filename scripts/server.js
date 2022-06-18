if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const { getUserByEmail, getVehicleInfo } = require('../database');


app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// Allows usage from forms via req from post methods

app.use(express.static(('public')));
app.use(cookieParser());

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


app.get('/', (req, res) => {
  // If not logged in, render login page
  
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  // If not logged in, render login page

  res.render('login.ejs', {
    message: null
  });
});

app.get('/vehicles', authenticateToken, (req, res) => {
  // Query vehicle info to load into here and send thru the render

  getVehicleInfo()
  .then((vehicles) => {
    console.log("vehicles:", vehicles);
    
    res.render('index.ejs', {
      vehicles
    });
  })

});


app.post('/login', (req, res) => {
  // Authenticate user
  // Use email to find in user in database
  console.log("req.email:", req.body.email);
  
  getUserByEmail(req.body.email)
      .then((user) => {
        // user returns the user object

        
        if (!user) {
          console.log("User not valid");
          return res.send("Email not valid");
          // res.render('login.ejs', {
          //   message: "Invalid email"
          // });
        }
        
        console.log("Here I am, this is user:", user);
        
        if (bcrypt.compareSync(req.body.password, user.password)) {
          
          console.log("password matched");
          
          const username = req.body.email;
          const user = { name: username };
          
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

          res.cookie("access-token", accessToken, {
            maxAge: 86400000, // 24hrs
            httpOnly: true
          });
  
          console.log("Accesstoken:", accessToken);
          console.log("req.headers:", req.headers);
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

  const token = req.cookies["access-token"];
  console.log("token:", token);

  if (!token) {
    console.log("token is null");
    return res.status(400).json({ error: "Invalid authetication" });
    // res.redirect('/login', {
    //   message: "Authentication failed"
    // });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Token no longer valid");
      return res.status(400).json({ error: err }); //Token is no longer valid
    }
    req.authenticated = true;
    return next(); // Moves on to the route this middleware authenticated
  });
};

app.listen(3009, () => {
  console.log("Listening on 3009");
});