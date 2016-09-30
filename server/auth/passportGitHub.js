'use strict';

import passportGitHub from 'passport-github2';
import User from '../models/User';

const GitHubStrategy = passportGitHub.Strategy;

const gitHub = (passport) => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        // Add user info to db.
        const userInfo = {
          username: profile.username,
          email: profile._json.email
        };
        const query = { 'github.username': profile.username };
        User.findOne(query, (err, user) => {
          if (err) return done(err);
          if (!user) {
            // Save new user with github profile.
            const newUser = new User();
            newUser.github.username = profile.username;
            newUser.github.email = profile._json.email;
            newUser.save((err, doc) => {
              if (err) return done(err, null);
              return done(null, Object.assign(userInfo, { id: doc.id }));
            });
          } else {
            // User already signed up.
            return done(null, userInfo, { id: user.id });
          }
        });
      });
    }
  ));
  return passport;
};

export default gitHub;
