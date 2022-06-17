// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

const { Client } = require('pg');
// const { HOST, PASSWORD, USER, DB } = require('./constants');

const client = new Client({
  host: HOST,
  user: USER,
  post: 5432,
  password: PASSWORD,
  database: DB
});

client.connect();

client.query('SELECT * FROM users;')
  .then((res) => {
    console.log(res.rows);
    client.end();
  })
  .catch((err) => {
    console.log(err);
  })


// We need 2 queries 
// 1: For logging in
// 2: For vehicle information

// Authenticate login
// Once logged in, get vehicle page

// Vehicle page shows information about each vehicle in the database in separate flex box divs
