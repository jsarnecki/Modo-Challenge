const express = require('express');
const app = express();
const passport = require('passport');

app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
  // If not logged in, render login page

  res.render('login.ejs', {name: "test"});
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
})

app.post('/login', (req, res) => {
  
});

app.listen(3009, () => {
  console.log("Listening on 3009");
});