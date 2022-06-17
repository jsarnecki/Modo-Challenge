const { authenticate } = require('passport');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail) {
  const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: 'Email not found'});
    }

    try {

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password'});
      }

    } catch (e) {
      return done(e);
    }
  } 

  passport.use(new LocalStrategy({ usernameField: 'email'}), authenticateUser);
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});

}

module.exports = initialize;