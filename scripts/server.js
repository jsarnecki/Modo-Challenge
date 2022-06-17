const express = require('express');
const app = express();
const passport = require('passport');
const bcrypt = require('bcrypt');

const initializePassport = require('./passport-config');
initializePassport(passport);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
// Allows usage from forms via req from post methods

app.get('/', (req, res) => {
  // If not logged in, render login page

  res.render('login.ejs', {name: "test"});
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
})

app.post('/login', async (req, res) => {
  let email = req.body.email; // From "name" field
  let password = req.body.password;




});

app.listen(3009, () => {
  console.log("Listening on 3009");
});