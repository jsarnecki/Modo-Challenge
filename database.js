// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

const { Client } = require('pg');
const { HOST, PASSWORD, USER, DB } = require('./constants');

const client = new Client({
  host: HOST,
  user: USER,
  post: 5432,
  password: PASSWORD,
  database: DB
});

client.connect();

// Create function to find users by email
// Take in an email
// Uses the email in the query, and returns the email if true, undefined if false
// const getUserByEmail = async function(email) {
//   try {
//     return await client.query('SELECT * FROM users WHERE email = $1;', [email]);
//   } catch (e) {
//     throw error;
//   }
// }



const getUserByEmail = function(email) {
  client.query('SELECT email FROM users WHERE email = $1;', [email])
  .then((res) => {
    if (res.rows.length) {
      return res.rows[0].email;
    } else {
      console.log(undefined);
      client.end();
      return undefined;
    }
  })
  .catch((err) => {
      console.log(err);
    })
}
  
  
  // let result = getUserByEmail("josh@devc.com");
  // console.log(result);

// Create function to fund users by id



// We need 2 queries 
// 1: For logging in
// 2: For vehicle information

// Authenticate login
// Once logged in, get vehicle page

// Vehicle page shows information about each vehicle in the database in separate flex box divs
