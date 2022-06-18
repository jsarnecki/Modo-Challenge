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

      return res.rows[0];
    })
    .catch((err) => {
        console.log(err);
    });
}


// Retrieve all vehicle info
const getVehicleInfo = function() {

  return client.query('SELECT * FROM vehicles;')
    .then((res) => {

      if (!res.rows.length) {
        return undefined;
      }

      return res.rows;
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
      client.end();
    })
}

module.exports = {
  getUserByEmail,
  getVehicleInfo
}