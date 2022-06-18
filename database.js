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


const getUserByEmail = function(email) {

  return client.query('SELECT * FROM users WHERE email = $1;', [email])
    .then((res) => {
      if (!res.rows.length) {
        return undefined;
      }
      // console.log("This is the email recieved inside:", email);
      console.log("Res.rows:", res.rows[0]);

      return res.rows[0];
      client.end();
    })
    .catch((err) => {
        console.log(err);
      })
    
}

  // let result = getUserByEmail("josh@dev.com");
  // console.log(result);


// Retrieve all vehicle info
const getVehicleInfo = function() {
  return client.query('SELECT * FROM vehicles;')
    .then((res) => {
      if (!res.rows.length) {
        return undefined;
      }
      console.log("Res.rows:", res.rows);
      client.end();

      return res.rows;
    })
    .catch((err) => {
        console.log(err);
      })
}




// We need 2 queries 
// 1: For logging in
// 2: For vehicle information

// Authenticate login
// Once logged in, get vehicle page

// Vehicle page shows information about each vehicle in the database in separate flex box divs

module.exports = {
  getUserByEmail,
  getVehicleInfo
}