'use strict';

import passportGitHub from 'passport-github2';

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
        return done(null, profile);
      });
    }
  ));
};

export default gitHub;
