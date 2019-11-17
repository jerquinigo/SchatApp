const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const init = require("./passport");
const helpers = require("./helpers");
const { db } = require("../db/index.js");
const options = { username: "username", password: "password" };

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    db.one("SELECT * FROM users WHERE username = ${username}", {
      username: username
    })
      .then(user => {
        if (!helpers.comparePass(password, user.password)) {
          return done(null, false);
        } else {
          return done(null, {
            username: user.username,
            id: user.id,
            profile_pic: user.profile_pic
          });
        }
      })
      .catch(err => {
        console.log("500 ERROR??", err);
        return done(err);
      });
  })
);

init();

module.exports = passport;