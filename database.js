const { Client } = require('pg');
const { HOST, PASSWORD, USER, DB } = require('./constants');
// Please contact me if you require access to constants/.env to access database
const client = new Client({
  host: HOST,
  user: USER,
  post: 5432,
  password: PASSWORD,
  database: DB
});

client.connect();

const getUserByEmail = function(email) {
// Returns user matching passed email from database if exists, undefined if it does not
  return client.query('SELECT * FROM users WHERE email = $1;', [email])
    .then((res) => {
      
      if (!res.rows.length) {
        return undefined;
      }

      return res.rows[0];
    })
    .catch((err) => {
        console.log("Caught error:", err);
        res.send(err);
        client.end();
    });
};

const getVehicleInfo = function() {
// Returns array of objects of vehicle data from db if exists, undefined if not
  return client.query('SELECT * FROM vehicles;')
    .then((res) => {

      if (!res.rows.length) {
        return undefined;
      }

      return res.rows;
    })
    .catch((err) => {
      console.log("Caught error:", err);
      res.send(err);
      client.end();
    });
};

module.exports = {
  getUserByEmail,
  getVehicleInfo
}