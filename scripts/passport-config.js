const { authenticate } = require('passport');
const bcrypt = require('bcrypt');
const { USER } = require('../constants');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = (email, password, done) => {
    getUserByEmail(email)
      .then((res) => {
        // res returns the user object

        if (!res) {
          return done(null, false, { message: 'Email not found'});
        }
        console.log("Here I am, this is res:", res);
        if (bcrypt.compareSync(password, res.password)) {
          console.log("password matched");
          return done(null, res.email);
        } else {
          return done(null, false, { message: 'Incorrect password'});
        }

      })
      .catch((e) => {
      return done(e);
    });
  } 
  

  passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id)); //To store inside session
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });

}


// function initialize(passport, getUserByEmail, getUserById) {
//   const authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email);
//     if (!user) {
//       return done(null, false, { message: 'Email not found'});
//     }

//     try {

//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Incorrect password'});
//       }

//     } catch (e) {
//       return done(e);
//     }
//   } 
  

//   passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));
//   passport.serializeUser((user, done) => done(null, user.id)); //To store inside session
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id));
//   });

// }

module.exports = initialize;